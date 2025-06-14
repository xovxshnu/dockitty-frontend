// Frontend: Remove Login & Add File Upload Testing
// components/UploadTester.tsx

import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface UploadResult {
  file: File;
  status: 'success' | 'error' | 'pending';
  message: string;
  timestamp: number;
}

interface GrammarError {
  message: string;
  offset: number;
  length: number;
  replacements: string[];
  rule: string;
}

const UploadTester: React.FC = () => {
  const [uploads, setUploads] = useState<UploadResult[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [grammarResults, setGrammarResults] = useState<{[key: string]: GrammarError[]}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handler
  const handleFileUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      const uploadResult: UploadResult = {
        file,
        status: 'pending',
        message: 'Processing...',
        timestamp: Date.now()
      };
      
      setUploads(prev => [...prev, uploadResult]);
      
      try {
        // Simulate upload process
        await simulateUpload(file);
        
        // Check grammar if it's a text file
        if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
          const content = await readFileContent(file);
          const grammarErrors = await checkGrammar(content);
          setGrammarResults(prev => ({
            ...prev,
            [file.name]: grammarErrors
          }));
        }
        
        setUploads(prev => prev.map(upload => 
          upload.timestamp === uploadResult.timestamp 
            ? { ...upload, status: 'success', message: 'Upload successful' }
            : upload
        ));
        
      } catch (error) {
        setUploads(prev => prev.map(upload => 
          upload.timestamp === uploadResult.timestamp 
            ? { ...upload, status: 'error', message: error instanceof Error ? error.message : 'Upload failed' }
            : upload
        ));
      }
    }
  };

  // Simulate upload process (replace with actual API call)
  const simulateUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for testing
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 1000 + Math.random() * 2000);
    });
  };

  // Read file content for grammar checking
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  // Advanced grammar checking using LanguageTool-like logic
  const checkGrammar = async (text: string): Promise<GrammarError[]> => {
    const errors: GrammarError[] = [];
    
    // Basic grammar rules (extend with actual grammar checking service)
    const rules = [
      {
        pattern: /\b(your|you're)\b/gi,
        check: (match: RegExpMatchArray) => {
          const word = match[0].toLowerCase();
          const context = text.slice(Math.max(0, match.index! - 20), match.index! + match[0].length + 20);
          
          // Simple heuristic: if followed by a verb, should be "you're"
          if (word === 'your' && /\s+(are|going|being|doing)\b/i.test(context.slice(match[0].length))) {
            return {
              message: "Did you mean 'you're' (you are)?",
              replacements: ["you're"]
            };
          }
          if (word === "you're" && /\s+(cat|dog|house|book|idea)\b/i.test(context.slice(match[0].length))) {
            return {
              message: "Did you mean 'your' (possessive)?",
              replacements: ["your"]
            };
          }
          return null;
        }
      },
      {
        pattern: /\b(there|their|they're)\b/gi,
        check: (match: RegExpMatchArray) => {
          const word = match[0].toLowerCase();
          const context = text.slice(Math.max(0, match.index! - 20), match.index! + match[0].length + 20);
          
          if (word === 'there' && /\s+(cat|dog|house|book)\b/i.test(context.slice(match[0].length))) {
            return {
              message: "Did you mean 'their' (possessive)?",
              replacements: ["their"]
            };
          }
          return null;
        }
      },
      {
        pattern: /\s{2,}/g,
        check: () => ({
          message: "Multiple spaces found",
          replacements: [" "]
        })
      },
      {
        pattern: /[.!?]\s*[a-z]/g,
        check: (match: RegExpMatchArray) => ({
          message: "Sentence should start with capital letter",
          replacements: [match[0].toUpperCase()]
        })
      }
    ];

    // Apply grammar rules
    for (const rule of rules) {
      let match;
      while ((match = rule.pattern.exec(text)) !== null) {
        const suggestion = rule.check(match);
        if (suggestion) {
          errors.push({
            message: suggestion.message,
            offset: match.index!,
            length: match[0].length,
            replacements: suggestion.replacements,
            rule: rule.pattern.source
          });
        }
      }
    }

    return errors;
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const getStatusIcon = (status: UploadResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />;
    }
  };

  const clearResults = () => {
    setUploads([]);
    setGrammarResults({});
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dockitty Upload Tester</h1>
        <p className="text-gray-600">Test file uploads and grammar checking without login</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop files here or click to select
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supports all file types • Text files will be grammar checked
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Select Files
        </button>
      </div>

      {/* Results */}
      {uploads.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upload Results</h2>
            <button
              onClick={clearResults}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            {uploads.map((upload, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{upload.file.name}</span>
                    <span className="text-sm text-gray-500">
                      ({(upload.file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  {getStatusIcon(upload.status)}
                </div>
                <p className={`text-sm ${
                  upload.status === 'success' ? 'text-green-600' :
                  upload.status === 'error' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {upload.message}
                </p>

                {/* Grammar Results */}
                {grammarResults[upload.file.name] && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <h4 className="font-medium text-gray-700 mb-2">Grammar Check Results:</h4>
                    {grammarResults[upload.file.name].length === 0 ? (
                      <p className="text-sm text-green-600">No grammar issues found!</p>
                    ) : (
                      <div className="space-y-2">
                        {grammarResults[upload.file.name].map((error, i) => (
                          <div key={i} className="text-sm">
                            <span className="text-red-600 font-medium">{error.message}</span>
                            {error.replacements.length > 0 && (
                              <span className="ml-2 text-gray-600">
                                Suggestion: {error.replacements.join(', ')}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadTester;