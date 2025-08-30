'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllFlashcards, getFlashcardsByModule, studyModules, Flashcard } from '@/data/studyData';
import { 
  Brain,
  RotateCcw,
  Check,
  X,
  Shuffle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface CardProgress {
  cardId: string;
  interval: number; // Days until next review
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
  difficulty: number; // 0-5 scale
}

export default function FlashcardsPageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const moduleFilter = searchParams.get('module');

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<Map<string, CardProgress>>(new Map());
  const [studyStats, setStudyStats] = useState({
    cardsStudied: 0,
    correct: 0,
    timeSpent: 0,
    sessionStreak: 0
  });
  const [selectedModule, setSelectedModule] = useState<string>(moduleFilter || 'all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());

  useEffect(() => {
    loadCards();
    loadProgress();
    setSessionStartTime(new Date());
  }, [selectedModule, difficultyFilter]);

  const loadCards = () => {
    let allCards = selectedModule === 'all' 
      ? getAllFlashcards() 
      : getFlashcardsByModule(selectedModule);

    if (difficultyFilter !== 'all') {
      allCards = allCards.filter(card => card.difficulty === difficultyFilter);
    }

    if (mode === 'quick') {
      allCards = allCards.slice(0, 20);
    }

    setCards(shuffleArray([...allCards]));
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const loadProgress = () => {
    const saved = localStorage.getItem('flashcard-progress');
    if (saved) {
      const progressData = JSON.parse(saved);
      const progressMap = new Map();
      Object.entries(progressData).forEach(([key, value]: [string, unknown]) => {
        const cardProgress = value as CardProgress & { nextReview: string };
        progressMap.set(key, {
          ...cardProgress,
          nextReview: new Date(cardProgress.nextReview)
        });
      });
      setProgress(progressMap);
    }
  };

  const saveProgress = (newProgress: Map<string, CardProgress>) => {
    const progressObj: { [key: string]: unknown } = {};
    newProgress.forEach((value, key) => {
      progressObj[key] = {
        ...value,
        nextReview: value.nextReview.toISOString()
      };
    });
    localStorage.setItem('flashcard-progress', JSON.stringify(progressObj));
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const calculateNextReview = (quality: number, cardProgress?: CardProgress): CardProgress => {
    const now = new Date();
    
    if (!cardProgress) {
      // First time seeing this card
      return {
        cardId: cards[currentCardIndex].id,
        interval: quality >= 3 ? 1 : 0,
        repetitions: quality >= 3 ? 1 : 0,
        easeFactor: 2.5,
        nextReview: new Date(now.getTime() + (quality >= 3 ? 24 * 60 * 60 * 1000 : 10 * 60 * 1000)),
        difficulty: 5 - quality
      };
    }

    let { interval, repetitions, easeFactor } = cardProgress;
    
    if (quality >= 3) {
      // Correct response
      repetitions += 1;
      
      if (repetitions === 1) {
        interval = 1;
      } else if (repetitions === 2) {
        interval = 6;
      } else {
        interval = Math.ceil(interval * easeFactor);
      }
      
      easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      if (easeFactor < 1.3) easeFactor = 1.3;
      
    } else {
      // Incorrect response
      repetitions = 0;
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    }

    const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    return {
      cardId: cards[currentCardIndex].id,
      interval,
      repetitions,
      easeFactor,
      nextReview,
      difficulty: 5 - quality
    };
  };

  const handleResponse = (quality: number) => {
    if (cards.length === 0) return;

    const currentCard = cards[currentCardIndex];
    const currentProgress = progress.get(currentCard.id);
    const newProgress = calculateNextReview(quality, currentProgress);
    
    const updatedProgress = new Map(progress);
    updatedProgress.set(currentCard.id, newProgress);
    setProgress(updatedProgress);
    saveProgress(updatedProgress);

    setStudyStats(prev => ({
      cardsStudied: prev.cardsStudied + 1,
      correct: prev.correct + (quality >= 3 ? 1 : 0),
      timeSpent: Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000),
      sessionStreak: quality >= 3 ? prev.sessionStreak + 1 : 0
    }));

    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Session completed
      setCurrentCardIndex(0);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const resetSession = () => {
    loadCards();
    setStudyStats({
      cardsStudied: 0,
      correct: 0,
      timeSpent: 0,
      sessionStreak: 0
    });
    setSessionStartTime(new Date());
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No flashcards available</h2>
        <p className="text-gray-600 mb-6">Try selecting a different module or difficulty level.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];
  const completionPercentage = ((currentCardIndex + 1) / cards.length) * 100;
  const accuracyPercentage = studyStats.cardsStudied > 0 ? (studyStats.correct / studyStats.cardsStudied) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">🧠 Flashcards</h1>
            <p className="text-gray-600">
              Master Part 107 concepts with spaced repetition learning
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Modules</option>
              {studyModules.map(module => (
                <option key={module.id} value={module.id}>{module.title}</option>
              ))}
            </select>
            
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{studyStats.cardsStudied}</div>
            <div className="text-sm text-gray-600">Cards Studied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(accuracyPercentage)}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{studyStats.sessionStreak}</div>
            <div className="text-sm text-gray-600">Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{Math.floor(studyStats.timeSpent / 60)}m</div>
            <div className="text-sm text-gray-600">Time Spent</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Card {currentCardIndex + 1} of {cards.length}</span>
          <span>{Math.round(completionPercentage)}% Complete</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-6">
        <div 
          className={`relative h-80 md:h-96 perspective-1000 cursor-pointer`}
          onClick={flipCard}
        >
          <div className={`absolute inset-0 w-full h-full transition-transform duration-600 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}>
            {/* Front */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-lg shadow-lg border-2 border-blue-200 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentCard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentCard.difficulty}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {currentCard.front}
                </h3>
                <p className="text-gray-500">Click to reveal answer</p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-blue-50 rounded-lg shadow-lg border-2 border-blue-200 p-8 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                  {currentCard.back}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {currentCard.tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Buttons */}
      {isFlipped && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => handleResponse(1)}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium">Again</div>
            <div className="text-sm opacity-90">&lt; 10min</div>
          </button>
          <button
            onClick={() => handleResponse(2)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors"
          >
            <Clock className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium">Hard</div>
            <div className="text-sm opacity-90">1 day</div>
          </button>
          <button
            onClick={() => handleResponse(4)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors"
          >
            <Check className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium">Good</div>
            <div className="text-sm opacity-90">3 days</div>
          </button>
          <button
            onClick={() => handleResponse(5)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors"
          >
            <TrendingUp className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium">Easy</div>
            <div className="text-sm opacity-90">6 days</div>
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={resetSession}
          className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset Session
        </button>
        <button
          onClick={() => setCards(shuffleArray([...cards]))}
          className="flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Shuffle className="h-5 w-5 mr-2" />
          Shuffle Cards
        </button>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transition-transform {
          transition: transform 0.6s;
        }
        .duration-600 {
          transition-duration: 600ms;
        }
      `}</style>
    </div>
  );
}