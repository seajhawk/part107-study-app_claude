// Storage utilities for handling user progress with cookies

export interface UserProgress {
  flashcardProgress: Record<string, {
    cardId: string;
    interval: number;
    repetitions: number;
    easeFactor: number;
    nextReview: string;
    difficulty: number;
  }>;
  testHistory: Array<{
    id: string;
    date: string;
    moduleId?: string;
    totalQuestions: number;
    timeSpent: number;
    score: number;
    answers: Array<{
      questionId: string;
      selectedAnswer: number;
      isCorrect: boolean;
      timeSpent: number;
    }>;
  }>;
  settings: {
    name: string;
    email: string;
    examDate: string;
    studyGoal: number;
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
      flashcardTimer: number;
    };
    privacy: {
      trackProgress: boolean;
      shareStats: boolean;
    };
  };
  studySessions: Array<{
    id: string;
    date: string;
    type: 'flashcards' | 'practice';
    moduleId: string;
    cardsStudied?: number;
    questionsAnswered?: number;
    timeSpent: number;
    accuracy?: number;
    score?: number;
  }>;
}

const DEFAULT_PROGRESS: UserProgress = {
  flashcardProgress: {},
  testHistory: [],
  settings: {
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
      flashcardTimer: 0,
    },
    privacy: {
      trackProgress: true,
      shareStats: false,
    }
  },
  studySessions: []
};

// Cookie management functions
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Progress management functions
export function getUserProgress(): UserProgress {
  try {
    const progressData = getCookie('part107_user_progress');
    if (progressData) {
      const parsed = JSON.parse(progressData);
      // Merge with defaults to ensure all properties exist
      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
        settings: {
          ...DEFAULT_PROGRESS.settings,
          ...parsed.settings,
          notifications: {
            ...DEFAULT_PROGRESS.settings.notifications,
            ...parsed.settings?.notifications
          },
          preferences: {
            ...DEFAULT_PROGRESS.settings.preferences,
            ...parsed.settings?.preferences
          },
          privacy: {
            ...DEFAULT_PROGRESS.settings.privacy,
            ...parsed.settings?.privacy
          }
        }
      };
    }
  } catch (error) {
    console.error('Error loading user progress from cookies:', error);
  }
  
  return { ...DEFAULT_PROGRESS };
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    const progressData = JSON.stringify(progress);
    setCookie('part107_user_progress', progressData, 365); // Store for 1 year
  } catch (error) {
    console.error('Error saving user progress to cookies:', error);
  }
}

export function updateUserProgress(updates: Partial<UserProgress>): UserProgress {
  const currentProgress = getUserProgress();
  const newProgress = {
    ...currentProgress,
    ...updates,
    settings: {
      ...currentProgress.settings,
      ...updates.settings,
      notifications: {
        ...currentProgress.settings.notifications,
        ...updates.settings?.notifications
      },
      preferences: {
        ...currentProgress.settings.preferences,
        ...updates.settings?.preferences
      },
      privacy: {
        ...currentProgress.settings.privacy,
        ...updates.settings?.privacy
      }
    }
  };
  
  saveUserProgress(newProgress);
  return newProgress;
}

export function resetUserProgress(): void {
  deleteCookie('part107_user_progress');
}

// Individual data access functions for backward compatibility
export function getFlashcardProgress(): Record<string, any> {
  const progress = getUserProgress();
  return progress.flashcardProgress;
}

export function saveFlashcardProgress(flashcardProgress: Record<string, any>): void {
  updateUserProgress({ flashcardProgress });
}

export function getTestHistory(): Array<any> {
  const progress = getUserProgress();
  return progress.testHistory;
}

export function saveTestHistory(testHistory: Array<any>): void {
  updateUserProgress({ testHistory });
}

export function getUserSettings(): UserProgress['settings'] {
  const progress = getUserProgress();
  return progress.settings;
}

export function saveUserSettings(settings: UserProgress['settings']): void {
  updateUserProgress({ settings });
}

export function getStudySessions(): Array<any> {
  const progress = getUserProgress();
  return progress.studySessions;
}

export function saveStudySessions(studySessions: Array<any>): void {
  updateUserProgress({ studySessions });
}

// Migration function to convert localStorage data to cookies
export function migrateFromLocalStorage(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const hasLocalStorageData = localStorage.getItem('user-settings') || 
                               localStorage.getItem('practice-test-history') || 
                               localStorage.getItem('flashcard-progress');
    
    if (!hasLocalStorageData) return false;
    
    const progress = getUserProgress();
    let migrationOccurred = false;
    
    // Migrate settings
    const settings = localStorage.getItem('user-settings');
    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings);
        progress.settings = { ...progress.settings, ...parsedSettings };
        migrationOccurred = true;
      } catch (e) {
        console.warn('Could not migrate settings from localStorage');
      }
    }
    
    // Migrate test history
    const testHistory = localStorage.getItem('practice-test-history');
    if (testHistory) {
      try {
        progress.testHistory = JSON.parse(testHistory);
        migrationOccurred = true;
      } catch (e) {
        console.warn('Could not migrate test history from localStorage');
      }
    }
    
    // Migrate flashcard progress
    const flashcardProgress = localStorage.getItem('flashcard-progress');
    if (flashcardProgress) {
      try {
        progress.flashcardProgress = JSON.parse(flashcardProgress);
        migrationOccurred = true;
      } catch (e) {
        console.warn('Could not migrate flashcard progress from localStorage');
      }
    }
    
    if (migrationOccurred) {
      saveUserProgress(progress);
      
      // Clean up old localStorage data
      localStorage.removeItem('user-settings');
      localStorage.removeItem('practice-test-history');
      localStorage.removeItem('flashcard-progress');
      
      console.log('Successfully migrated data from localStorage to cookies');
      return true;
    }
  } catch (error) {
    console.error('Error during localStorage migration:', error);
  }
  
  return false;
}