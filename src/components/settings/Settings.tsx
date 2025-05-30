import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Mail,
  Lock,
  Globe,
  Monitor,
  Shield,
  Database,
  AlertCircle,
  ToggleLeft,
  CheckSquare,
  Save,
  RefreshCw
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </motion.div>
);

interface ToggleSettingProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({ label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      <motion.span
        layout
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </motion.button>
  </div>
);

const Settings: React.FC = () => {
  const { userInfo } = useUser();
  const [settings, setSettings] = useState({
    notifications: {
    email: true,
    push: true,
      updates: false,
      newsletter: true
    },
    privacy: {
      profileVisibility: true,
      activityStatus: true,
      dataSharing: false
    },
    system: {
      autoUpdate: true,
      betaFeatures: false,
    analytics: true,
      backups: true
    }
  });

  const handleSettingChange = (category: keyof typeof settings, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Settings
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your preferences and account settings
              </p>
            </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Notifications */}
        <SettingsSection title="Notifications" icon={<Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />}>
          <ToggleSetting
            label="Email Notifications"
            description="Receive email updates about your account activity"
            enabled={settings.notifications.email}
            onChange={(value) => handleSettingChange('notifications', 'email', value)}
          />
          <ToggleSetting
            label="Push Notifications"
            description="Get push notifications for important updates"
            enabled={settings.notifications.push}
            onChange={(value) => handleSettingChange('notifications', 'push', value)}
          />
          <ToggleSetting
            label="Product Updates"
            description="Be the first to know about new features"
            enabled={settings.notifications.updates}
            onChange={(value) => handleSettingChange('notifications', 'updates', value)}
          />
          <ToggleSetting
            label="Newsletter"
            description="Receive our monthly newsletter"
            enabled={settings.notifications.newsletter}
            onChange={(value) => handleSettingChange('notifications', 'newsletter', value)}
          />
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="Privacy & Security" icon={<Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />}>
          <ToggleSetting
            label="Profile Visibility"
            description="Make your profile visible to other users"
            enabled={settings.privacy.profileVisibility}
            onChange={(value) => handleSettingChange('privacy', 'profileVisibility', value)}
          />
          <ToggleSetting
            label="Activity Status"
            description="Show when you're active on the platform"
            enabled={settings.privacy.activityStatus}
            onChange={(value) => handleSettingChange('privacy', 'activityStatus', value)}
          />
          <ToggleSetting
            label="Data Sharing"
            description="Share usage data to improve our services"
            enabled={settings.privacy.dataSharing}
            onChange={(value) => handleSettingChange('privacy', 'dataSharing', value)}
          />
        </SettingsSection>

        {/* System */}
        <SettingsSection title="System" icon={<Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />}>
          <ToggleSetting
            label="Automatic Updates"
            description="Keep the application up to date automatically"
            enabled={settings.system.autoUpdate}
            onChange={(value) => handleSettingChange('system', 'autoUpdate', value)}
          />
          <ToggleSetting
            label="Beta Features"
            description="Get early access to new features"
            enabled={settings.system.betaFeatures}
            onChange={(value) => handleSettingChange('system', 'betaFeatures', value)}
          />
          <ToggleSetting
            label="Usage Analytics"
            description="Help us improve by sharing analytics data"
            enabled={settings.system.analytics}
            onChange={(value) => handleSettingChange('system', 'analytics', value)}
          />
          <ToggleSetting
            label="Automatic Backups"
            description="Regularly backup your data"
            enabled={settings.system.backups}
            onChange={(value) => handleSettingChange('system', 'backups', value)}
          />
        </SettingsSection>

        {/* Account Info */}
        <SettingsSection title="Account Information" icon={<Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />}>
          <div className="space-y-4">
              <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.name}</p>
            </div>
              <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.department}</p>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default Settings; 