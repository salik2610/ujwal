import React, { useState } from 'react';
import { FiSettings, FiUser, FiBell, FiShield, FiDatabase, FiMonitor, FiSave, FiRefreshCw } from 'react-icons/fi';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'Gati-Rakshak Ujwal Module',
      timezone: 'Asia/Kolkata',
      language: 'en',
      autoRefresh: true,
      refreshInterval: 30
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      delayAlerts: true,
      systemUpdates: true,
      performanceAlerts: true
    },
    security: {
      sessionTimeout: 30,
      requirePasswordChange: false,
      twoFactorAuth: false,
      auditLogging: true
    },
    data: {
      dataRetention: 365,
      backupFrequency: 'daily',
      compressionEnabled: true,
      encryptionEnabled: true
    }
  });

  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'data', label: 'Data Management', icon: FiDatabase }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        general: {
          systemName: 'Gati-Rakshak Ujwal Module',
          timezone: 'Asia/Kolkata',
          language: 'en',
          autoRefresh: true,
          refreshInterval: 30
        },
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          delayAlerts: true,
          systemUpdates: true,
          performanceAlerts: true
        },
        security: {
          sessionTimeout: 30,
          requirePasswordChange: false,
          twoFactorAuth: false,
          auditLogging: true
        },
        data: {
          dataRetention: 365,
          backupFrequency: 'daily',
          compressionEnabled: true,
          encryptionEnabled: true
        }
      });
    }
  };

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <div className="setting-group">
        <label>System Name</label>
        <input
          type="text"
          value={settings.general.systemName}
          onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
          className="setting-input"
        />
      </div>

      <div className="setting-group">
        <label>Timezone</label>
        <select
          value={settings.general.timezone}
          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
          className="setting-select"
        >
          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York (EST)</option>
          <option value="Europe/London">Europe/London (GMT)</option>
        </select>
      </div>

      <div className="setting-group">
        <label>Language</label>
        <select
          value={settings.general.language}
          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
          className="setting-select"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.general.autoRefresh}
            onChange={(e) => handleSettingChange('general', 'autoRefresh', e.target.checked)}
          />
          <span className="checkmark"></span>
          Enable Auto Refresh
        </label>
      </div>

      {settings.general.autoRefresh && (
        <div className="setting-group">
          <label>Refresh Interval (seconds)</label>
          <input
            type="number"
            min="10"
            max="300"
            value={settings.general.refreshInterval}
            onChange={(e) => handleSettingChange('general', 'refreshInterval', parseInt(e.target.value))}
            className="setting-input"
          />
        </div>
      )}
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
          />
          <span className="checkmark"></span>
          Email Notifications
        </label>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.notifications.pushNotifications}
            onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
          />
          <span className="checkmark"></span>
          Push Notifications
        </label>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.notifications.delayAlerts}
            onChange={(e) => handleSettingChange('notifications', 'delayAlerts', e.target.checked)}
          />
          <span className="checkmark"></span>
          Delay Alerts
        </label>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.notifications.systemUpdates}
            onChange={(e) => handleSettingChange('notifications', 'systemUpdates', e.target.checked)}
          />
          <span className="checkmark"></span>
          System Updates
        </label>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.notifications.performanceAlerts}
            onChange={(e) => handleSettingChange('notifications', 'performanceAlerts', e.target.checked)}
          />
          <span className="checkmark"></span>
          Performance Alerts
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="setting-group">
        <label>Session Timeout (minutes)</label>
        <input
          type="number"
          min="5"
          max="480"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className="setting-input"
        />
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.security.requirePasswordChange}
            onChange={(e) => handleSettingChange('security', 'requirePasswordChange', e.target.checked)}
          />
          <span className="checkmark"></span>
          Require Password Change on Next Login
        </label>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
          />
          <span className="checkmark"></span>
          Enable Two-Factor Authentication
        </label>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.security.auditLogging}
            onChange={(e) => handleSettingChange('security', 'auditLogging', e.target.checked)}
          />
          <span className="checkmark"></span>
          Enable Audit Logging
        </label>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="settings-section">
      <div className="setting-group">
        <label>Data Retention Period (days)</label>
        <input
          type="number"
          min="30"
          max="3650"
          value={settings.data.dataRetention}
          onChange={(e) => handleSettingChange('data', 'dataRetention', parseInt(e.target.value))}
          className="setting-input"
        />
      </div>

      <div className="setting-group">
        <label>Backup Frequency</label>
        <select
          value={settings.data.backupFrequency}
          onChange={(e) => handleSettingChange('data', 'backupFrequency', e.target.value)}
          className="setting-select"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.data.compressionEnabled}
            onChange={(e) => handleSettingChange('data', 'compressionEnabled', e.target.checked)}
          />
          <span className="checkmark"></span>
          Enable Data Compression
        </label>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.data.encryptionEnabled}
            onChange={(e) => handleSettingChange('data', 'encryptionEnabled', e.target.checked)}
          />
          <span className="checkmark"></span>
          Enable Data Encryption
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'data':
        return renderDataSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>System Settings</h1>
        <p>Configure your Gati-Rakshak system preferences</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="tab-icon" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="settings-content">
          <div className="settings-panel">
            <div className="panel-header">
              <h2>{tabs.find(tab => tab.id === activeTab)?.label} Settings</h2>
            </div>
            <div className="panel-content">
              {renderTabContent()}
            </div>
            <div className="panel-footer">
              <button
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={loading}
              >
                <FiRefreshCw />
                Reset to Default
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <FiSave />
                )}
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
