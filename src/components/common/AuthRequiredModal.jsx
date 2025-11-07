import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';

export const AuthRequiredModal = ({ 
  isOpen, 
  onClose,
  onAuthSuccess = () => {},
}) => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setEmail('');
      setPassword('');
      toast.success('Login successful!');
      onAuthSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      setEmail('');
      setPassword('');
      toast.success('Account created successfully!');
      onAuthSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
        maxWidth: '380px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '24px 20px',
        position: 'relative',
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#4285F4',
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
        }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>

        <p style={{
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '11px',
          color: '#6B7280',
          marginBottom: '16px',
        }}>
          {isLogin ? 'Welcome back!' : 'Join us!'}
        </p>

        {error && (
          <div style={{
            padding: '8px 10px',
            marginBottom: '12px',
            backgroundColor: '#FEE',
            color: '#C33',
            borderRadius: '6px',
            fontSize: '11px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            {error}
          </div>
        )}

        <form 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '12px',
          }}
          onSubmit={isLogin ? handleLoginSubmit : handleSignUpSubmit}
        >
          {/* Email Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#374151',
            }}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                fontFamily: 'Poppins, sans-serif',
                boxSizing: 'border-box',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#374151',
            }}>Password</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  paddingRight: '32px',
                  fontSize: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  fontFamily: 'Poppins, sans-serif',
                  boxSizing: 'border-box',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6B7280',
                }}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              marginTop: '4px',
            }}
          >
            {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        {/* Toggle between login and signup */}
        <div style={{
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '11px',
          color: '#6B7280',
        }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#4285F4',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '11px',
              fontFamily: 'Poppins, sans-serif',
              padding: 0,
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6B7280',
            padding: '0',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
