import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const API = import.meta.env.VITE_API_URL;

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [correctedText, setCorrectedText] = useState('');

  const token = localStorage.getItem('token');
  let userId: string | null = null;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      userId = decoded.userId;
    } catch (err) {
      console.error('Invalid token', err);
    }
  }


  const handleUpload = async () => {
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append('document', file);
    formData.append('userId', userId);

    try {
      const res = await fetch(`${API}/api/documents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} — ${text}`);
      }

      const data = await res.json();
      setCorrectedText(data.correctedText || '');
      setMessage('✅ File uploaded and corrected successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([correctedText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h1 className="text-2xl font-bold mb-6">📄 Dockitty</h1>
        <nav>
          <a href="/" className="block mb-2 text-indigo-600 font-medium">Upload</a>
          <a href="/docs" className="block text-gray-700 hover:text-indigo-500">My Documents</a>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="mt-6 text-red-600 hover:underline"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 bg-white overflow-auto">
        <h2 className="text-3xl font-bold mb-6">Upload Document</h2>

        <input
          type="file"
          accept=".txt,.pdf,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <div className="flex gap-4 items-center">
          <button
            onClick={handleUpload}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Upload
          </button>

          {correctedText && (
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download
            </button>
          )}
        </div>

        {message && <p className="mt-4 text-sm text-gray-800">{message}</p>}

        {correctedText && (
          <div className="mt-6 p-4 bg-gray-50 border rounded whitespace-pre-wrap">
            <h3 className="text-lg font-semibold mb-2">Corrected Text:</h3>
            <p>{correctedText}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UploadPage;
