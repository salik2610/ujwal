import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTrendingUp, 
  FiShield, 
  FiUsers, 
  FiBarChart2,
  FiClock,
  FiAlertTriangle,
  FiTruck,
  FiArrowRight
} from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FiBarChart2 />,
      title: "Real-Time Analytics",
      description: "Monitor railway performance with live dashboards and comprehensive analytics"
    },
    {
      icon: <FiShield />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for optimizing train operations and scheduling"
    },
    {
      icon: <FiUsers />,
      title: "User Management",
      description: "Manage railway staff access and permissions with role-based authentication"
    },
    {
      icon: <FiTrendingUp />,
      title: "Performance Tracking",
      description: "Track KPIs, punctuality rates, and operational efficiency metrics"
    }
  ];

  const stats = [
    { icon: <FiClock />, value: "92%", label: "Punctuality Rate", color: "#10b981" },
    { icon: <FiAlertTriangle />, value: "4.5 min", label: "Avg Delay", color: "#f59e0b" },
    { icon: <FiTruck />, value: "120", label: "Trains/Hour", color: "#3b82f6" },
    { icon: <FiUsers />, value: "15,000+", label: "Daily Passengers", color: "#8b5cf6" }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Ujwal Portal</h1>
            <h2>Indian Railways Performance Management System</h2>
            <p>
              The Ujwal Portal is a comprehensive digital platform designed to revolutionize 
              Indian Railways operations through advanced analytics, AI-powered insights, and 
              real-time monitoring capabilities. Built as part of the Gati-Rakshak initiative, 
              this system empowers railway administrators with the tools needed to ensure 
              optimal performance, safety, and efficiency across the entire railway network.
            </p>
            <div className="hero-buttons">
              <Link to="/dashboard" className="btn btn-primary">
                <FiBarChart2 />
                View Dashboard
                <FiArrowRight />
              </Link>
              <Link to="/analytics" className="btn btn-secondary">
                <FiTrendingUp />
                Analytics
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="railway-visual">
              <div className="train-track">
                <div className="track-line"></div>
                <div className="train moving"></div>
              </div>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-icon" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Comprehensive tools for modern railway management</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Gati-Rakshak Initiative</h2>
              <p>
                The Gati-Rakshak project represents a significant leap forward in Indian Railways' 
                digital transformation journey. The Ujwal Module specifically focuses on performance 
                analytics and operational excellence, providing railway administrators with unprecedented 
                visibility into system performance.
              </p>
              <div className="about-points">
                <div className="point">
                  <FiShield />
                  <span>Enhanced Safety Monitoring</span>
                </div>
                <div className="point">
                  <FiTrendingUp />
                  <span>Performance Optimization</span>
                </div>
                <div className="point">
                  <FiUsers />
                  <span>Stakeholder Collaboration</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="network-diagram">
                <div className="central-hub">
                  <div className="hub-icon">🚂</div>
                  <span>Ujwal Portal</span>
                </div>
                <div className="connected-nodes">
                  <div className="node">Analytics</div>
                  <div className="node">Monitoring</div>
                  <div className="node">Management</div>
                  <div className="node">Reporting</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Railway Operations?</h2>
            <p>Access the full suite of Ujwal Portal features and start optimizing your railway operations today.</p>
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary">
                <FiUsers />
                Login to Portal
              </Link>
              <Link to="/dashboard" className="btn btn-outline">
                <FiBarChart2 />
                Explore Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
