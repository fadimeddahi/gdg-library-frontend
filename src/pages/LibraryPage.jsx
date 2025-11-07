import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Folder } from 'lucide-react';
import { savedFolderService } from '../services/savedFolderService';
import { Header } from '../components/layout/Header';
import { LibraryHeader } from '../components/layout/LibraryHeader';

export const LibraryPage = () => {
  const [savedFolders, setSavedFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load saved folders on mount
  useEffect(() => {
    fetchSavedFolders();
  }, []);

  const fetchSavedFolders = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📚 LibraryPage: Fetching saved folders...');
      
      const folders = await savedFolderService.getAllSavedFolders();
      setSavedFolders(folders);
      console.log('✅ LibraryPage: Loaded', folders.length, 'saved folders');
    } catch (err) {
      setError(err.message || 'Failed to load library');
      alert('Error loading your library. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFolder = async (folderId, folderName) => {
    if (!window.confirm(`Remove "${folderName}" from your library?`)) {
      return;
    }

    try {
      await savedFolderService.removeFolder(folderId);
      
      setSavedFolders(savedFolders.filter(f => f._id !== folderId));
    } catch (err) {
      console.error('Error removing folder:', err);
      alert('Failed to remove folder. Please try again.');
    }
  };

  const handleOpenFolder = (folder) => {
    navigate(`/department/${folder.departmentSlug}/${folder.folderType}`);
  };

  const getColorStyle = (color) => {
    const colorMap = {
      blue: { border: '#3B82F6', bg: '#EFF6FF' },
      green: { border: '#10B981', bg: '#ECFDF5' },
      yellow: { border: '#FBBF24', bg: '#FFFBEB' },
      red: { border: '#EF4444', bg: '#FEE2E2' },
      purple: { border: '#A855F7', bg: '#F3E8FF' },
      pink: { border: '#EC4899', bg: '#FCE7F3' },
      indigo: { border: '#6366F1', bg: '#EEF2FF' },
    };
    return colorMap[color] || colorMap.blue;
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header />
        <div style={{ padding: '0 26px' }}>
          <LibraryHeader />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#6B7280',
          }}>
            ⏳ Loading your library...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <div style={{ padding: '0 26px' }}>
        <LibraryHeader />
        
        <div style={{ marginTop: '28px' }}>
          <h1 style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '24px',
            color: '#000000',
            marginBottom: '8px',
          }}>
            📚 My Library
          </h1>
          <p style={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '14px',
            color: '#6B7280',
            marginBottom: '28px',
          }}>
            Your saved folders for quick access
          </p>

          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontFamily: 'Poppins',
              fontSize: '14px',
              color: '#DC2626',
            }}>
              ❌ {error}
            </div>
          )}

          {savedFolders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#F9FAFB',
              borderRadius: '12px',
              border: '2px dashed #D1D5DB',
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}>
                📁
              </div>
              <h2 style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '18px',
                color: '#000000',
                marginBottom: '8px',
              }}>
                Your library is empty
              </h2>
              <p style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '14px',
                color: '#6B7280',
                marginBottom: '24px',
              }}>
                Click the "Add to Your Library" button on any folder to get started
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  backgroundColor: '#3B82F6',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3B82F6';
                }}
              >
                Browse Departments
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}>
              {savedFolders.map(folder => {
                const colorStyle = getColorStyle(folder.color);
                return (
                  <div
                    key={folder._id}
                    style={{
                      background: colorStyle.bg,
                      border: `2px solid ${colorStyle.border}`,
                      borderRadius: '12px',
                      padding: '20px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFolder(folder._id, `${folder.departmentName} ${folder.folderName}`);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: '#EF4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#DC2626';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#EF4444';
                      }}
                      title="Remove from library"
                    >
                      <X size={16} />
                    </button>

                    {/* Folder Content */}
                    <div
                      onClick={() => handleOpenFolder(folder)}
                      style={{
                        paddingRight: '40px',
                      }}
                    >
                      {/* Icon */}
                      <div style={{
                        marginBottom: '12px',
                      }}>
                        <Folder
                          size={32}
                          color={colorStyle.border}
                          fill={colorStyle.border}
                          style={{ opacity: 0.8 }}
                        />
                      </div>

                      {/* Department Name */}
                      <h3 style={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#000000',
                        margin: '0 0 4px 0',
                      }}>
                        {folder.departmentName}
                      </h3>

                      {/* Folder Name */}
                      <p style={{
                        fontFamily: 'Poppins',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: colorStyle.border,
                        margin: '4px 0 12px 0',
                      }}>
                        {folder.folderName}
                      </p>

                      {/* Item Count */}
                      <div style={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '12px',
                        color: '#6B7280',
                      }}>
                        📄 {folder.itemCount} items
                      </div>

                      {/* Created Date */}
                      <div style={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '11px',
                        color: '#9CA3AF',
                        marginTop: '8px',
                      }}>
                        Saved {new Date(folder.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
