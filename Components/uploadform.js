'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export default function UploadForm({ onUploadComplete }) {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.heading || !formData.subheading || !formData.file) {
      alert('Please fill in all fields and select a PDF file');
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `pdfs/${Date.now()}_${formData.file.name}`);
      const snapshot = await uploadBytes(storageRef, formData.file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Save metadata to Firestore
      await addDoc(collection(db, 'pdfs'), {
        heading: formData.heading,
        subheading: formData.subheading,
        pdfUrl: downloadURL,
        fileName: formData.file.name,
        date: new Date().toISOString().split('T')[0],
        uploadedAt: new Date()
      });

      // Reset form
      setFormData({
        heading: '',
        subheading: '',
        file: null
      });
      
      // Reset file input
      e.target.reset();
      
      alert('PDF uploaded successfully!');
      
      // Trigger refresh of PDF list
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Error uploading PDF. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload New PDF</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PDF heading"
            required
          />
        </div>

        <div>
          <label htmlFor="subheading" className="block text-sm font-medium text-gray-700 mb-1">
            Subheading
          </label>
          <input
            type="text"
            id="subheading"
            name="subheading"
            value={formData.subheading}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PDF subheading"
            required
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            PDF File
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
                type="button"
          type="submit"
          disabled={isUploading}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isUploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          {isUploading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </form>
    </div>
  );
}