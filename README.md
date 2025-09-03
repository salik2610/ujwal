# Gati-Rakshak Ujwal Module

A comprehensive railway performance management system built with React and Node.js.

## Features

- ✅ Real-time dashboard with KPI monitoring
- ✅ Analytics and reporting
- ✅ User management with role-based access
- ✅ Data management
- ✅ Audit trails
- ✅ Notifications system
- ✅ Search functionality
- ✅ Settings management
- ✅ Responsive design
- ✅ Modern UI/UX

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Demo Credentials

- Username: `ujwal`
- Password: `railway2025`

## Deployment

### Vercel Deployment

1. **Frontend Deployment:**
   ```bash
   npm run build
   ```
   Deploy the `build` folder to Vercel.

2. **Backend Deployment (Optional):**
   Deploy the `server.js` file to a separate Vercel serverless function or use a different backend service.

### Environment Setup

The application works in two modes:
- **With Backend**: Full functionality with real-time data
- **Without Backend**: Fallback mode with mock data (perfect for static deployment)

## Available Scripts

- `npm start` - Runs the React app
- `npm run server` - Runs the backend server
- `npm run dev` - Runs both frontend and backend concurrently
- `npm run build` - Builds the app for production
- `npm run vercel-build` - Builds for Vercel deployment

## Technology Stack

- **Frontend**: React 18, React Router, Recharts, React Icons
- **Backend**: Node.js, Express, CORS
- **Styling**: Modern CSS3 with responsive design
- **Deployment**: Vercel-ready with fallback support

## Key Features Implemented

### ✅ Authentication System
- Secure login with backend integration
- Fallback authentication for static deployment
- Session management with localStorage

### ✅ Dashboard
- Real-time KPI monitoring
- Interactive charts and graphs
- Performance metrics tracking
- Responsive design

### ✅ User Management
- Complete CRUD operations
- Role-based access control
- User status management
- Search and filtering

### ✅ Settings Management
- System configuration
- Notification preferences
- Security settings
- Data management options

### ✅ Notification System
- Real-time notifications
- Interactive bell icon
- Mark as read functionality
- Fallback mock notifications

### ✅ Search Functionality
- Live search across the system
- Search trains, stations, routes, KPIs
- Fallback search results

### ✅ Modern UI/UX
- Collapsible sidebar
- Professional design
- Smooth animations
- Mobile responsive

## Troubleshooting

### Login Issues
- Ensure backend server is running: `npm run server`
- Check browser console for errors
- Try the fallback authentication (works without backend)

### Deployment Issues
- Use `npm run vercel-build` for Vercel deployment
- Ensure all dependencies are in `package.json`
- Check `vercel.json` configuration

## Support

For issues or questions, please check the console logs and ensure all dependencies are properly installed.

## License

© 2025 Indian Railways - Gati-Rakshak Project