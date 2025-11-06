import { Search, Plus, MoreVertical, FileText, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DepartmentPage = ({ departmentId, departmentName }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();
  // Mock descriptions for each department
  const descriptions = {
    'design': "The Design department is responsible for creating all visual identities, event materials, and branding assets for GDG Algiers. Our team works on designing posters, social media graphics, event banners, merchandise, and maintaining a consistent visual language across all our communications. We use industry-standard tools and follow modern design principles to ensure our community stands out.",
    'dev': "The Development department builds and maintains technical projects, websites, and applications for the GDG Algiers community. We work with various technologies and frameworks to create solutions that help our community grow. From web development to mobile apps, our team is passionate about writing clean code and sharing knowledge with fellow developers.",
    'comm': "The Communication department manages all social media channels, content creation, and external messaging for GDG Algiers. We craft engaging stories, write compelling posts, and ensure our message reaches the right audience. Our team coordinates announcements, creates newsletters, and maintains active engagement with our community members across multiple platforms.",
    'hr': "The Human Resources department handles team management, recruitment, and member engagement activities within GDG Algiers. We focus on building a strong team culture, organizing team-building activities, onboarding new members, and ensuring everyone feels valued and motivated. Our goal is to create an inclusive environment where everyone can thrive and contribute.",
    'logistics': "The Logistics department coordinates all event planning, venue management, and operational support for GDG Algiers activities. From securing locations to managing equipment, coordinating catering, and ensuring smooth event execution, our team handles all the behind-the-scenes work that makes our events successful and memorable for attendees.",
    'multimedia': "The Multimedia department produces high-quality video content, photography, and audio-visual materials for all GDG Algiers events and activities. We capture moments, create promotional videos, edit content for social media, and ensure our visual storytelling represents the energy and spirit of our community. Our work helps preserve memories and promote future events.",
    'external': "The External Relations department manages partnerships, sponsorships, and community outreach initiatives for GDG Algiers. We build relationships with companies, universities, and other tech communities, negotiate sponsorship deals, and create collaboration opportunities. Our work ensures GDG Algiers has the resources and network to deliver exceptional experiences to our members."
  };

  console.log('Department ID:', departmentId, 'Department Name:', departmentName);

  return (
    <main className="flex-1 bg-white" style={{ padding: '22px 65px' }}>
      {/* SVG Gradient Definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="eventsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="1.38%" stopColor="#FF6658" />
            <stop offset="98.62%" stopColor="#E71111" />
          </linearGradient>
          <linearGradient id="templatesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="1.38%" stopColor="#249B57" />
            <stop offset="98.62%" stopColor="#18482C" />
          </linearGradient>
        </defs>
      </svg>

      {/* About Section */}
      <div style={{ marginBottom: '29px' }}>
        <h1 
          style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '13px',
            color: '#EA4335',
            marginBottom: '7px',
          }}
        >
          About {departmentName || 'Department'}
        </h1>
        <p
          style={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '8px',
            color: '#6B7280',
            lineHeight: '1.8',
            maxWidth: '810px',
          }}
        >
          {descriptions[departmentId] || "This department contributes to the success of GDG Algiers."}
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={{ display: 'flex', gap: '108px', marginBottom: '29px', alignItems: 'center' }}>
        {/* Search Input with Icon */}
        <div style={{ flex: 1, position: 'relative' }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '14px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#9CA3AF'
            }} 
          />
          <input
            type="text"
            placeholder="Search resources..."
            style={{
              width: '100%',
              fontFamily: 'Poppins',
              fontSize: '11px',
              padding: '9px 14px 9px 43px',
              border: '1px solid #E5E7EB',
              borderRadius: '7px',
              outline: 'none',
            }}
          />
        </div>
        
        {/* Filter Dropdown */}
        <select
          style={{
            fontFamily: 'Poppins',
            fontSize: '11px',
            padding: '9px 14px',
            border: '1px solid #E5E7EB',
            borderRadius: '7px',
            outline: 'none',
            cursor: 'pointer',
            minWidth: '135px',
            flexShrink: 0,
          }}
        >
          <option value="">All Types</option>
          <option value="document">Documents</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Your Folders Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
        <h2
          style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '14px',
            color: '#000000',
          }}
        >
          Your Folders
        </h2>
        
        <button
          style={{
            fontFamily: 'Poppins',
            fontSize: '11px',
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: '#3B82F6',
            border: 'none',
            borderRadius: '7px',
            padding: '9px 18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
          }}
        >
          <Plus size={14} />
          Create Folder
        </button>
      </div>

      {/* Folders Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '16px',
      }}>
        {['Projects', 'Events', 'Templates', 'Guides'].map((folder) => {
          const getBackgroundStyle = () => {
            if (folder === 'Projects') {
              return 'linear-gradient(129.46deg, #FFFFFF 48.31%, #4285F4 266.51%)';
            }
            if (folder === 'Events') {
              return 'linear-gradient(127.22deg, #FFFFFF 59.1%, #EA4334 184.45%)';
            }
            if (folder === 'Templates') {
              return 'linear-gradient(134.95deg, #FFFFFF 46.59%, #38FF7E 226.35%)';
            }
            if (folder === 'Guides') {
              return 'linear-gradient(127.22deg, #FFFFFF 59.1%, #FCBC05 184.45%)';
            }
            return '#FFFFFF';
          };

          const getTextStyle = () => {
            if (folder === 'Projects') {
              return {
                background: 'linear-gradient(96.38deg, #4285F4 1.38%, #0D3983 98.62%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              };
            }
            if (folder === 'Events') {
              return {
                background: 'linear-gradient(96.38deg, #FF6658 1.38%, #E71111 98.62%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              };
            }
            if (folder === 'Templates') {
              return {
                background: 'linear-gradient(96.38deg, #249B57 1.38%, #18482C 98.62%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              };
            }
            if (folder === 'Guides') {
              return {
                background: 'linear-gradient(96.38deg, #FFE8A7 1.38%, #F1B509 98.62%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              };
            }
            return { color: '#000000' };
          };

          return (
            <div
              key={folder}
              onClick={() => {
                if (folder === 'Projects') {
                  navigate(`/department/${departmentId}/projects`);
                } else if (folder === 'Events') {
                  navigate(`/department/${departmentId}/events`);
                } else if (folder === 'Templates') {
                  navigate(`/department/${departmentId}/templates`);
                } else if (folder === 'Guides') {
                  navigate(`/department/${departmentId}/guides`);
                }
              }}
              style={{
                background: getBackgroundStyle(),
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '40px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {folder === 'Projects' && (
                    <img 
                      src="/Folder.svg" 
                      alt="Projects folder" 
                      style={{ width: '40px', height: '40px' }}
                    />
                  )}
                  {folder === 'Events' && (
                    <Calendar 
                      size={24} 
                      fill="url(#eventsGradient)"
                      style={{
                        stroke: 'url(#eventsGradient)',
                        strokeWidth: 1,
                      }}
                    />
                  )}
                  {folder === 'Templates' && (
                    <FileText 
                      size={24} 
                      fill="url(#templatesGradient)"
                      style={{
                        stroke: 'url(#templatesGradient)',
                        strokeWidth: 1,
                      }}
                    />
                  )}
                  {folder === 'Guides' && (
                    <img 
                      src="/Security.png" 
                      alt="Guides" 
                      style={{ width: '32px', height: '32px' }}
                    />
                  )}
                  <h3
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '16px',
                      ...getTextStyle(),
                    }}
                  >
                    {folder}
                  </h3>
                </div>
                
                {/* Three-dot menu */}
                <div style={{ position: 'relative' }}>
                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === folder ? null : folder);
                    }}
                  >
                    <MoreVertical size={20} color="#6B7280" />
                  </button>
                  
                  {/* Dropdown menu */}
                  {openMenuId === folder && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        minWidth: '160px',
                        zIndex: 10,
                        marginTop: '4px',
                      }}
                    >
                      <button
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontFamily: 'Poppins',
                          fontSize: '12px',
                          color: '#000000',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F3F4F6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Rename', folder);
                          setOpenMenuId(null);
                        }}
                      >
                        Rename
                      </button>
                      <button
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontFamily: 'Poppins',
                          fontSize: '12px',
                          color: '#000000',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F3F4F6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Add to Library', folder);
                          setOpenMenuId(null);
                        }}
                      >
                        Add to Your Library
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
