import React, { useState } from 'react';
const API = import.meta.env.VITE_API_URL;

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await fetch(`${API}/api/documents`, {
  method: 'POST',
  body: formData,
});

if (!res.ok) {
  const text = await res.text();
  throw new Error(`Server error: ${res.status} — ${text}`);
}

const data = await res.json();

      if (res.ok) {
        setMessage('✅ File uploaded and corrected successfully!');
        console.log('Corrected content:', data.correctedText);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Document</h1>
      <input
        type="file"
        accept=".txt,.pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadPage;
