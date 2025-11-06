import { DEPARTMENTS } from '@/constants';
import { ChevronDown, Settings, LogOut, Palette, Code, MessageSquare, Users, Package, Video, Handshake } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Sidebar = ({ onDepartmentClick }) => {
  const location = useLocation();
  const activeDepartment = location.pathname.includes('/department/') 
    ? location.pathname.split('/department/')[1]
    : null;

  const getDepartmentIcon = (deptId, isActive) => {
    const iconProps = { size: 16, color: isActive ? '#000000' : '#676C72' };
    switch(deptId) {
      case 'design': return <Palette {...iconProps} />;
      case 'dev': return <Code {...iconProps} />;
      case 'comm': return <MessageSquare {...iconProps} />;
      case 'hr': return <Users {...iconProps} />;
      case 'logistics': return <Package {...iconProps} />;
      case 'multimedia': return <Video {...iconProps} />;
      case 'external': return <Handshake {...iconProps} />;
      default: return null;
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
          className="mt-4 ml-3 mb-4"
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
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onDepartmentClick?.(dept.id)}
              className={`
                flex items-center justify-between
                transition-all hover:shadow-md
                ${activeDepartment === dept.id ? 'shadow-md' : ''}
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
                backgroundColor: activeDepartment === dept.id ? '#FCBC0542' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (activeDepartment !== dept.id) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (activeDepartment !== dept.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getDepartmentIcon(dept.id, activeDepartment === dept.id)}
                <span 
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    letterSpacing: '0%',
                    textTransform: 'capitalize',
                    color: activeDepartment === dept.id ? '#000000' : '#676C72'
                  }}
                >
                  {dept.name}
                </span>
              </div>
              <ChevronDown 
                size={10} 
                color={activeDepartment === dept.id ? '#000000' : '#676C72'}
                className="flex-shrink-0"
              />
            </button>
          ))}
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
            className="flex items-center transition-all hover:bg-white hover:shadow-md rounded-lg"
            style={{
              width: '279.2px',
              height: '30px',
              padding: '8px 10.34px',
              border: 'none',
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
              <span className="text-gray-700 font-semibold text-xs">JD</span>
            </div>
            <span 
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '9px',
                color: '#676C72'
              }}
            >
              John Doe
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
