import React, { useState, useEffect } from 'react';
import { FiUsers, FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter, FiMoreVertical, FiUser, FiMail, FiPhone, FiShield, FiCheck, FiX } from 'react-icons/fi';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'operator',
    department: '',
    status: 'active'
  });

  // Mock users data
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'Ujwal Admin',
        email: 'ujwal@railways.gov.in',
        phone: '+91-9876543210',
        role: 'admin',
        department: 'Operations',
        status: 'active',
        lastLogin: '2025-01-15 10:30:00',
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@railways.gov.in',
        phone: '+91-9876543211',
        role: 'operator',
        department: 'Control Room',
        status: 'active',
        lastLogin: '2025-01-15 09:15:00',
        createdAt: '2024-02-15'
      },
      {
        id: 3,
        name: 'Priya Sharma',
        email: 'priya.sharma@railways.gov.in',
        phone: '+91-9876543212',
        role: 'analyst',
        department: 'Analytics',
        status: 'active',
        lastLogin: '2025-01-14 16:45:00',
        createdAt: '2024-03-01'
      },
      {
        id: 4,
        name: 'Amit Singh',
        email: 'amit.singh@railways.gov.in',
        phone: '+91-9876543213',
        role: 'operator',
        department: 'Maintenance',
        status: 'inactive',
        lastLogin: '2025-01-10 14:20:00',
        createdAt: '2024-01-15'
      },
      {
        id: 5,
        name: 'Sneha Patel',
        email: 'sneha.patel@railways.gov.in',
        phone: '+91-9876543214',
        role: 'viewer',
        department: 'Management',
        status: 'active',
        lastLogin: '2025-01-15 08:30:00',
        createdAt: '2024-04-01'
      }
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const roles = [
    { value: 'admin', label: 'Administrator', color: '#dc2626' },
    { value: 'operator', label: 'Operator', color: '#2563eb' },
    { value: 'analyst', label: 'Analyst', color: '#059669' },
    { value: 'viewer', label: 'Viewer', color: '#7c3aed' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    const user = {
      ...newUser,
      id: Date.now(),
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'operator',
      department: '',
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setShowAddModal(true);
  };

  const handleUpdateUser = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user
    ));
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'operator',
      department: '',
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleInfo = (role) => {
    return roles.find(r => r.value === role) || { label: role, color: '#6b7280' };
  };

  if (loading) {
    return (
      <div className="users-page">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <div className="header-content">
          <h1>User Management</h1>
          <p>Manage system users and their permissions</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus />
          Add User
        </button>
      </div>

      <div className="users-filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <FiFilter className="filter-icon" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => {
              const roleInfo = getRoleInfo(user.role);
              return (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        <FiUser />
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                        <div className="user-phone">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: roleInfo.color }}
                    >
                      {roleInfo.label}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td>
                    <button
                      className={`status-btn ${user.status}`}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' ? <FiCheck /> : <FiX />}
                      {user.status}
                    </button>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditUser(user)}
                        title="Edit User"
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  setNewUser({
                    name: '',
                    email: '',
                    phone: '',
                    role: 'operator',
                    department: '',
                    status: 'active'
                  });
                }}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={newUser.department}
                  onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                  placeholder="Enter department"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  setNewUser({
                    name: '',
                    email: '',
                    phone: '',
                    role: 'operator',
                    department: '',
                    status: 'active'
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={editingUser ? handleUpdateUser : handleAddUser}
                disabled={!newUser.name || !newUser.email}
              >
                {editingUser ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
