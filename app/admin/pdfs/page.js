'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import Login from '../Insights/LoginForm';
import UploadForm from '@/Components/uploadform'; // Add this import

export default function AdminPDFPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [pdfs, setPdfs] = useState([]);

  const fetchPDFs = async () => {
    const q = query(collection(db, 'pdfs'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    setPdfs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    if (isAuthenticated) fetchPDFs();
  }, [isAuthenticated]);

  if (authLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated) return <Login />;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">PDF Management</h1>
      <UploadForm onUploadComplete={fetchPDFs} />

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Uploaded PDFs</h2>
        {pdfs.length === 0 ? (
          <p>No PDFs uploaded yet.</p>
        ) : (
          <ul className="space-y-3">
            {pdfs.map((pdf) => (
              <li key={pdf.id} className="border p-3 rounded">
                <p className="font-semibold">{pdf.heading}</p>
                <p className="text-sm text-gray-600">{pdf.subheading}</p>
                <p className="text-xs text-gray-500">Upload Date: {pdf.date}</p>
                <a
                  href={pdf.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  View PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}