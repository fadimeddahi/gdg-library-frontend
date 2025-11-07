import { useState, useEffect } from 'react';
import { ChevronDown, Settings, LogOut, Palette, Code, MessageSquare, Users, Package, Video, Handshake } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { departmentService } from '../../services/departmentService';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const activeDepartment = location.pathname.includes('/department/') 
    ? location.pathname.split('/department/')[1].split('/')[0]
    : null;

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await departmentService.getAllDepartments();
        
        const orderedSlugs = ['design', 'dev', 'comm', 'hr', 'logistics', 'multimedia', 'external'];
        const sortedDepartments = data.sort((a, b) => {
          const indexA = orderedSlugs.indexOf(a.slug);
          const indexB = orderedSlugs.indexOf(b.slug);
          return indexA - indexB;
        });
        
        setDepartments(sortedDepartments);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (slug) => {
    navigate(`/department/${slug}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getDepartmentIcon = (slug, isActive) => {
    const iconProps = { size: 16, color: isActive ? '#000000' : '#676C72' };
    switch(slug) {
      case 'design': return <Palette {...iconProps} />;
      case 'dev': return <Code {...iconProps} />;
      case 'comm': return <MessageSquare {...iconProps} />;
      case 'hr': return <Users {...iconProps} />;
      case 'logistics': return <Package {...iconProps} />;
      case 'multimedia': return <Video {...iconProps} />;
      case 'external': return <Handshake {...iconProps} />;
      default: 
        return null;
    }
  };

  return (
    <aside 
      className="h-screen flex flex-col justify-between"
      style={{ 
        width: '295px',
        backgroundColor: '#F5F5F5'
      }}
    >
      <div>
        {/* Logo Section */}
        <div 
          className="mt-4 ml-3 mb-4 cursor-pointer"
          onClick={() => navigate('/')}
          style={{
            width: '252.8px',
            height: '50.6px',
          }}
        >
          <div className="flex items-center h-full">
            <img 
              src="/241e305972ab53b4a468e220f3f2106a2f03510e.png" 
              alt="GDG Algiers Logo" 
              className="h-full object-contain"
            />
          </div>
        </div>

        {/* Departments Header */}
        <div className="px-3 mb-2">
          <h2 
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '12px',
              color: '#EA4334',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              paddingLeft: '10px',
            }}
          >
            Departments
          </h2>
        </div>

        {/* Department List */}
        <nav className="flex flex-col gap-2 px-3">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#676C72', fontFamily: 'Poppins', fontSize: '10px' }}>
              Loading departments...
            </div>
          ) : departments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#676C72', fontFamily: 'Poppins', fontSize: '10px' }}>
              No departments found
            </div>
          ) : (
            departments.map((dept) => (
              <button
                key={dept._id}
                onClick={() => handleDepartmentClick(dept.slug)}
                className={`
                  flex items-center justify-between
                  transition-all hover:shadow-md
                  ${activeDepartment === dept.slug ? 'shadow-md' : ''}
                `}
                style={{
                  width: '279.2px',
                  height: '35px',
                  borderRadius: '10px',
                  paddingTop: '8px',
                  paddingRight: '10.34px',
                  paddingBottom: '8px',
                  paddingLeft: '10.34px',
                  border: 'none',
                  backgroundColor: activeDepartment === dept.slug ? '#FCBC0542' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (activeDepartment !== dept.slug) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeDepartment !== dept.slug) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getDepartmentIcon(dept.slug, activeDepartment === dept.slug)}
                  <span 
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '10px',
                      lineHeight: '150%',
                      letterSpacing: '0%',
                      textTransform: 'capitalize',
                      color: activeDepartment === dept.slug ? '#000000' : '#676C72'
                    }}
                  >
                    {dept.name}
                  </span>
                </div>
                <ChevronDown 
                  size={10} 
                  color={activeDepartment === dept.slug ? '#000000' : '#676C72'}
                  className="flex-shrink-0"
                />
              </button>
            ))
          )}
        </nav>
      </div>

      {/* Bottom Section with Settings, Logout, Profile */}
      <div className="px-3 pb-4">
        {/* Separator Line */}
        <div 
          className="mb-2"
          style={{
            width: '279.2px',
            height: '1px',
            backgroundColor: '#D1D5DB'
          }}
        />

        {/* Settings, Logout, Profile */}
        <div className="flex flex-col gap-1.5">
          <button
            className="flex items-center transition-all hover:bg-white hover:shadow-md rounded-lg"
            style={{
              width: '279.2px',
              height: '30px',
              padding: '8px 10.34px',
              border: 'none',
            }}
          >
            <Settings size={12} color="#676C72" style={{ marginRight: '8px' }} />
            <span 
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '9px',
                color: '#676C72'
              }}
            >
              Settings
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center transition-all hover:bg-white hover:shadow-md rounded-lg"
            style={{
              width: '279.2px',
              height: '30px',
              padding: '8px 10.34px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            <LogOut size={12} color="#676C72" style={{ marginRight: '8px' }} />
            <span 
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '9px',
                color: '#676C72'
              }}
            >
              Logout
            </span>
          </button>

          <button
            className="flex items-center transition-all hover:bg-white hover:shadow-md rounded-lg"
            style={{
              width: '279.2px',
              height: '30px',
              padding: '8px 10.34px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            <div 
              className="rounded-full flex items-center justify-center"
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#D9D9D9',
                marginRight: '8px',
              }}
            >
              <span className="text-gray-700 font-semibold text-xs">
                {user ? getInitials(user.name) : 'U'}
              </span>
            </div>
            <span 
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '9px',
                color: '#676C72'
              }}
            >
              {user?.name || 'User'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
