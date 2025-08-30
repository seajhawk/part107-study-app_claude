'use client';

import { useState, useEffect } from 'react';
import { 
  Settings,
  User,
  Bell,
  Download,
  Upload,
  Trash2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Save,
  RotateCcw,
  Calendar,
  Target,
  Brain,
  Zap
} from 'lucide-react';

interface UserSettings {
  name: string;
  email: string;
  examDate: string;
  studyGoal: number; // minutes per day
  notifications: {
    dailyReminder: boolean;
    weeklyProgress: boolean;
    examReminder: boolean;
  };
  preferences: {
    darkMode: boolean;
    soundEffects: boolean;
    autoAdvance: boolean;
    showExplanations: boolean;
    flashcardTimer: number; // seconds
  };
  privacy: {
    trackProgress: boolean;
    shareStats: boolean;
  };
}

const DEFAULT_SETTINGS: UserSettings = {
  name: '',
  email: '',
  examDate: '',
  studyGoal: 30,
  notifications: {
    dailyReminder: true,
    weeklyProgress: true,
    examReminder: true,
  },
  preferences: {
    darkMode: false,
    soundEffects: true,
    autoAdvance: false,
    showExplanations: true,
    flashcardTimer: 0, // 0 = no timer
  },
  privacy: {
    trackProgress: true,
    shareStats: false,
  }
};

export default function SettingsPageContent() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'profile' | 'study' | 'notifications' | 'privacy' | 'data'>('profile');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const saved = localStorage.getItem('user-settings');
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  };

  const saveSettings = () => {
    localStorage.setItem('user-settings', JSON.stringify(settings));
    setHasChanges(false);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setHasChanges(true);
  };

  const updateSettings = (path: string, value: any) => {
    setSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
    setHasChanges(true);
  };

  const exportData = () => {
    const data = {
      settings,
      flashcardProgress: localStorage.getItem('flashcard-progress'),
      testHistory: localStorage.getItem('practice-test-history'),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `part107-study-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.settings) {
          setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
        }
        if (data.flashcardProgress) {
          localStorage.setItem('flashcard-progress', data.flashcardProgress);
        }
        if (data.testHistory) {
          localStorage.setItem('practice-test-history', data.testHistory);
        }
        setHasChanges(true);
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all study data? This action cannot be undone.')) {
      localStorage.removeItem('flashcard-progress');
      localStorage.removeItem('practice-test-history');
      localStorage.removeItem('user-settings');
      setSettings(DEFAULT_SETTINGS);
      setHasChanges(false);
      alert('All data cleared successfully.');
    }
  };

  const getDaysUntilExam = () => {
    if (!settings.examDate) return null;
    const examDate = new Date(settings.examDate);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExam = getDaysUntilExam();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'study', label: 'Study Preferences', icon: Brain },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Settings },
    { id: 'data', label: 'Data Management', icon: Download },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⚙️ Settings</h1>
        <p className="text-gray-600">
          Customize your study experience and manage your account preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tab Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">Settings</h2>
            </div>
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => updateSettings('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSettings('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Date
                    </label>
                    <input
                      type="date"
                      value={settings.examDate}
                      onChange={(e) => updateSettings('examDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {daysUntilExam !== null && (
                      <p className={`text-sm mt-2 ${daysUntilExam > 30 ? 'text-green-600' : daysUntilExam > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {daysUntilExam > 0 
                          ? `${daysUntilExam} days until your exam`
                          : `Your exam was ${Math.abs(daysUntilExam)} days ago`
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Study Goal (minutes)
                    </label>
                    <select
                      value={settings.studyGoal}
                      onChange={(e) => updateSettings('studyGoal', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>1.5 hours</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Study Preferences Tab */}
            {activeTab === 'study' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Study Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Dark Mode</label>
                      <p className="text-sm text-gray-500">Use dark theme for studying</p>
                    </div>
                    <button
                      onClick={() => updateSettings('preferences.darkMode', !settings.preferences.darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.preferences.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Sound Effects</label>
                      <p className="text-sm text-gray-500">Play sounds for interactions</p>
                    </div>
                    <button
                      onClick={() => updateSettings('preferences.soundEffects', !settings.preferences.soundEffects)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.preferences.soundEffects ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.preferences.soundEffects ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Auto-advance Questions</label>
                      <p className="text-sm text-gray-500">Automatically move to next question after answering</p>
                    </div>
                    <button
                      onClick={() => updateSettings('preferences.autoAdvance', !settings.preferences.autoAdvance)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.preferences.autoAdvance ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.preferences.autoAdvance ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Show Explanations</label>
                      <p className="text-sm text-gray-500">Automatically show explanations after answering</p>
                    </div>
                    <button
                      onClick={() => updateSettings('preferences.showExplanations', !settings.preferences.showExplanations)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.preferences.showExplanations ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.preferences.showExplanations ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flashcard Timer
                    </label>
                    <select
                      value={settings.preferences.flashcardTimer}
                      onChange={(e) => updateSettings('preferences.flashcardTimer', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>No Timer</option>
                      <option value={10}>10 seconds</option>
                      <option value={15}>15 seconds</option>
                      <option value={30}>30 seconds</option>
                      <option value={60}>1 minute</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Time limit for reviewing each flashcard
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Daily Study Reminder</label>
                      <p className="text-sm text-gray-500">Get reminded to study each day</p>
                    </div>
                    <button
                      onClick={() => updateSettings('notifications.dailyReminder', !settings.notifications.dailyReminder)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications.dailyReminder ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.notifications.dailyReminder ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Weekly Progress Report</label>
                      <p className="text-sm text-gray-500">Receive weekly study progress summaries</p>
                    </div>
                    <button
                      onClick={() => updateSettings('notifications.weeklyProgress', !settings.notifications.weeklyProgress)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications.weeklyProgress ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.notifications.weeklyProgress ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Exam Reminders</label>
                      <p className="text-sm text-gray-500">Get notified about upcoming exam date</p>
                    </div>
                    <button
                      onClick={() => updateSettings('notifications.examReminder', !settings.notifications.examReminder)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications.examReminder ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.notifications.examReminder ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Track Study Progress</label>
                      <p className="text-sm text-gray-500">Allow the app to track and analyze your study progress</p>
                    </div>
                    <button
                      onClick={() => updateSettings('privacy.trackProgress', !settings.privacy.trackProgress)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.privacy.trackProgress ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.privacy.trackProgress ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Share Anonymous Statistics</label>
                      <p className="text-sm text-gray-500">Help improve the app by sharing anonymous usage data</p>
                    </div>
                    <button
                      onClick={() => updateSettings('privacy.shareStats', !settings.privacy.shareStats)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.privacy.shareStats ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.privacy.shareStats ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-3">
                      <Download className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-medium text-blue-900">Export Data</h4>
                    </div>
                    <p className="text-sm text-blue-800 mb-4">
                      Download a backup of all your study data, including progress, test results, and settings.
                    </p>
                    <button
                      onClick={exportData}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Export Data
                    </button>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center mb-3">
                      <Upload className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-medium text-green-900">Import Data</h4>
                    </div>
                    <p className="text-sm text-green-800 mb-4">
                      Restore your study data from a previously exported backup file.
                    </p>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importData}
                      className="block w-full text-sm text-green-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700"
                    />
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center mb-3">
                      <Trash2 className="h-5 w-5 text-red-600 mr-2" />
                      <h4 className="font-medium text-red-900">Clear All Data</h4>
                    </div>
                    <p className="text-sm text-red-800 mb-4">
                      Permanently delete all your study progress, test results, and settings. This action cannot be undone.
                    </p>
                    <button
                      onClick={clearAllData}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Clear All Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save/Reset Controls */}
            <div className="border-t px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={resetSettings}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </button>
                
                <div className="flex items-center space-x-3">
                  {hasChanges && (
                    <span className="text-sm text-amber-600">You have unsaved changes</span>
                  )}
                  <button
                    onClick={saveSettings}
                    disabled={!hasChanges}
                    className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                      hasChanges
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}