'use client';

import { useState, useEffect } from 'react';
import { studyModules } from '@/data/studyData';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Brain, 
  Trophy,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  Zap,
  Star
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface StudySession {
  id: string;
  date: Date;
  type: 'flashcards' | 'practice';
  moduleId: string;
  cardsStudied?: number;
  questionsAnswered?: number;
  timeSpent: number;
  accuracy?: number;
  score?: number;
}

interface FlashcardProgress {
  cardId: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
  difficulty: number;
  timesReviewed: number;
  lastReviewed: Date;
}

export default function ProgressPageContent() {
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [flashcardProgress, setFlashcardProgress] = useState<Map<string, FlashcardProgress>>(new Map());
  const [testResults, setTestResults] = useState<any[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = () => {
    // Load flashcard progress
    const flashcardData = localStorage.getItem('flashcard-progress');
    if (flashcardData) {
      const progressData = JSON.parse(flashcardData);
      const progressMap = new Map();
      Object.entries(progressData).forEach(([key, value]: [string, any]) => {
        progressMap.set(key, {
          ...value,
          nextReview: new Date(value.nextReview),
          lastReviewed: new Date(value.lastReviewed || Date.now())
        });
      });
      setFlashcardProgress(progressMap);
    }

    // Load test results
    const testData = localStorage.getItem('practice-test-history');
    if (testData) {
      const results = JSON.parse(testData).map((test: any) => ({
        ...test,
        date: new Date(test.date)
      }));
      setTestResults(results);
    }

    // Generate study sessions from available data
    generateStudySessions();
  };

  const generateStudySessions = () => {
    const sessions: StudySession[] = [];
    
    // Add sessions from test results
    const testData = localStorage.getItem('practice-test-history');
    if (testData) {
      const results = JSON.parse(testData);
      results.forEach((test: any) => {
        sessions.push({
          id: `test-${test.id}`,
          date: new Date(test.date),
          type: 'practice',
          moduleId: test.moduleId || 'all',
          questionsAnswered: test.totalQuestions,
          timeSpent: test.timeSpent,
          accuracy: test.score
        });
      });
    }

    // Sort by date
    sessions.sort((a, b) => b.date.getTime() - a.date.getTime());
    setStudySessions(sessions);
  };

  const getStudyStreak = (): number => {
    if (studySessions.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sessionDates = studySessions
      .map(session => {
        const date = new Date(session.date);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort((a, b) => b - a);
    
    for (let i = 0; i < sessionDates.length; i++) {
      const expectedDate = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
      if (sessionDates[i] === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getTotalStudyTime = (): number => {
    return studySessions.reduce((total, session) => total + session.timeSpent, 0);
  };

  const getAverageTestScore = (): number => {
    const testSessions = studySessions.filter(session => session.accuracy !== undefined);
    if (testSessions.length === 0) return 0;
    return Math.round(testSessions.reduce((sum, session) => sum + (session.accuracy || 0), 0) / testSessions.length);
  };

  const getWeakAreas = () => {
    const modulePerformance: { [key: string]: { correct: number; total: number; name: string } } = {};
    
    studyModules.forEach(module => {
      modulePerformance[module.id] = { correct: 0, total: 0, name: module.title };
    });

    testResults.forEach(test => {
      test.answers?.forEach((answer: any) => {
        // This is simplified - in a real app you'd need to track question-to-module mapping
        const moduleId = test.moduleId || 'regulations';
        if (modulePerformance[moduleId]) {
          modulePerformance[moduleId].total++;
          if (answer.isCorrect) {
            modulePerformance[moduleId].correct++;
          }
        }
      });
    });

    return Object.values(modulePerformance)
      .filter(module => module.total > 0)
      .map(module => ({
        ...module,
        percentage: Math.round((module.correct / module.total) * 100)
      }))
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3);
  };

  const getRecentActivity = () => {
    return studySessions.slice(0, 10);
  };

  const studyStreak = getStudyStreak();
  const totalStudyTime = getTotalStudyTime();
  const averageScore = getAverageTestScore();
  const weakAreas = getWeakAreas();
  const recentActivity = getRecentActivity();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Progress Tracking</h1>
        <p className="text-gray-600">
          Monitor your Part 107 study progress and identify areas for improvement
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Study Streak</p>
              <p className="text-2xl font-bold text-gray-900">{studyStreak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Study Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.floor(totalStudyTime / 3600)}h {Math.floor((totalStudyTime % 3600) / 60)}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tests Taken</p>
              <p className="text-2xl font-bold text-gray-900">{testResults.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Test Results */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Test Results</h2>
            </div>
            <div className="p-6">
              {testResults.length > 0 ? (
                <div className="space-y-4">
                  {testResults.slice(0, 5).map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-4 ${
                          test.score >= 70 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {test.score >= 70 ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Practice Test ({test.totalQuestions} questions)
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDistanceToNow(test.date, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${
                          test.score >= 70 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {test.score}%
                        </p>
                        <p className="text-sm text-gray-600">
                          {Math.floor(test.timeSpent / 60)}min
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No test results yet</p>
                  <p className="text-sm text-gray-500">Take a practice test to see your progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Study Activity */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((session) => (
                    <div key={session.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg mr-4">
                        {session.type === 'practice' ? (
                          <Target className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Brain className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {session.type === 'practice' ? 'Practice Test' : 'Flashcard Study'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {session.type === 'practice' 
                            ? `${session.questionsAnswered} questions • ${session.accuracy}% score`
                            : `${session.cardsStudied} cards studied`
                          }
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {formatDistanceToNow(session.date, { addSuffix: true })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {Math.floor(session.timeSpent / 60)}min
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No recent activity</p>
                  <p className="text-sm text-gray-500">Start studying to track your progress</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weak Areas */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Areas to Focus</h3>
            </div>
            <div className="p-6">
              {weakAreas.length > 0 ? (
                <div className="space-y-4">
                  {weakAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{area.name}</p>
                        <p className="text-sm text-gray-600">{area.total} questions attempted</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          area.percentage >= 70 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {area.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Take tests to identify weak areas</p>
                </div>
              )}
            </div>
          </div>

          {/* Study Goals */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Study Goals</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Daily Study</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  studyStreak > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {studyStreak > 0 ? '✓ On Track' : 'Start Today'}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Pass Practice Tests</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  averageScore >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {averageScore >= 70 ? '✓ Achieved' : `${averageScore}% avg`}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Exam Ready</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  averageScore >= 80 && studyStreak >= 7 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {averageScore >= 80 && studyStreak >= 7 ? '✓ Ready' : 'Keep Going'}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  { icon: Award, title: 'First Test', description: 'Complete your first practice test', achieved: testResults.length > 0 },
                  { icon: Zap, title: 'Study Streak', description: '7 days of consistent studying', achieved: studyStreak >= 7 },
                  { icon: Target, title: 'High Scorer', description: 'Score 80% or higher on a test', achieved: testResults.some(t => t.score >= 80) },
                  { icon: Trophy, title: 'Exam Ready', description: 'Consistently score above 70%', achieved: averageScore >= 75 }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      achievement.achieved ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <achievement.icon className={`h-4 w-4 ${
                        achievement.achieved ? 'text-yellow-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        achievement.achieved ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    {achievement.achieved && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}