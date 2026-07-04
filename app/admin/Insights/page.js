'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { addInsight } from '@/lib/insightsService';
import { uploadPdfAndSaveDetails } from '@/lib/pdfService';
import { generateSlug } from '@/lib/slugUtils';
import Login from '@/app/admin/Insights/LoginForm';
import StockManagement from '@/app/api/stockmanagement/stock_manage';

export default function AdminInsights() {
  const { isAuthenticated, loading: authLoading, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('insights');

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    thumbnail: '',
    cloudinaryId: '',
    pdfLink: ''
  });

  const [previewSlug, setPreviewSlug] = useState('');

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfHeading, setPdfHeading] = useState('');
  const [pdfSubheading, setPdfSubheading] = useState('');
  const [pdfDate, setPdfDate] = useState('');
  const [pdfMessage, setPdfMessage] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfPreviewSlug, setPdfPreviewSlug] = useState('');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionStart, setSubscriptionStart] = useState('');
  const [subscriptionEnd, setSubscriptionEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userAddSuccess, setUserAddSuccess] = useState('');
  const [panCardNumber, setPanCardNumber] = useState('');
  const [kycVerifiedOn, setKycVerifiedOn] = useState('');

  const handleLogout = () => logout();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Generate preview slug when title changes
    if (name === 'title') {
      setPreviewSlug(generateSlug(value));
    }
  };

  // Update PDF preview slug when heading changes
  useEffect(() => {
    if (pdfHeading) {
      setPdfPreviewSlug(generateSlug(pdfHeading));
    }
  }, [pdfHeading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!formData.title || !formData.subtitle || !formData.pdfLink) {
        throw new Error('Please fill in all required fields');
      }
      if (!formData.pdfLink.includes('drive.google.com')) {
        throw new Error('Please provide a valid Google Drive link');
      }
      
      const newInsight = await addInsight(formData);
      setMessage(`Insight added successfully! 
      View at: ${window.location.origin}/insights/${newInsight.slug}`);
      setFormData({ title: '', subtitle: '', thumbnail: '', cloudinaryId: '', pdfLink: '' });
      setPreviewSlug('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile || !pdfHeading || !pdfSubheading || !pdfDate) {
      setPdfMessage('Please fill all fields and select a PDF.');
      return;
    }
    setPdfLoading(true);
    setPdfMessage('');

    try {
      const result = await uploadPdfAndSaveDetails(pdfFile, pdfHeading, pdfSubheading, pdfDate);
      setPdfMessage(`PDF uploaded successfully! 
      View at: ${window.location.origin}/insights/${result.slug || generateSlug(pdfHeading)}`);
      setPdfFile(null);
      setPdfHeading('');
      setPdfSubheading('');
      setPdfDate('');
      setPdfPreviewSlug('');
    } catch (error) {
      console.error(error);
      setPdfMessage('Error uploading PDF.');
    } finally {
      setPdfLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserAddSuccess('');

    try {
      const response = await fetch('/admin/api/adduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          password,
          subscriptionStart,
          subscriptionEnd,
          panCardNumber,
          kycVerifiedOn
        })
      });

      if (response.ok) {
        setFullName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setSubscriptionStart('');
        setSubscriptionEnd('');
        setPanCardNumber('');
        setKycVerifiedOn('');
        setUserAddSuccess('User added successfully!');
      } else {
        setUserAddSuccess('Error adding user.');
      }
    } catch (error) {
      console.error(error);
      setUserAddSuccess('Error adding user.');
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const tabs = [
    { id: 'insights', name: 'Insights', icon: '📊' },
    { id: 'stocks', name: 'Stock Management', icon: '📈' },
    { id: 'users', name: 'User Management', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
          </div>
          <button type="button" onClick={handleLogout} className="px-4 py-2 text-sm bg-red-100 hover:bg-red-200 rounded">
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <>
              {/* Add Insight Form */}
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="text-xl font-bold mb-4">Add New Insight</h2>
                {message && (
                  <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
                    <div className="whitespace-pre-line">{message}</div>
                  </div>
                )}
                
                {/* URL Preview */}
                {previewSlug && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Preview URL:</h3>
                    <div className="bg-white border rounded px-3 py-2 text-sm font-mono text-blue-600">
                      {typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}/insights/{previewSlug}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="Enter insight title" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle/Description *</label>
                    <textarea 
                      name="subtitle" 
                      value={formData.subtitle} 
                      onChange={handleInputChange} 
                      required 
                      rows="3" 
                      placeholder="Enter subtitle or description" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cloudinary Public ID</label>
                    <input 
                      type="text" 
                      name="cloudinaryId" 
                      value={formData.cloudinaryId} 
                      onChange={handleInputChange} 
                      placeholder="Enter Cloudinary public ID" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fallback Image URL</label>
                    <input 
                      type="url" 
                      name="thumbnail" 
                      value={formData.thumbnail} 
                      onChange={handleInputChange} 
                      placeholder="Enter fallback image URL" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Google Drive PDF Link *</label>
                    <input 
                      type="url" 
                      name="pdfLink" 
                      value={formData.pdfLink} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="https://drive.google.com/file/d/..." 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                    <p className="text-xs text-gray-500 mt-1">Make sure the Google Drive link is set to "Anyone with the link can view"</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    }`}
                  >
                    {loading ? 'Adding Insight...' : 'Add Insight'}
                  </button>
                </form>
              </div>

              {/* PDF Upload Form */}
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="text-xl font-bold mb-4">Upload PDF Directly</h2>
                {pdfMessage && (
                  <div className={`p-3 rounded ${pdfMessage.includes('Error') ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
                    <div className="whitespace-pre-line">{pdfMessage}</div>
                  </div>
                )}

                {/* PDF URL Preview */}
                {pdfPreviewSlug && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Preview URL:</h3>
                    <div className="bg-white border rounded px-3 py-2 text-sm font-mono text-blue-600">
                      {typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}/insights/{pdfPreviewSlug}
                    </div>
                  </div>
                )}

                <form onSubmit={handlePdfUpload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select PDF File *</label>
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={(e) => setPdfFile(e.target.files[0])} 
                      required 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label>
                    <input 
                      type="text" 
                      value={pdfHeading} 
                      onChange={(e) => setPdfHeading(e.target.value)} 
                      required 
                      placeholder="Enter insight heading" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subheading *</label>
                    <input 
                      type="text" 
                      value={pdfSubheading} 
                      onChange={(e) => setPdfSubheading(e.target.value)} 
                      required 
                      placeholder="Enter insight subheading" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input 
                      type="date" 
                      value={pdfDate} 
                      onChange={(e) => setPdfDate(e.target.value)} 
                      required 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={pdfLoading} 
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                      pdfLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                    }`}
                  >
                    {pdfLoading ? 'Uploading PDF...' : 'Upload PDF'}
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Stocks Tab */}
          {activeTab === 'stocks' && (
            <StockManagement />
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white p-6 rounded-lg shadow-xl space-y-4">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Start Date</label>
                  <input type="date" value={subscriptionStart} onChange={(e) => setSubscriptionStart(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subscription End Date</label>
                  <input type="date" value={subscriptionEnd} onChange={(e) => setSubscriptionEnd(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card Number</label>
                  <input type="text" value={panCardNumber} onChange={(e) => setPanCardNumber(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">KYC Verified On</label>
                  <input type="date" value={kycVerifiedOn} onChange={(e) => setKycVerifiedOn(e.target.value)} required className="border rounded-xl p-3 w-full" />
                </div>

                <div className="md:col-span-2">
                  <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 w-full transition">
                    {loading ? 'Adding...' : 'Add User'}
                  </button>
                  {userAddSuccess && <p className="mt-4 text-green-600 font-semibold">{userAddSuccess}</p>}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}