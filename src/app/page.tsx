'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

interface StudyStats {
  totalCards: number;
  cardsStudied: number;
  practiceTests: number;
  averageScore: number;
  studyStreak: number;
  hoursStudied: number;
}

export default function Home() {
  const [stats] = useState<StudyStats>({
    totalCards: 300,
    cardsStudied: 45,
    practiceTests: 3,
    averageScore: 78,
    studyStreak: 5,
    hoursStudied: 12.5
  });

  const studyModules = [
    {
      id: 'regulations',
      title: 'Regulations',
      description: 'Part 107 rules, operational requirements, and limitations',
      percentage: 20,
      progress: 65,
      color: 'bg-blue-500',
      icon: BookOpen
    },
    {
      id: 'airspace',
      title: 'Airspace',
      description: 'Airspace classes, sectional charts, and restrictions',
      percentage: 20,
      progress: 40,
      color: 'bg-green-500',
      icon: Target
    },
    {
      id: 'weather',
      title: 'Weather',
      description: 'METARs, TAFs, weather hazards, and flight planning',
      percentage: 15,
      progress: 55,
      color: 'bg-yellow-500',
      icon: AlertCircle
    },
    {
      id: 'performance',
      title: 'Loading & Performance',
      description: 'Weight limits, aerodynamics, and center of gravity',
      percentage: 10,
      progress: 30,
      color: 'bg-purple-500',
      icon: TrendingUp
    },
    {
      id: 'operations',
      title: 'Operations',
      description: 'Preflight procedures, emergency protocols, safety',
      percentage: 35,
      progress: 25,
      color: 'bg-red-500',
      icon: CheckCircle
    }
  ];

  const quickActions = [
    {
      title: 'Continue Studying',
      description: 'Resume where you left off',
      href: '/study',
      icon: BookOpen,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Quick Flashcards',
      description: '10-minute review session',
      href: '/flashcards?mode=quick',
      icon: Brain,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Practice Test',
      description: 'Take a 20-question quiz',
      href: '/practice',
      icon: Target,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Future Pilot! 🚁</h1>
          <p className="text-blue-100 text-lg">
            Ready to master your Part 107 exam and start your drone pilot career?
          </p>
          <div className="mt-4 flex items-center space-x-4 text-blue-100">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              {stats.studyStreak} day streak
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {stats.hoursStudied}h studied
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cards Studied</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.cardsStudied}/{stats.totalCards}
                </p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(stats.cardsStudied / stats.totalCards) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Practice Tests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.practiceTests}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Completed</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {stats.averageScore >= 70 ? '✅ Passing' : '❌ Keep studying'}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-2xl font-bold text-gray-900">{stats.studyStreak}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Days in a row</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`${action.color} text-white p-4 rounded-lg transition-colors`}
                >
                  <div className="flex items-center">
                    <Icon className="h-6 w-6 mr-3" />
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Study Progress by Module */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Progress by Module</h2>
          <div className="space-y-4">
            {studyModules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`${module.color} p-2 rounded-lg mr-3`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{module.progress}%</p>
                      <p className="text-xs text-gray-500">{module.percentage}% of exam</p>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${module.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">💡 Today&apos;s Study Tip</h2>
          <p className="text-gray-700 mb-3">
            Focus on airspace regulations today! Understanding Class B, C, and D airspace restrictions 
            is crucial for the exam and real-world operations.
          </p>
          <Link 
            href="/study/airspace"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <Play className="h-4 w-4 mr-1" />
            Start Airspace Module
          </Link>
        </div>
      </div>
    </Layout>
  );
}