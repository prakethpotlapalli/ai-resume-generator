'use client';

import { useState } from 'react';
import { Upload, FileText, Briefcase, Download } from 'lucide-react';

export default function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleGenerate = async () => {
    if (!resumeFile || !jobDescription) {
      alert('Please upload a resume and enter a job description');
      return;
    }

    setIsProcessing(true);
    
    // TODO: Implement API call
    setTimeout(() => {
      setResult({
        optimizedResume: 'Optimized resume content will appear here...',
        coverLetter: 'Generated cover letter will appear here...'
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          AI-Powered Resume & Cover Letter Generator
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Upload your resume and job description to get optimized content
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Resume Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Upload className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Upload Resume</h2>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {resumeFile ? resumeFile.name : 'Click to upload PDF or Word file'}
                </p>
              </label>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
            </div>
            
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !resumeFile || !jobDescription}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? 'Generating...' : 'Generate Optimized Content'}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Optimized Resume</h3>
              <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
                <p className="text-gray-700">{result.optimizedResume}</p>
              </div>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Cover Letter</h3>
              <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
                <p className="text-gray-700">{result.coverLetter}</p>
              </div>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Cover Letter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}