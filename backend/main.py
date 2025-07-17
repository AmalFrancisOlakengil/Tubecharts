# == BACKEND: FastAPI ==
# File: backend/main.py

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
load_dotenv()


# Configure Gemini API
GENAI_API_KEY = os.getenv("GENAI_API_KEY")
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# Create FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper: Get captions from YouTube
def get_captions(video_id: str) -> str:
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        print(transcript)
        return " ".join([line['text'] for line in transcript])
    except Exception as e:
        return f"Error: {str(e)}"

# Extract first JSON block from Gemini's response
def extract_first_json_block(text: str) -> str:
    start = text.find('{')
    if start == -1:
        raise ValueError("No JSON object found")
    brace_count = 0
    end = start
    for i, char in enumerate(text[start:], start=start):
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0:
                end = i + 1
                break
    return text[start:end]

# Helper: Analyze with Gemini
def analyze_text_with_gemini(text: str) -> dict:
    prompt = f"""
    Analyze the following transcript:

    {text}

    Provide a JSON response with the following structure:
    {{
      "summary": "...",
      "fact_checks": ["fact1", "fact2", ...],
      "subtopics": {{
        "Topic A": percentage,
        "Topic B": percentage,
        ... (5 total)
      }},
      "sentiment": {{
        "happy": percentage,
        "sad": percentage,
        "angry": percentage,
        "fear": percentage,
        "neutral": percentage
      }}
    }}
    Only return valid JSON.
    """
    try:
        response = model.generate_content(prompt)
        cleaned_json = extract_first_json_block(response.text.strip())
        return json.loads(cleaned_json)
    except Exception as e:
        return {"error": str(e)}

@app.get("/analyze")
def analyze(video_id: str = Query(...)):
    captions = get_captions(video_id)
    if captions.startswith("Error"):
        return {"error": captions}
    analysis = analyze_text_with_gemini(captions)
    print(analysis)
    return {"video_id": video_id, "analysis": analysis}
