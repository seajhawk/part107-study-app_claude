'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { getUserSettings } from '@/utils/storage';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const applyTheme = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    applyTheme(newDarkMode);
  };

  useEffect(() => {
    // Load theme preference from cookies on initial load
    try {
      const settings = getUserSettings();
      const darkMode = settings.preferences.darkMode;
      setIsDarkMode(darkMode);
      applyTheme(darkMode);
    } catch (error) {
      console.error('Error loading theme preference:', error);
      // Default to light mode
      setIsDarkMode(false);
      applyTheme(false);
    }
  }, []);

  useEffect(() => {
    // Listen for storage changes to update theme when settings change
    const handleStorageChange = () => {
      try {
        const settings = getUserSettings();
        const newDarkMode = settings.preferences.darkMode;
        
        if (newDarkMode !== isDarkMode) {
          setIsDarkMode(newDarkMode);
          applyTheme(newDarkMode);
        }
      } catch (error) {
        console.error('Error checking theme preference:', error);
      }
    };

    // Check for changes every 500ms (since we're using cookies, not localStorage events)
    const interval = setInterval(handleStorageChange, 500);
    
    return () => clearInterval(interval);
  }, [isDarkMode]);

  const contextValue: ThemeContextType = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}