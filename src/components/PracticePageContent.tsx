'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllQuestions, getQuestionsByModule, studyModules, Question } from '@/data/studyData';
import { 
  Target,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Play,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface TestResult {
  id: string;
  date: Date;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  moduleId?: string;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

export default function PracticePageContent() {
  const searchParams = useSearchParams();
  const moduleFilter = searchParams.get('module');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [testMode, setTestMode] = useState<'full' | 'quick' | 'mini' | 'practice' | 'module'>('quick');
  const [selectedModule, setSelectedModule] = useState<string>(moduleFilter || 'all');
  const [showExplanations, setShowExplanations] = useState(false);

  useEffect(() => {
    loadTestHistory();
  }, []);

  useEffect(() => {
    if (testCompleted && questions.length > 0) {
      generateTestResult();
    }
  }, [testCompleted, questions.length]);

  const loadTestHistory = () => {
    const saved = localStorage.getItem('practice-test-history');
    if (saved) {
      const history = JSON.parse(saved).map((test: unknown) => {
        const testResult = test as TestResult & { date: string };
        return {
          ...testResult,
          date: new Date(testResult.date)
        };
      });
      setTestHistory(history);
    }
  };

  const saveTestResult = (result: TestResult) => {
    const updatedHistory = [...testHistory, result];
    setTestHistory(updatedHistory);
    localStorage.setItem('practice-test-history', JSON.stringify(updatedHistory));
  };

  const startTest = () => {
    let testQuestions: Question[] = [];

    if (selectedModule === 'all') {
      testQuestions = getAllQuestions();
    } else {
      testQuestions = getQuestionsByModule(selectedModule);
    }

    // Shuffle questions
    testQuestions = shuffleArray([...testQuestions]);

    // Limit questions based on test mode
    if (testMode === 'mini') {
      testQuestions = testQuestions.slice(0, 10);
    } else if (testMode === 'quick') {
      testQuestions = testQuestions.slice(0, 20);
    } else if (testMode === 'practice') {
      testQuestions = testQuestions.slice(0, 50);
    } else if (testMode === 'full') {
      testQuestions = testQuestions.slice(0, 100);
    }

    setQuestions(testQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTestStartTime(new Date());
    setTestCompleted(false);
    setTestResult(null);
    setShowExplanations(false);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitTest = () => {
    setTestCompleted(true);
  };

  const generateTestResult = () => {
    if (!testStartTime || questions.length === 0) return;

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - testStartTime.getTime()) / 1000);
    
    let correctCount = 0;
    const answers = questions.map((question, index) => {
      const selectedAnswer = selectedAnswers[index] ?? -1;
      const isCorrect = selectedAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: question.id,
        selectedAnswer,
        isCorrect,
        timeSpent: Math.floor(timeSpent / questions.length)
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);

    const result: TestResult = {
      id: `test-${Date.now()}`,
      date: endTime,
      score,
      totalQuestions: questions.length,
      timeSpent,
      moduleId: selectedModule === 'all' ? undefined : selectedModule,
      answers
    };

    setTestResult(result);
    saveTestResult(result);
  };

  const resetTest = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTestStartTime(null);
    setTestCompleted(false);
    setTestResult(null);
    setShowExplanations(false);
  };

  const getProgressPercentage = () => {
    if (questions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  const getTimeElapsed = () => {
    if (!testStartTime) return 0;
    return Math.floor((new Date().getTime() - testStartTime.getTime()) / 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Test setup screen
  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">🎯 Practice Test</h1>
          <p className="text-gray-600 mb-6">
            Test your knowledge with realistic Part 107 exam questions
          </p>

          {/* Test Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                testMode === 'mini' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setTestMode('mini')}
            >
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold">Mini Test</h3>
              </div>
              <p className="text-sm text-gray-600">10 questions • ~8 minutes</p>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                testMode === 'quick' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setTestMode('quick')}
            >
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold">Quick Test</h3>
              </div>
              <p className="text-sm text-gray-600">20 questions • ~15 minutes</p>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                testMode === 'practice' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setTestMode('practice')}
            >
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="font-semibold">Practice Test</h3>
              </div>
              <p className="text-sm text-gray-600">50 questions • ~40 minutes</p>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                testMode === 'full' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setTestMode('full')}
            >
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-semibold">Full Exam</h3>
              </div>
              <p className="text-sm text-gray-600">100 questions • ~2 hours</p>
            </div>
          </div>

          {/* Module Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Study Module (Optional)
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Modules</option>
              {studyModules.map(module => (
                <option key={module.id} value={module.id}>{module.title}</option>
              ))}
            </select>
          </div>


          {/* Recent Test History */}
          {testHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recent Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testHistory.slice(-3).map((test) => (
                  <div key={test.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-lg font-bold ${
                        test.score >= 70 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {test.score}%
                      </span>
                      <span className="text-sm text-gray-500">
                        {test.totalQuestions} questions
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {test.date.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startTest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Test
          </button>
        </div>
      </div>
    );
  }

  // Test results screen
  if (testCompleted && testResult) {
    const passingScore = testResult.score >= 70;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              passingScore ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passingScore ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {passingScore ? '🎉 Congratulations!' : '📚 Keep Studying!'}
            </h2>
            
            <p className={`text-lg ${passingScore ? 'text-green-600' : 'text-red-600'}`}>
              Your Score: {testResult.score}%
            </p>
            
            <p className="text-gray-600 mt-2">
              {passingScore 
                ? 'You passed! You\'re ready for the real exam.'
                : 'You need 70% to pass. Review the explanations below.'
              }
            </p>
          </div>

          {/* Test Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {testResult.answers.filter(a => a.isCorrect).length}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {testResult.answers.filter(a => !a.isCorrect).length}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {testResult.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {formatTime(testResult.timeSpent)}
              </div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {showExplanations ? 'Hide' : 'Show'} Explanations
            </button>
            <button
              onClick={resetTest}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Take Another Test
            </button>
          </div>
        </div>

        {/* Question Review */}
        {showExplanations && (
          <div className="space-y-6">
            {questions.map((question, index) => {
              const answer = testResult.answers[index];
              const isCorrect = answer.isCorrect;
              
              return (
                <div key={question.id} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </div>
                  </div>
                  
                  <p className="text-gray-900 mb-4">{question.question}</p>
                  
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = answer.selectedAnswer === optionIndex;
                      const isCorrectAnswer = optionIndex === question.correctAnswer;
                      
                      return (
                        <div 
                          key={optionIndex}
                          className={`p-3 rounded-lg border ${
                            isCorrectAnswer 
                              ? 'border-green-500 bg-green-50' 
                              : isSelected && !isCorrect
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {isCorrectAnswer && <CheckCircle className="h-5 w-5 text-green-600 mr-2" />}
                            {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600 mr-2" />}
                            <span className={`font-medium ${
                              isCorrectAnswer ? 'text-green-800' :
                              isSelected && !isCorrect ? 'text-red-800' :
                              'text-gray-900'
                            }`}>
                              {option}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                    <p className="text-blue-800">{question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Active test screen
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Practice Test</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(getTimeElapsed())}
            </div>
            <div>
              {getAnsweredCount()}/{questions.length} answered
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(getProgressPercentage())}% Complete</span>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <label 
              key={index}
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedAnswer === index 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
                className="mt-1 mr-3 text-blue-600"
              />
              <span className="text-gray-900 font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
          >
            Previous
          </button>
          
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitTest}
              disabled={getAnsweredCount() < questions.length}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors font-medium"
            >
              Submit Test
            </button>
          )}
        </div>

        <div className="text-sm text-gray-600">
          {getAnsweredCount() < questions.length && (
            <span className="text-yellow-600">
              Answer all questions to submit
            </span>
          )}
        </div>
      </div>
    </div>
  );
}