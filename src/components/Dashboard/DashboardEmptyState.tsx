import React, { useState } from 'react';
import { Upload, FileText, Sparkles } from 'lucide-react';

interface DashboardEmptyStateProps {
  onFileUpload: (files: FileList) => void;
}

const DashboardEmptyState: React.FC<DashboardEmptyStateProps> = ({ onFileUpload }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <FileText className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          No processes yet — Upload your first one!
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          Transform your documents into interactive conversations. Upload any process document and start asking questions instantly.
        </p>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${
            dragOver 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
              dragOver ? 'text-blue-500 animate-bounce' : 'text-gray-400 dark:text-gray-500'
            }`} />
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {dragOver ? 'Drop your files here!' : 'Drag & drop your documents'}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Supports PDF, Word, Excel, PowerPoint, and text files
            </p>

            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            
            <label
              htmlFor="file-upload"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 hover:animate-pulse transition-all duration-300 cursor-pointer inline-flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Process Document</span>
            </label>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Smart Analysis</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">AI understands your documents instantly</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">💬</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Natural Chat</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Ask questions in plain English</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Instant Answers</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Get precise responses in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmptyState;