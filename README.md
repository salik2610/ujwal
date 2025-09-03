# Gati-Rakshak: Ujwal Module - Performance Analytics Dashboard

A React-based performance analytics dashboard for the Indian Railways Gati-Rakshak project's Ujwal module. This dashboard provides real-time KPIs and audit trails for railway operations.

## Features

- **Real-Time KPIs**: Live monitoring of punctuality rate, average delay, and track throughput
- **Audit Trails**: Complete logging of AI recommendations and human decisions
- **Responsive Design**: Modern UI with Indian Railways branding
- **Auto-Updates**: Simulated real-time data updates every 5 seconds

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd ujwal
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start both frontend and backend:
   ```bash
   npm run dev
   ```
   
   Or run them separately:
   ```bash
   # Terminal 1 - Backend server
   npm run server
   
   # Terminal 2 - Frontend app
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
ujwal/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Available Scripts

- `npm start` - Runs the React app in development mode
- `npm run server` - Runs the Express backend server
- `npm run dev` - Runs both frontend and backend concurrently
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Key Components

### KPI Cards
- **Punctuality Rate**: Percentage of trains running on time
- **Average Delay**: Mean delay time in minutes
- **Track Throughput**: Number of trains per hour

### Audit Table
- Timestamp of events
- Type of action (AI Recommendation/Human Decision)
- Detailed description of the action

## Customization

The dashboard can be customized by modifying:
- `src/App.js` - Component logic and data structure
- `src/App.css` - Styling and layout
- Mock data in the component for testing different scenarios

## Backend API Endpoints

- `GET /api/kpis` - Returns real-time KPI data (punctuality rate, average delay, track throughput)
- `GET /api/audit-trails` - Returns audit trail data (AI recommendations and human decisions)

## Technologies Used

- **Frontend**: React 18.2.0, CSS3, JavaScript ES6+
- **Backend**: Express.js, CORS
- **Development**: Create React App, Concurrently

## License

© 2025 Indian Railways - Gati-Rakshak Project

