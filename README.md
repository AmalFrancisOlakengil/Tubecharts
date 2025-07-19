
# Tubecharts

TubeCharts is a smart YouTube video analyzer that extracts and analyzes video captions to generate insightful summaries, keyword highlights, and visual charts. It helps users quickly understand video content through pie charts, bar graphs, and topic breakdowns — perfect for students, researchers, and content creators looking to save time and get meaningful insights without watching the full video.



## API Reference

#### Get Youtube Video ID

```http
  GET /analyze

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `video_id` | `string` | **Required**. YouTube video ID (not URL) |

#### How Api Works

```http
  GET /analyze?video_id=dQw4w9WgXcQ
```

Fetches the captions of a given YouTube video and sends them to Gemini for analysis. Returns a structured JSON object with summary, fact checks, subtopics (in %), and sentiment analysis.

#### Example Response

```json
{
  "video_id": "dQw4w9WgXcQ",
  "analysis": {
    "summary": "The video discusses...",
    "fact_checks": [
      "Claim 1 is misleading.",
      "Claim 2 is mostly true."
    ],
    "subtopics": {
      "AI": 30,
      "Healthcare": 25,
      "Education": 20,
      "Politics": 15,
      "Environment": 10
    },
    "sentiment": {
      "happy": 40,
      "sad": 10,
      "angry": 5,
      "fear": 10,
      "neutral": 35
    }
  }
}
```




## Demo
[Watch on YouTube](https://www.youtube.com/watch?v=1uQa5siZKSY)

![Demo](https://raw.githubusercontent.com/AmalFrancisOlakengil/my_attachments/refs/heads/main/Screenshot%202025-07-17%20234037.png)       

![Demo](https://raw.githubusercontent.com/AmalFrancisOlakengil/my_attachments/refs/heads/main/Screenshot%202025-07-17%20234043.png)            

![Demo](https://raw.githubusercontent.com/AmalFrancisOlakengil/my_attachments/refs/heads/main/Screenshot%202025-07-17%20234112.png)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GENAI_API_KEY`

Get it from Google AI studio


## Feedback

If you have any feedback, please reach out to me at francisamal030@gmail.com


## Deployment

Youtube will not allow to Deploy this app in a Domain or Sub-Domain, there are chances of Youtube banning your IP. But totally fine, if you run this in your local system.


## Tech Stack

**Client:** React, Next, TailwindCSS

**Server:** FastAPI


## Run Locally

Clone the project

```bash
  git clone https://github.com/AmalFrancisOlakengil/Tubecharts.git
```

Go to the project directory

```bash
  cd tubecharts
```
For Frontend:  

Go to frontend folder  
```bash
  cd frontend
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

For Backend:

Go to backend folder  
```bash
  cd backend
```

Install dependencies

```bash
pip install -r requirements.txt
pip install uvicorn fastapi

```
Don't forget, the environment variable   
start the server
```bash
  uvicorn --reload --port 8000
```

