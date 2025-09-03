import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiBarChart2, 
  FiSettings, 
  FiFileText, 
  FiUsers,
  FiTrendingUp,
  FiDatabase
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard', exact: true },
    { path: '/analytics', icon: FiBarChart2, label: 'Analytics' },
    { path: '/data-management', icon: FiDatabase, label: 'Data Management' },
    { path: '/kpi-input', icon: FiTrendingUp, label: 'KPI Input' },
    { path: '/audit-trails', icon: FiFileText, label: 'Audit Trails' },
    { path: '/users', icon: FiUsers, label: 'Users' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Gati-Rakshak</h2>
        <p>Ujwal Module</p>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact 
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">A</div>
          <div className="user-details">
            <p className="user-name">Admin User</p>
            <p className="user-role">Railway Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
