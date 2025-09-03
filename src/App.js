// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataManagement from "./pages/DataManagement";
import KPIInput from "./pages/KPIInput";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                  <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <div className="content">
                    <Dashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                  <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <div className="content">
                    <Dashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/data-management" element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                  <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <div className="content">
                    <DataManagement />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/kpi-input" element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                  <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <div className="content">
                    <KPIInput />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/audit-trails" element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                  <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <div className="content">
                    <DataManagement />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                  <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <div className="content">
                    <Users />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                  <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <div className="content">
                    <Settings />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

