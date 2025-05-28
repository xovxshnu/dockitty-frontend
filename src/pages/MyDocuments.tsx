import React, { useEffect, useState } from 'react';
import { getUserFromToken } from '../utils/auth';

const API = import.meta.env.VITE_API_URL;

const MyDocuments = () => {
  const [docs, setDocs] = useState([]);
  const user = getUserFromToken();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch(`${API}/api/documents?userId=${user?.userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setDocs(data);
      } catch (err) {
        console.error('Failed to fetch documents:', err);
      }
    };

    if (user?.userId) fetchDocs();
  }, [user?.userId]);

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

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <h2 className="text-3xl font-bold mb-6">My Documents</h2>
        <ul className="space-y-4">
          {docs.length > 0 ? (
            docs.map((doc: any) => (
              <li key={doc.id} className="border p-4 rounded shadow bg-white">
                <p className="text-gray-800 whitespace-pre-wrap">{doc.content.slice(0, 300)}...</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No documents found.</p>
          )}
        </ul>
      </main>
    </div>
  );
};

export default MyDocuments;
