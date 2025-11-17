import { useState } from 'react';
import { Upload, X } from 'lucide-react';

export const FileUploadModal = ({ isOpen, onClose, collection, departmentObjectId, departmentName }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 50MB');
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/zip',
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('File type not supported. Please upload PDF, DOCX, XLSX, PPTX, JPG, PNG, GIF, or ZIP files.');
      return;
    }

    setFile(selectedFile);
    setError('');
    
    // Auto-fill title from filename if empty
    if (!title) {
      const fileName = selectedFile.name.replace(/\.[^/.]+$/, ''); // Remove extension
      setTitle(fileName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (title.length > 200) {
      setError('Title must be less than 200 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('department', departmentObjectId);
      formData.append('title', title.trim());
      formData.append('file', file);

      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/${collection}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      alert(`✅ "${title}" uploaded successfully!`);
      
      // Reset form
      setTitle('');
      setFile(null);
      onClose();
      
      // Reload page to show new file
      window.location.reload();
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '28px 24px',
        position: 'relative',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF',
          }}
        >
          <X size={20} />
        </button>

        <h1 style={{
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#4285F4',
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
        }}>
          Upload File
        </h1>

        <p style={{
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '12px',
          color: '#6B7280',
          marginBottom: '20px',
        }}>
          Upload to {departmentName} - {collection}
        </p>

        {error && (
          <div style={{
            padding: '10px 12px',
            marginBottom: '16px',
            backgroundColor: '#FEE',
            color: '#C33',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#374151',
            }}>
              Title
            </label>
            <input
              type="text"
              placeholder="Enter file title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '13px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontFamily: 'Poppins, sans-serif',
                boxSizing: 'border-box',
              }}
            />
            <span style={{
              fontSize: '11px',
              color: '#9CA3AF',
              fontFamily: 'Poppins, sans-serif',
            }}>
              {title.length}/200 characters
            </span>
          </div>

          {/* File Upload Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#374151',
            }}>
              File
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? '#4285F4' : '#D1D5DB'}`,
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: dragActive ? '#F0F7FF' : '#F9FAFB',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <input
                type="file"
                id="file-upload"
                onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                disabled={loading}
                style={{ display: 'none' }}
                accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png,.gif,.zip"
              />
              
              {!file ? (
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                  <Upload size={32} style={{ color: '#9CA3AF', margin: '0 auto 8px' }} />
                  <p style={{
                    margin: 0,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    color: '#6B7280',
                  }}>
                    Drag and drop or <span style={{ color: '#4285F4', fontWeight: 600 }}>browse</span>
                  </p>
                  <p style={{
                    margin: '4px 0 0 0',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '11px',
                    color: '#9CA3AF',
                  }}>
                    PDF, DOCX, XLSX, PPTX, JPG, PNG, GIF, ZIP (max 50MB)
                  </p>
                </label>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <p style={{
                      margin: 0,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px',
                      color: '#1F2937',
                      fontWeight: 500,
                    }}>
                      {file.name}
                    </p>
                    <p style={{
                      margin: '2px 0 0 0',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '11px',
                      color: '#6B7280',
                    }}>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    style={{
                      background: '#FEE',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 8px',
                      cursor: 'pointer',
                      color: '#C33',
                      fontSize: '11px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !file || !title}
            style={{
              padding: '12px 20px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: (loading || !file || !title) ? 'not-allowed' : 'pointer',
              opacity: (loading || !file || !title) ? 0.5 : 1,
              marginTop: '8px',
            }}
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </div>
    </div>
  );
};
