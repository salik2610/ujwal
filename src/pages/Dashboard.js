import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiClock, 
  FiTruck,
  FiAlertTriangle,
  FiCheckCircle
} from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [kpiData, setKpiData] = useState({
    punctualityRate: 92,
    avgDelay: 4.5,
    trackThroughput: 120,
  });
  const [loading, setLoading] = useState(true);

  // Mock historical data for charts
  const historicalData = [
    { time: '00:00', punctuality: 91, delay: 4.2, throughput: 115 },
    { time: '04:00', punctuality: 89, delay: 5.1, throughput: 98 },
    { time: '08:00', punctuality: 94, delay: 3.8, throughput: 125 },
    { time: '12:00', punctuality: 92, delay: 4.5, throughput: 120 },
    { time: '16:00', punctuality: 90, delay: 4.8, throughput: 118 },
    { time: '20:00', punctuality: 93, delay: 4.1, throughput: 122 },
  ];

  const stationData = [
    { name: 'Delhi', trains: 45, onTime: 42, delayed: 3 },
    { name: 'Mumbai', trains: 38, onTime: 35, delayed: 3 },
    { name: 'Chennai', trains: 32, onTime: 30, delayed: 2 },
    { name: 'Kolkata', trains: 28, onTime: 26, delayed: 2 },
    { name: 'Bangalore', trains: 25, onTime: 23, delayed: 2 },
  ];

  const pieData = [
    { name: 'On Time', value: 85, color: '#10b981' },
    { name: 'Delayed', value: 12, color: '#f59e0b' },
    { name: 'Cancelled', value: 3, color: '#ef4444' },
  ];

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (value, type) => {
    if (type === 'punctuality') {
      return value >= 90 ? <FiCheckCircle className="status-icon good" /> : <FiAlertTriangle className="status-icon warning" />;
    }
    if (type === 'delay') {
      return value <= 5 ? <FiCheckCircle className="status-icon good" /> : <FiAlertTriangle className="status-icon warning" />;
    }
    return <FiTrendingUp className="status-icon good" />;
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Railway Performance Dashboard</h1>
        <p>Real-time monitoring of Indian Railways operations</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card punctuality">
          <div className="kpi-header">
            <div className="kpi-icon">
              <FiClock />
            </div>
            {getStatusIcon(kpiData.punctualityRate, 'punctuality')}
          </div>
          <div className="kpi-content">
            <h3>Punctuality Rate</h3>
            <div className="kpi-value">{kpiData.punctualityRate}%</div>
            <div className="kpi-trend">
              <FiTrendingUp className="trend-icon up" />
              <span>+2.3% from yesterday</span>
            </div>
          </div>
        </div>

        <div className="kpi-card delay">
          <div className="kpi-header">
            <div className="kpi-icon">
              <FiAlertTriangle />
            </div>
            {getStatusIcon(kpiData.avgDelay, 'delay')}
          </div>
          <div className="kpi-content">
            <h3>Average Delay</h3>
            <div className="kpi-value">{kpiData.avgDelay} min</div>
            <div className="kpi-trend">
              <FiTrendingDown className="trend-icon down" />
              <span>-0.8 min from yesterday</span>
            </div>
          </div>
        </div>

        <div className="kpi-card throughput">
          <div className="kpi-header">
            <div className="kpi-icon">
              <FiTruck />
            </div>
            {getStatusIcon(kpiData.trackThroughput, 'throughput')}
          </div>
          <div className="kpi-content">
            <h3>Track Throughput</h3>
            <div className="kpi-value">{kpiData.trackThroughput}</div>
            <div className="kpi-trend">
              <FiTrendingUp className="trend-icon up" />
              <span>+5 trains/hr from yesterday</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Performance Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="punctuality" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="delay" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Station Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="onTime" fill="#10b981" name="On Time" />
              <Bar dataKey="delayed" fill="#f59e0b" name="Delayed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Service Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="alerts-section">
        <h3>Recent Alerts & Notifications</h3>
        <div className="alerts-grid">
          <div className="alert-card warning">
            <FiAlertTriangle className="alert-icon" />
            <div className="alert-content">
              <h4>Delay Alert</h4>
              <p>Train 12345 delayed by 15 minutes at Delhi Station</p>
              <span className="alert-time">2 minutes ago</span>
            </div>
          </div>
          <div className="alert-card info">
            <FiCheckCircle className="alert-icon" />
            <div className="alert-content">
              <h4>System Update</h4>
              <p>KPI data synchronization completed successfully</p>
              <span className="alert-time">5 minutes ago</span>
            </div>
          </div>
          <div className="alert-card success">
            <FiTrendingUp className="alert-icon" />
            <div className="alert-content">
              <h4>Performance Improvement</h4>
              <p>Punctuality rate improved by 2.3% this hour</p>
              <span className="alert-time">10 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
