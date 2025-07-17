'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Zap, Shield, Users, Heart, Mail, AlertCircle } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  // Extract YouTube video ID
  const extractVideoId = (link) => {
    const match = link.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
    );
    return match ? match[1] : link; // fallback if direct video ID
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const videoId = extractVideoId(url.trim());
    if (videoId.length === 11) {
      router.push(`/analyze?video_id=${videoId}`);
    } else {
      alert('Please enter a valid YouTube URL or video ID.');
    }
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Instant Analysis",
      description: "Get comprehensive insights from YouTube videos in seconds using AI-powered analysis"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Caption-Based",
      description: "Works with any video that has captions (manual or auto-generated) for accurate content analysis"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Educational Focus",
      description: "Perfect for students, researchers, and content creators who need quick video summaries"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">YouTube Video Analyzer</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Non-profit tool</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Video Analysis
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transform YouTube Videos into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Insights</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Analyze any YouTube video with captions to get summaries, key points, and valuable insights. 
            Perfect for education, research, and content creation.
          </p>

          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-2xl mx-auto border border-gray-100">
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Paste YouTube URL or Video ID here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Play className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Analyze Video
              </button>
            </div>
          </div>

          {/* Usage Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Fair Use Notice:</strong> This is a non-profit educational tool. Please use responsibly and avoid bulk requests to ensure availability for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center">Why Use YouTube Video Analyzer?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  For Students & Researchers
                </h4>
                <ul className="space-y-2 text-blue-100">
                  <li>• Quickly extract key information from educational videos</li>
                  <li>• Create study notes from lecture recordings</li>
                  <li>• Analyze research presentations and webinars</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  For Content Creators
                </h4>
                <ul className="space-y-2 text-blue-100">
                  <li>• Analyze competitor content and trends</li>
                  <li>• Extract insights from industry discussions</li>
                  <li>• Research topics for your next video</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Paste URL</h4>
              <p className="text-gray-600">Simply paste any YouTube video URL or video ID into the input field above.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">AI Analysis</h4>
              <p className="text-gray-600">Our AI processes the video's captions to extract meaningful insights and summaries.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Get Results</h4>
              <p className="text-gray-600">Receive comprehensive analysis, key points, and actionable insights instantly.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <p className="text-gray-600 mb-4">
            Created with ❤️ by <strong>Amal Francis</strong> as a non-profit educational tool
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Mail className="w-4 h-4" />
            <a href="mailto:francisamal030@gmail.com" className="hover:text-blue-600 transition-colors">
              francisamal030@gmail.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}