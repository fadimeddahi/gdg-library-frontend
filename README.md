# GDG Resource Hub

A modern web platform for organizing and accessing Google Developer Groups (GDG) resources across multiple departments. Built for the GDG community to easily discover, save, and manage projects, events, templates, and guides.

## Overview

GDG Resource Hub provides a centralized platform where community members can explore resources from 7 specialized departments including Design, Development, Communication, HR, Logistics, Multimedia, and External Relations. Users can create personal libraries, search across departments, and access curated content tailored to their interests.

## Features

- **Department Navigation** - Browse resources organized across 7 GDG departments
- **Personal Library** - Save and organize favorite folders for quick access
- **Smart Search** - Filter resources by department, type, and keywords in real-time
- **File Management** - Upload and manage projects, events, templates, and guides
- **Authentication** - Secure login and registration system with JWT tokens
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework**: React 19 with Vite 7
- **Routing**: React Router v7
- **Styling**: TailwindCSS 3.4 with custom design system
- **UI Components**: Custom components with Lucide React icons
- **State Management**: React Context API for authentication
- **HTTP Client**: Native Fetch API with error handling
- **Notifications**: React Hot Toast for user feedback
- **Build Tool**: Vite with optimized production builds

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components (modals, cards)
│   │   ├── landing/         # Landing page sections
│   │   ├── layout/          # Layout components (header, sidebar)
│   │   ├── resources/       # Resource-specific components
│   │   └── ui/              # Base UI primitives
│   ├── context/             # React Context providers
│   ├── pages/               # Route pages
│   ├── services/            # API service layer
│   ├── constants/           # Design tokens and constants
│   └── App.jsx              # Root component with routing
├── public/                  # Static assets
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18-20 and npm
- Backend API running (see [backend repository](https://github.com/fadimeddahi/gdg-resource-hub-backend))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fadimeddahi/gdg-library-frontend.git
cd gdg-library-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env.local file
VITE_API_URL=http://localhost:5000/api/v1
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `https://api.gdghub.com/api/v1` |

## Key Features Explained

### Authentication Flow
Users can sign up and log in to access protected resources. Authentication tokens are stored in localStorage and included in API requests. Protected routes automatically redirect unauthenticated users to the login page.

### Department System
Resources are organized into 7 departments:
- **Design** - UI/UX resources and design assets
- **Development** - Code projects and technical guides
- **Communication** - Marketing materials and content
- **HR** - Team management resources
- **Logistics** - Event planning and coordination
- **Multimedia** - Video and media content
- **External Relations** - Partnership materials

Each department has dedicated pages for projects, events, templates, and guides.

### Library Management
Users can save folders to their personal library for quick access. The library syncs with the backend and persists across sessions. Click "Add to Your Library" on any department folder to save it.

### File Upload
Authenticated users can upload files to department folders with:
- Drag-and-drop support
- File type validation
- Progress tracking
- Error handling

### Landing Page
A modern, responsive landing page featuring:
- Hero section with clear call-to-action
- Feature highlights
- Department search and filtering
- Visual department cards with color coding

## Design System

The app uses a consistent design system based on Google's brand colors:
- **Primary**: Google Blue (#4285F4)
- **Secondary Colors**: Department-specific colors (Design: Red, Dev: Blue, etc.)
- **Typography**: Poppins font family
- **Components**: Custom-built with Tailwind utility classes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

This is a community project for GDG Algiers. Contributions are welcome! Please follow existing code style and component patterns.

## License

MIT License - feel free to use this project for learning or building your own resource hub.

---

**Live Demo**: [gdg-library-frontend.vercel.app](https://gdg-library-frontend-bxh6.vercel.app/)  
**Backend API**: Deployed on Render
