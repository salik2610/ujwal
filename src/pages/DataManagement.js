import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiFilter,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiFileText
} from 'react-icons/fi';
import './DataManagement.css';

const DataManagement = () => {
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const [newItem, setNewItem] = useState({
    timestamp: '',
    type: 'AI Recommendation',
    detail: ''
  });

  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    try {
      const response = await fetch('/api/audit-trails');
      if (response.ok) {
        const data = await response.json();
        setAuditData(data);
      }
    } catch (error) {
      console.error('Error fetching audit data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch('/api/audit-trails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newItem,
          id: Date.now(),
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
        }),
      });

      if (response.ok) {
        setAuditData([...auditData, { ...newItem, id: Date.now() }]);
        setNewItem({ timestamp: '', type: 'AI Recommendation', detail: '' });
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddModal(true);
  };

  const handleUpdateItem = async () => {
    try {
      const response = await fetch(`/api/audit-trails/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        setAuditData(auditData.map(item => 
          item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item
        ));
        setEditingItem(null);
        setNewItem({ timestamp: '', type: 'AI Recommendation', detail: '' });
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/audit-trails/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setAuditData(auditData.filter(item => item.id !== id));
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const filteredData = auditData.filter(item => {
    const matchesSearch = item.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const exportData = () => {
    const dataStr = JSON.stringify(filteredData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit-trails.json';
    link.click();
  };

  const exportCSV = () => {
    const headers = ['Timestamp', 'Type', 'Detail'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        `"${item.timestamp}"`,
        `"${item.type}"`,
        `"${item.detail}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit-trails.csv';
    link.click();
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        const importedData = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, '').trim());
            return {
              id: Date.now() + Math.random(),
              timestamp: values[0] || new Date().toISOString().slice(0, 16).replace('T', ' '),
              type: values[1] || 'AI Recommendation',
              detail: values[2] || 'Imported data'
            };
          });

        setAuditData(prev => [...prev, ...importedData]);
        setShowImportModal(false);
        alert(`Successfully imported ${importedData.length} records`);
      } catch (error) {
        alert('Error importing CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <div className="data-management">
      <div className="page-header">
        <h1>Data Management</h1>
        <p>Manage audit trails and system data</p>
      </div>

      <div className="data-controls">
        <div className="search-filter">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search audit trails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="AI Recommendation">AI Recommendation</option>
            <option value="Human Decision">Human Decision</option>
          </select>
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={fetchAuditData}>
            <FiRefreshCw />
            Refresh
          </button>
          <button className="btn btn-secondary" onClick={exportCSV}>
            <FiDownload />
            Export CSV
          </button>
          <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>
            <FiUpload />
            Import CSV
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <FiPlus />
            Add New
          </button>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Type</th>
              <th>Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.timestamp}</td>
                <td>
                  <span className={`type-badge ${item.type.replace(' ', '-').toLowerCase()}`}>
                    {item.type}
                  </span>
                </td>
                <td>{item.detail}</td>
                <td>
                  <div className="action-buttons-cell">
                    <button
                      className="btn-icon edit"
                      onClick={() => handleEditItem(item)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDeleteItem(item.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                  setNewItem({ timestamp: '', type: 'AI Recommendation', detail: '' });
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Timestamp</label>
                <input
                  type="datetime-local"
                  value={newItem.timestamp}
                  onChange={(e) => setNewItem({ ...newItem, timestamp: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                >
                  <option value="AI Recommendation">AI Recommendation</option>
                  <option value="Human Decision">Human Decision</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Detail</label>
                <textarea
                  value={newItem.detail}
                  onChange={(e) => setNewItem({ ...newItem, detail: e.target.value })}
                  rows="4"
                  placeholder="Enter details..."
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                  setNewItem({ timestamp: '', type: 'AI Recommendation', detail: '' });
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={editingItem ? handleUpdateItem : handleAddItem}
              >
                {editingItem ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Import CSV File</h3>
              <button
                className="modal-close"
                onClick={() => setShowImportModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="import-instructions">
                <h4>CSV Format Requirements:</h4>
                <p>Your CSV file should have the following columns:</p>
                <ul>
                  <li><strong>Timestamp:</strong> Date and time (YYYY-MM-DD HH:MM)</li>
                  <li><strong>Type:</strong> AI Recommendation or Human Decision</li>
                  <li><strong>Detail:</strong> Description of the action</li>
                </ul>
                <div className="csv-example">
                  <h5>Example:</h5>
                  <pre>{`Timestamp,Type,Detail
2025-01-04 10:05,AI Recommendation,Suggested route optimization
2025-01-04 10:10,Human Decision,Approved maintenance schedule`}</pre>
                </div>
              </div>
              
              <div className="file-upload">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileImport}
                  id="csv-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="csv-upload" className="file-upload-label">
                  <FiFileText />
                  Choose CSV File
                </label>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;
