'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ArrowLeft, Brain, CheckCircle, PieChart as PieChartIcon, BarChart3, Loader2, AlertCircle, Play, FileText, TrendingUp } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('video_id');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze?video_id=${videoId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) setError(result.error);
        else setData(result.analysis);
        setLoading(false);
      })
      .catch((err) => {
        setError('Something went wrong while analyzing.');
        setLoading(false);
      });
  }, [videoId]);

  const subtopicsData = data?.subtopics
    ? Object.entries(data.subtopics).map(([name, value]) => ({ name, value }))
    : [];

  const sentimentData = data?.sentiment
    ? Object.entries(data.sentiment).map(([name, value]) => ({ name, value }))
    : [];

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Analyzing Video</h3>
        <p className="text-gray-500">Please wait while we process the video content...</p>
      </div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Analysis Failed</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Try Another Video
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Analysis Results</h1>
                {videoId && (
                  <p className="text-sm text-gray-500">Video ID: {videoId}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage />}

        {data && (
          <div className="space-y-8">
            {/* Summary Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Video Summary</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
              </div>
            </div>

            {/* Fact Checks Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Key Fact Checks</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {data.fact_checks.map((fact, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Subtopic Distribution */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
                  <div className="flex items-center gap-3">
                    <PieChartIcon className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Topic Distribution</h2>
                  </div>
                </div>
                <div className="p-6">
                  {subtopicsData.length > 0 ? (
                    <div className="flex flex-col items-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={subtopicsData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          >
                            {subtopicsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, 'Count']} />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      {/* Legend */}
                      <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                        {subtopicsData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm text-gray-600 truncate">{entry.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No subtopic data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Sentiment Analysis</h2>
                  </div>
                </div>
                <div className="p-6">
                  {sentimentData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sentimentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value) => [value, 'Score']}
                          labelStyle={{ color: '#374151' }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#10B981"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No sentiment data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center pt-8">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5" />
                Analyze Another Video
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Analysis</h3>
          <p className="text-gray-500">Preparing your video analysis...</p>
        </div>
      </div>
    }>
      <AnalyzeContent />
    </Suspense>
  );
}