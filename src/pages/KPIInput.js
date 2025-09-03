import React, { useState, useEffect } from 'react';
import { 
  FiSave, 
  FiRefreshCw, 
  FiTrendingUp, 
  FiTrendingDown,
  FiClock,
  FiAlertTriangle,
  FiTruck
} from 'react-icons/fi';
import './KPIInput.css';

const KPIInput = () => {
  const [kpiData, setKpiData] = useState({
    punctualityRate: 92,
    avgDelay: 4.5,
    trackThroughput: 120,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchKpiData();
  }, []);

  const fetchKpiData = async () => {
    try {
      const response = await fetch('/api/kpis');
      if (response.ok) {
        const data = await response.json();
        setKpiData(data);
      }
    } catch (error) {
      console.error('Error fetching KPI data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setKpiData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/kpis', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kpiData),
      });

      if (response.ok) {
        setMessage('KPI data updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error updating KPI data');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving KPI data:', error);
      setMessage('Error updating KPI data');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (value, type) => {
    if (type === 'punctuality') {
      return value >= 90 ? '#10b981' : value >= 80 ? '#f59e0b' : '#ef4444';
    }
    if (type === 'delay') {
      return value <= 5 ? '#10b981' : value <= 10 ? '#f59e0b' : '#ef4444';
    }
    return value >= 100 ? '#10b981' : value >= 80 ? '#f59e0b' : '#ef4444';
  };

  const getStatusText = (value, type) => {
    if (type === 'punctuality') {
      return value >= 90 ? 'Excellent' : value >= 80 ? 'Good' : 'Needs Improvement';
    }
    if (type === 'delay') {
      return value <= 5 ? 'Excellent' : value <= 10 ? 'Good' : 'Needs Improvement';
    }
    return value >= 100 ? 'Excellent' : value >= 80 ? 'Good' : 'Needs Improvement';
  };

  if (loading) {
    return <div className="loading">Loading KPI data...</div>;
  }

  return (
    <div className="kpi-input">
      <div className="page-header">
        <h1>KPI Input & Management</h1>
        <p>Update and manage key performance indicators</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="kpi-input-grid">
        <div className="kpi-input-card punctuality">
          <div className="card-header">
            <div className="card-icon">
              <FiClock />
            </div>
            <div className="card-title">
              <h3>Punctuality Rate</h3>
              <p>Percentage of trains running on time</p>
            </div>
            <div className="status-indicator" style={{ color: getStatusColor(kpiData.punctualityRate, 'punctuality') }}>
              {getStatusText(kpiData.punctualityRate, 'punctuality')}
            </div>
          </div>
          
          <div className="input-section">
            <div className="input-group">
              <label>Current Value</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={kpiData.punctualityRate}
                  onChange={(e) => handleInputChange('punctualityRate', e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="unit">%</span>
              </div>
            </div>
            
            <div className="target-section">
              <label>Target</label>
              <div className="target-value">95%</div>
            </div>
          </div>
        </div>

        <div className="kpi-input-card delay">
          <div className="card-header">
            <div className="card-icon">
              <FiAlertTriangle />
            </div>
            <div className="card-title">
              <h3>Average Delay</h3>
              <p>Mean delay time in minutes</p>
            </div>
            <div className="status-indicator" style={{ color: getStatusColor(kpiData.avgDelay, 'delay') }}>
              {getStatusText(kpiData.avgDelay, 'delay')}
            </div>
          </div>
          
          <div className="input-section">
            <div className="input-group">
              <label>Current Value</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={kpiData.avgDelay}
                  onChange={(e) => handleInputChange('avgDelay', e.target.value)}
                  min="0"
                  step="0.1"
                />
                <span className="unit">min</span>
              </div>
            </div>
            
            <div className="target-section">
              <label>Target</label>
              <div className="target-value">≤ 3 min</div>
            </div>
          </div>
        </div>

        <div className="kpi-input-card throughput">
          <div className="card-header">
            <div className="card-icon">
              <FiTruck />
            </div>
            <div className="card-title">
              <h3>Track Throughput</h3>
              <p>Number of trains per hour</p>
            </div>
            <div className="status-indicator" style={{ color: getStatusColor(kpiData.trackThroughput, 'throughput') }}>
              {getStatusText(kpiData.trackThroughput, 'throughput')}
            </div>
          </div>
          
          <div className="input-section">
            <div className="input-group">
              <label>Current Value</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={kpiData.trackThroughput}
                  onChange={(e) => handleInputChange('trackThroughput', e.target.value)}
                  min="0"
                  step="1"
                />
                <span className="unit">trains/hr</span>
              </div>
            </div>
            
            <div className="target-section">
              <label>Target</label>
              <div className="target-value">≥ 130</div>
            </div>
          </div>
        </div>
      </div>

      <div className="action-section">
        <button
          className="btn btn-secondary"
          onClick={fetchKpiData}
          disabled={saving}
        >
          <FiRefreshCw />
          Refresh Data
        </button>
        
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          <FiSave />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="kpi-summary">
        <h3>Performance Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-label">Overall Performance</div>
            <div className="summary-value">
              {kpiData.punctualityRate >= 90 && kpiData.avgDelay <= 5 && kpiData.trackThroughput >= 100 
                ? 'Excellent' 
                : kpiData.punctualityRate >= 80 && kpiData.avgDelay <= 10 && kpiData.trackThroughput >= 80
                ? 'Good'
                : 'Needs Improvement'
              }
            </div>
          </div>
          
          <div className="summary-item">
            <div className="summary-label">Target Achievement</div>
            <div className="summary-value">
              {Math.round(
                ((kpiData.punctualityRate >= 95 ? 1 : kpiData.punctualityRate / 95) +
                 (kpiData.avgDelay <= 3 ? 1 : 3 / kpiData.avgDelay) +
                 (kpiData.trackThroughput >= 130 ? 1 : kpiData.trackThroughput / 130)) / 3 * 100
              )}%
            </div>
          </div>
          
          <div className="summary-item">
            <div className="summary-label">Last Updated</div>
            <div className="summary-value">{new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIInput;
