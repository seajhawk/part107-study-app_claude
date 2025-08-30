'use client';

import { useState } from 'react';
import { studyModules, StudyModule, Topic } from '@/data/studyData';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronDown,
  Clock,
  Target,
  Brain,
  CheckCircle,
  Play,
  FileText,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

export default function StudyPageContent() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
    setSelectedTopic(null);
  };

  const selectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 Study Modules</h1>
        <p className="text-gray-600">
          Master Part 107 concepts with interactive study modules covering all exam topics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Study Modules</h2>
              <p className="text-sm text-gray-600 mt-1">
                Select a module to explore topics and content
              </p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {studyModules.map((module) => (
                <div key={module.id}>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${module.color} mr-3`} />
                        <div>
                          <h3 className="font-medium text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-500">{module.examPercentage}% of exam</p>
                        </div>
                      </div>
                      {expandedModule === module.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {expandedModule === module.id && (
                    <div className="bg-gray-50 border-t">
                      {module.topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => selectTopic(topic)}
                          className={`w-full p-3 pl-8 text-left text-sm hover:bg-white transition-colors ${
                            selectedTopic?.id === topic.id ? 'bg-white border-r-2 border-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">{topic.title}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {topic.flashcards.length} cards
                              </span>
                              <span className="text-xs text-gray-500">
                                {topic.practiceQuestions.length} questions
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          {selectedTopic ? (
            <TopicContent topic={selectedTopic} />
          ) : (
            <ModuleOverview />
          )}
        </div>
      </div>
    </div>
  );
}

function ModuleOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Study Module</h2>
          <p className="text-gray-600">
            Choose a module from the left to explore topics and study materials
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {studyModules.length}
            </div>
            <div className="text-sm text-gray-600">Study Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {studyModules.reduce((total, module) => total + module.topics.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Topics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {studyModules.reduce((total, module) => 
                total + module.topics.reduce((topicTotal, topic) => topicTotal + topic.flashcards.length, 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Flashcards</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {studyModules.reduce((total, module) => 
                total + module.topics.reduce((topicTotal, topic) => topicTotal + topic.practiceQuestions.length, 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyModules.map((module) => (
            <div key={module.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className={`w-4 h-4 rounded-full ${module.color} mr-3`} />
                <h3 className="font-semibold text-gray-900">{module.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{module.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{module.examPercentage}% of exam</span>
                <span>{module.topics.length} topics</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopicContent({ topic }: { topic: Topic }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'keypoints' | 'actions'>('overview');

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Brain className="h-4 w-4 mr-1" />
            {topic.flashcards.length} flashcards
          </div>
          <div className="flex items-center">
            <Target className="h-4 w-4 mr-1" />
            {topic.practiceQuestions.length} practice questions
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="px-6 -mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'keypoints', label: 'Key Points', icon: Lightbulb },
            { id: 'actions', label: 'Study Actions', icon: Play }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Overview</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{topic.content}</p>
            </div>
          </div>
        )}

        {activeTab === 'keypoints' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Points to Remember</h3>
            <div className="space-y-3">
              {topic.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'actions' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Study This Topic</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Flashcards */}
              <Link 
                href={`/flashcards?module=${topic.id.split('-')[0]}`}
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Study Flashcards</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Review {topic.flashcards.length} flashcards with spaced repetition
                </p>
                <div className="flex items-center text-sm text-purple-600">
                  <Clock className="h-4 w-4 mr-1" />
                  ~{Math.ceil(topic.flashcards.length / 2)} minutes
                </div>
              </Link>

              {/* Practice Questions */}
              <Link
                href={`/practice?module=${topic.id.split('-')[0]}`}
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Practice Questions</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Test knowledge with {topic.practiceQuestions.length} practice questions
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  <Clock className="h-4 w-4 mr-1" />
                  ~{Math.ceil(topic.practiceQuestions.length * 1.5)} minutes
                </div>
              </Link>
            </div>

            {/* Study Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Study Tip</h4>
                  <p className="text-sm text-blue-800">
                    Start with flashcards to learn the concepts, then reinforce your knowledge with practice questions. 
                    Review key points regularly and focus on areas where you struggle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}