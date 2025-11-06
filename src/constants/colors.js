// Brand Colors - Google Developer Groups
export const COLORS = {
  // Primary Google Colors
  google: {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC04',
    green: '#34A853',
  },

  // Gradients for different sections
  gradients: {
    projects: {
      start: '#4285F4',
      end: '#0D3983',
      css: 'linear-gradient(135deg, #4285F4 0%, #0D3983 100%)',
    },
    events: {
      start: '#FF6658',
      end: '#E71111',
      css: 'linear-gradient(135deg, #FF6658 0%, #E71111 100%)',
    },
    templates: {
      start: '#249B57',
      end: '#18482C',
      css: 'linear-gradient(135deg, #249B57 0%, #18482C 100%)',
    },
    guides: {
      start: '#FFE8A7',
      end: '#F1B509',
      css: 'linear-gradient(135deg, #FFE8A7 0%, #F1B509 100%)',
    },
  },

  // UI Colors
  ui: {
    background: '#F5F5F5',
    white: '#FFFFFF',
    border: '#E0E0E0',
    text: {
      primary: '#000000',
      secondary: '#666666',
      light: '#999999',
    },
    sidebar: {
      background: '#FFFFFF',
      active: '#FCBC0542',
      hover: '#F5F5F5',
    },
  },
};

// Common dimensions
export const DIMENSIONS = {
  card: {
    file: {
      width: 220,
      height: 120,
      borderRadius: 10,
    },
    folder: {
      width: 340,
      height: 192,
      borderRadius: 15,
    },
  },
  sidebar: {
    width: 256,
  },
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: {
    small: '11px',
    normal: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '24px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
