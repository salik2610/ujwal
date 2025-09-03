import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut, FiX, FiCheck, FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import './Header.css';

const Header = ({ onMenuClick, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          // Fallback to mock notifications if backend is not available
          setNotifications([
            {
              id: 1,
              title: "Delay Alert",
              message: "Train 12345 delayed by 15 minutes at Delhi Station",
              type: "warning",
              timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
              read: false
            },
            {
              id: 2,
              title: "System Update",
              message: "KPI data synchronization completed successfully",
              type: "info",
              timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
              read: false
            },
            {
              id: 3,
              title: "Performance Improvement",
              message: "Punctuality rate improved by 2.3% this hour",
              type: "success",
              timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
              read: false
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Fallback to mock notifications
        setNotifications([
          {
            id: 1,
            title: "Delay Alert",
            message: "Train 12345 delayed by 15 minutes at Delhi Station",
            type: "warning",
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            read: false
          },
          {
            id: 2,
            title: "System Update",
            message: "KPI data synchronization completed successfully",
            type: "info",
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            read: false
          },
          {
            id: 3,
            title: "Performance Improvement",
            message: "Punctuality rate improved by 2.3% this hour",
            type: "success",
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            read: false
          }
        ]);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setShowSearchResults(true);
        } else {
          // Fallback to mock search results
          const mockResults = [
            { type: 'train', id: '12345', name: 'Train 12345', status: 'On Time', route: 'Delhi-Mumbai' },
            { type: 'station', id: 'DEL', name: 'Delhi Station', status: 'Active', location: 'Delhi' },
            { type: 'route', id: 'DEL-MUM', name: 'Delhi-Mumbai Route', status: 'Operational', distance: '1384 km' },
            { type: 'kpi', id: 'punctuality', name: 'Punctuality Rate', value: '92%', trend: 'up' }
          ].filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.id.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(mockResults);
          setShowSearchResults(true);
        }
      } catch (error) {
        console.error('Search error:', error);
        // Fallback to mock search results
        const mockResults = [
          { type: 'train', id: '12345', name: 'Train 12345', status: 'On Time', route: 'Delhi-Mumbai' },
          { type: 'station', id: 'DEL', name: 'Delhi Station', status: 'Active', location: 'Delhi' },
          { type: 'route', id: 'DEL-MUM', name: 'Delhi-Mumbai Route', status: 'Operational', distance: '1384 km' },
          { type: 'kpi', id: 'punctuality', name: 'Punctuality Rate', value: '92%', trend: 'up' }
        ].filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(mockResults);
        setShowSearchResults(true);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
      });
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return <FiAlertTriangle className="notification-icon warning" />;
      case 'info': return <FiInfo className="notification-icon info" />;
      case 'success': return <FiCheckCircle className="notification-icon success" />;
      default: return <FiBell className="notification-icon" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`header ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <FiMenu />
        </button>
        <div className="search-box" ref={searchRef}>
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search trains, stations, routes..." 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {showSearchResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div key={index} className="search-result-item">
                  <div className="result-type">{result.type}</div>
                  <div className="result-name">{result.name}</div>
                  <div className="result-details">
                    {result.status && <span className="result-status">{result.status}</span>}
                    {result.route && <span className="result-route">{result.route}</span>}
                    {result.value && <span className="result-value">{result.value}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="header-right">
        <div 
          className="notification-btn" 
          onClick={() => setShowNotifications(!showNotifications)}
          ref={notificationRef}
        >
          <FiBell />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Notifications</h4>
                <button 
                  className="close-btn"
                  onClick={() => setShowNotifications(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-content">
                        {getNotificationIcon(notification.type)}
                        <div className="notification-text">
                          <h5>{notification.title}</h5>
                          <p>{notification.message}</p>
                          <span className="notification-time">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      {!notification.read && (
                        <button 
                          className="mark-read-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                        >
                          <FiCheck />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="user-menu">
          <div className="user-avatar">
            <FiUser />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Admin User'}</span>
            <span className="user-role">{user?.role || 'Railway Administrator'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
