export interface StudyModule {
  id: string;
  title: string;
  description: string;
  examPercentage: number;
  topics: Topic[];
  color: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  flashcards: Flashcard[];
  practiceQuestions: Question[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export const studyModules: StudyModule[] = [
  {
    id: 'regulations',
    title: 'Regulations',
    description: 'Part 107 rules, operational requirements, and limitations',
    examPercentage: 20,
    color: 'bg-blue-500',
    topics: [
      {
        id: 'part107-basics',
        title: 'Part 107 Basics',
        content: `Part 107 governs the operation of small unmanned aircraft systems (sUAS) for commercial purposes. 
        Key requirements include obtaining a Remote Pilot Certificate, registering aircraft over 0.55 lbs, 
        and following operational limitations.`,
        keyPoints: [
          'Remote Pilot Certificate required for commercial operations',
          'Must be at least 16 years old',
          'Pass aeronautical knowledge test every 24 months',
          'Aircraft must be under 55 lbs',
          'Registration required for aircraft over 0.55 lbs'
        ],
        flashcards: [
          {
            id: 'reg-001',
            front: 'What is the minimum age to obtain a Remote Pilot Certificate?',
            back: '16 years old',
            difficulty: 'easy',
            tags: ['age', 'certificate']
          },
          {
            id: 'reg-002',
            front: 'How often must a remote pilot pass the recurrent knowledge test?',
            back: 'Every 24 calendar months',
            difficulty: 'medium',
            tags: ['recurrent', 'test']
          },
          {
            id: 'reg-003',
            front: 'What is the maximum weight for a small unmanned aircraft under Part 107?',
            back: 'Less than 55 pounds including payload',
            difficulty: 'easy',
            tags: ['weight', 'aircraft']
          }
        ],
        practiceQuestions: [
          {
            id: 'reg-q001',
            question: 'A person may operate a small unmanned aircraft without a Remote Pilot Certificate if:',
            options: [
              'The operation is conducted for recreational purposes',
              'The aircraft weighs less than 2 pounds',
              'The person operates under the direct supervision of a certified remote pilot',
              'The flight is conducted at night'
            ],
            correctAnswer: 2,
            explanation: 'A person without a Remote Pilot Certificate may operate under the direct supervision of a certified remote pilot in command.',
            difficulty: 'medium',
            tags: ['supervision', 'certificate']
          }
        ]
      },
      {
        id: 'operational-limitations',
        title: 'Operational Limitations',
        content: `Part 107 establishes specific operational limitations for sUAS operations including 
        altitude restrictions, visual line of sight requirements, and prohibited operations.`,
        keyPoints: [
          'Maximum altitude of 400 feet AGL',
          'Visual line of sight required',
          'No operations over people (with exceptions)',
          'Daylight operations only (waiver required for night)',
          'Maximum groundspeed of 87 knots (100 mph)'
        ],
        flashcards: [
          {
            id: 'reg-004',
            front: 'What is the maximum altitude for Part 107 operations?',
            back: '400 feet above ground level (AGL)',
            difficulty: 'easy',
            tags: ['altitude', 'limitations']
          },
          {
            id: 'reg-005',
            front: 'What is the maximum groundspeed for sUAS under Part 107?',
            back: '87 knots (100 mph)',
            difficulty: 'medium',
            tags: ['speed', 'limitations']
          }
        ],
        practiceQuestions: [
          {
            id: 'reg-q002',
            question: 'The maximum altitude a small unmanned aircraft may be operated is:',
            options: [
              '400 feet MSL',
              '400 feet AGL',
              '500 feet AGL',
              '1000 feet AGL'
            ],
            correctAnswer: 1,
            explanation: 'Part 107 limits sUAS operations to 400 feet above ground level (AGL).',
            difficulty: 'easy',
            tags: ['altitude', 'limitations']
          }
        ]
      }
    ]
  },
  {
    id: 'airspace',
    title: 'Airspace',
    description: 'Airspace classes, sectional charts, and restrictions',
    examPercentage: 20,
    color: 'bg-green-500',
    topics: [
      {
        id: 'airspace-classes',
        title: 'Airspace Classifications',
        content: `The National Airspace System is divided into six classes (A, B, C, D, E, and G) 
        with specific rules and requirements for drone operations in each class.`,
        keyPoints: [
          'Class A: 18,000 feet MSL and above - prohibited for sUAS',
          'Class B: Busy airports - requires ATC authorization',
          'Class C: Moderate traffic airports - requires ATC authorization',
          'Class D: Smaller airports - requires ATC authorization',
          'Class E: Controlled airspace - may require authorization',
          'Class G: Uncontrolled airspace - no authorization required'
        ],
        flashcards: [
          {
            id: 'air-001',
            front: 'Which airspace classes require ATC authorization for sUAS operations?',
            back: 'Class B, C, and D airspace always require ATC authorization',
            difficulty: 'medium',
            tags: ['authorization', 'airspace']
          },
          {
            id: 'air-002',
            front: 'What is Class G airspace?',
            back: 'Uncontrolled airspace where no ATC authorization is required for sUAS',
            difficulty: 'easy',
            tags: ['class-g', 'uncontrolled']
          }
        ],
        practiceQuestions: [
          {
            id: 'air-q001',
            question: 'Prior authorization from ATC is required for sUAS operations in:',
            options: [
              'Class G airspace only',
              'Class E airspace only',
              'Class B, C, and D airspace',
              'All controlled airspace'
            ],
            correctAnswer: 2,
            explanation: 'Part 107 requires ATC authorization for operations in Class B, C, and D airspace.',
            difficulty: 'medium',
            tags: ['authorization', 'controlled-airspace']
          }
        ]
      },
      {
        id: 'sectional-charts',
        title: 'Sectional Charts',
        content: `Sectional charts are the primary navigation tool for pilots, showing airspace boundaries, 
        airports, terrain, and other important aviation information.`,
        keyPoints: [
          'Scale: 1:500,000 (1 inch = 6.86 nautical miles)',
          'Updated every 6 months',
          'Shows airspace boundaries and restrictions',
          'Indicates airports and their types',
          'Displays terrain elevation and obstacles'
        ],
        flashcards: [
          {
            id: 'air-003',
            front: 'How often are sectional charts updated?',
            back: 'Every 6 months',
            difficulty: 'medium',
            tags: ['charts', 'updates']
          },
          {
            id: 'air-004',
            front: 'What is the scale of sectional aeronautical charts?',
            back: '1:500,000 (1 inch = 6.86 nautical miles)',
            difficulty: 'hard',
            tags: ['scale', 'charts']
          }
        ],
        practiceQuestions: [
          {
            id: 'air-q002',
            question: 'Sectional aeronautical charts are updated:',
            options: [
              'Every 28 days',
              'Every 56 days',
              'Every 6 months',
              'Annually'
            ],
            correctAnswer: 2,
            explanation: 'Sectional charts are revised and published every 6 months.',
            difficulty: 'medium',
            tags: ['charts', 'currency']
          }
        ]
      }
    ]
  },
  {
    id: 'weather',
    title: 'Weather',
    description: 'METARs, TAFs, weather hazards, and flight planning',
    examPercentage: 15,
    color: 'bg-yellow-500',
    topics: [
      {
        id: 'metar-taf',
        title: 'METAR and TAF Reports',
        content: `METAR (Meteorological Aerodrome Report) provides current weather conditions, 
        while TAF (Terminal Aerodrome Forecast) provides weather forecasts for airports.`,
        keyPoints: [
          'METAR: Current observed weather conditions',
          'TAF: Weather forecast for airports',
          'Issued every hour or when conditions change significantly',
          'Contains wind, visibility, precipitation, clouds, temperature',
          'Uses international aviation weather codes'
        ],
        flashcards: [
          {
            id: 'wx-001',
            front: 'What does METAR stand for?',
            back: 'Meteorological Aerodrome Report - current weather conditions',
            difficulty: 'easy',
            tags: ['metar', 'weather-reports']
          },
          {
            id: 'wx-002',
            front: 'What does TAF stand for?',
            back: 'Terminal Aerodrome Forecast - weather forecast for airports',
            difficulty: 'easy',
            tags: ['taf', 'weather-forecast']
          },
          {
            id: 'wx-003',
            front: 'How often are METARs typically issued?',
            back: 'Every hour or when weather conditions change significantly',
            difficulty: 'medium',
            tags: ['metar', 'frequency']
          }
        ],
        practiceQuestions: [
          {
            id: 'wx-q001',
            question: 'METAR reports are issued:',
            options: [
              'Every 30 minutes',
              'Every hour or when conditions change significantly',
              'Every 3 hours',
              'Once daily'
            ],
            correctAnswer: 1,
            explanation: 'METARs are issued every hour at most airports, with special reports when conditions change significantly.',
            difficulty: 'easy',
            tags: ['metar', 'frequency']
          }
        ]
      },
      {
        id: 'weather-hazards',
        title: 'Weather Hazards',
        content: `Understanding weather hazards is critical for safe sUAS operations. 
        Key hazards include thunderstorms, icing, turbulence, and low visibility.`,
        keyPoints: [
          'Thunderstorms: Avoid by at least 20 nautical miles',
          'Icing conditions: Dangerous for small aircraft',
          'Turbulence: Can cause loss of control',
          'Low visibility: Below 3 statute miles requires special care',
          'High winds: Can exceed aircraft capabilities'
        ],
        flashcards: [
          {
            id: 'wx-004',
            front: 'What is the minimum distance to stay away from thunderstorms?',
            back: 'At least 20 nautical miles',
            difficulty: 'medium',
            tags: ['thunderstorms', 'safety']
          },
          {
            id: 'wx-005',
            front: 'What visibility is considered low for sUAS operations?',
            back: 'Less than 3 statute miles',
            difficulty: 'medium',
            tags: ['visibility', 'minimums']
          }
        ],
        practiceQuestions: [
          {
            id: 'wx-q002',
            question: 'To avoid the hazards of thunderstorms, sUAS operations should remain:',
            options: [
              'At least 5 miles away',
              'At least 10 miles away',
              'At least 20 miles away',
              'At least 50 miles away'
            ],
            correctAnswer: 2,
            explanation: 'To avoid thunderstorm hazards including turbulence and hail, maintain at least 20 nautical miles distance.',
            difficulty: 'medium',
            tags: ['thunderstorms', 'distance']
          }
        ]
      }
    ]
  },
  {
    id: 'performance',
    title: 'Loading & Performance',
    description: 'Weight limits, aerodynamics, and center of gravity',
    examPercentage: 10,
    color: 'bg-purple-500',
    topics: [
      {
        id: 'weight-balance',
        title: 'Weight and Balance',
        content: `Understanding aircraft weight and balance is crucial for safe operations. 
        Center of gravity must remain within acceptable limits.`,
        keyPoints: [
          'Maximum gross takeoff weight must not be exceeded',
          'Center of gravity affects stability and control',
          'Load distribution affects flight characteristics',
          'Battery placement affects balance',
          'Payload affects performance and endurance'
        ],
        flashcards: [
          {
            id: 'perf-001',
            front: 'What happens if the center of gravity is too far forward?',
            back: 'The aircraft becomes nose-heavy and may be difficult to control',
            difficulty: 'medium',
            tags: ['cg', 'stability']
          },
          {
            id: 'perf-002',
            front: 'What is the effect of exceeding maximum gross weight?',
            back: 'Reduced performance, shorter endurance, and potential control issues',
            difficulty: 'medium',
            tags: ['weight', 'performance']
          }
        ],
        practiceQuestions: [
          {
            id: 'perf-q001',
            question: 'If the center of gravity is too far aft, the aircraft will:',
            options: [
              'Be nose heavy',
              'Be tail heavy and potentially unstable',
              'Have improved performance',
              'Have no effect on flight characteristics'
            ],
            correctAnswer: 1,
            explanation: 'An aft center of gravity makes the aircraft tail heavy and can lead to instability and difficulty controlling pitch.',
            difficulty: 'medium',
            tags: ['cg', 'stability']
          }
        ]
      },
      {
        id: 'aerodynamics',
        title: 'Basic Aerodynamics',
        content: `Understanding basic aerodynamic principles helps pilots understand aircraft behavior 
        and performance limitations.`,
        keyPoints: [
          'Four forces: Lift, Weight, Thrust, Drag',
          'Angle of attack affects lift production',
          'Stall occurs when airflow separates from wing',
          'Density altitude affects performance',
          'Wind affects ground track and speed'
        ],
        flashcards: [
          {
            id: 'perf-003',
            front: 'What are the four forces acting on an aircraft?',
            back: 'Lift, Weight (Gravity), Thrust, and Drag',
            difficulty: 'easy',
            tags: ['forces', 'aerodynamics']
          },
          {
            id: 'perf-004',
            front: 'What happens when an aircraft stalls?',
            back: 'Airflow separates from the wing surface, causing a sudden loss of lift',
            difficulty: 'medium',
            tags: ['stall', 'airflow']
          }
        ],
        practiceQuestions: [
          {
            id: 'perf-q002',
            question: 'The four forces acting on an aircraft in flight are:',
            options: [
              'Lift, Weight, Power, Friction',
              'Lift, Weight, Thrust, Drag',
              'Thrust, Drag, Speed, Altitude',
              'Power, Weight, Lift, Resistance'
            ],
            correctAnswer: 1,
            explanation: 'The four fundamental forces are Lift (upward), Weight or Gravity (downward), Thrust (forward), and Drag (rearward).',
            difficulty: 'easy',
            tags: ['forces', 'fundamentals']
          }
        ]
      }
    ]
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'Preflight procedures, emergency protocols, and safety management',
    examPercentage: 35,
    color: 'bg-red-500',
    topics: [
      {
        id: 'preflight',
        title: 'Preflight Procedures',
        content: `Proper preflight procedures are essential for safe operations. 
        This includes aircraft inspection, weather briefing, and mission planning.`,
        keyPoints: [
          'Visual inspection of aircraft structure',
          'Check control surfaces and propellers',
          'Verify battery charge and connections',
          'Test communication and control systems',
          'Review weather conditions and NOTAMs'
        ],
        flashcards: [
          {
            id: 'ops-001',
            front: 'What should be checked during a preflight inspection?',
            back: 'Aircraft structure, control surfaces, propellers, battery, and control systems',
            difficulty: 'easy',
            tags: ['preflight', 'inspection']
          },
          {
            id: 'ops-002',
            front: 'What weather information should be reviewed before flight?',
            back: 'Current conditions, forecasts, winds, visibility, and any relevant NOTAMs',
            difficulty: 'medium',
            tags: ['weather', 'planning']
          }
        ],
        practiceQuestions: [
          {
            id: 'ops-q001',
            question: 'Prior to each flight, the remote pilot in command must:',
            options: [
              'File a flight plan',
              'Conduct a preflight inspection of the sUAS',
              'Contact ATC for clearance',
              'Check with the nearest flight service station'
            ],
            correctAnswer: 1,
            explanation: 'Part 107 requires the remote pilot in command to conduct a preflight inspection of the sUAS before each flight.',
            difficulty: 'easy',
            tags: ['preflight', 'requirements']
          }
        ]
      },
      {
        id: 'emergency-procedures',
        title: 'Emergency Procedures',
        content: `Understanding emergency procedures and how to respond to various failures 
        is critical for maintaining safety during sUAS operations.`,
        keyPoints: [
          'Lost link procedures and return-to-home',
          'Battery failure or low battery warnings',
          'Engine or propulsion system failure',
          'Control system malfunctions',
          'Emergency landing procedures'
        ],
        flashcards: [
          {
            id: 'ops-003',
            front: 'What should a pilot do if the sUAS experiences a lost link situation?',
            back: 'Follow predetermined lost link procedures, typically including automatic return-to-home',
            difficulty: 'medium',
            tags: ['lost-link', 'emergency']
          },
          {
            id: 'ops-004',
            front: 'What is the first priority during any emergency?',
            back: 'Maintain aircraft control and ensure the safety of people and property on the ground',
            difficulty: 'easy',
            tags: ['emergency', 'priorities']
          }
        ],
        practiceQuestions: [
          {
            id: 'ops-q002',
            question: 'If a small unmanned aircraft experiences a lost link, the remote pilot should:',
            options: [
              'Continue the planned mission',
              'Immediately land the aircraft',
              'Follow the predetermined lost link procedure',
              'Contact ATC for assistance'
            ],
            correctAnswer: 2,
            explanation: 'The remote pilot should follow the predetermined lost link procedure established during preflight planning.',
            difficulty: 'medium',
            tags: ['lost-link', 'procedures']
          }
        ]
      },
      {
        id: 'crew-resource-management',
        title: 'Crew Resource Management',
        content: `Effective crew resource management (CRM) involves communication, decision-making, 
        and teamwork skills essential for safe operations.`,
        keyPoints: [
          'Clear communication between crew members',
          'Proper role assignment and responsibility',
          'Situational awareness and threat assessment',
          'Decision-making under pressure',
          'Workload management and task prioritization'
        ],
        flashcards: [
          {
            id: 'ops-005',
            front: 'What is the primary goal of Crew Resource Management?',
            back: 'To improve safety through better communication, decision-making, and teamwork',
            difficulty: 'medium',
            tags: ['crm', 'safety']
          },
          {
            id: 'ops-006',
            front: 'Who has the final authority for sUAS operations?',
            back: 'The remote pilot in command (RPIC) has final authority and responsibility',
            difficulty: 'easy',
            tags: ['authority', 'responsibility']
          }
        ],
        practiceQuestions: [
          {
            id: 'ops-q003',
            question: 'The final authority for the operation of a small unmanned aircraft rests with the:',
            options: [
              'Visual observer',
              'Person manipulating the controls',
              'Remote pilot in command',
              'Aircraft owner'
            ],
            correctAnswer: 2,
            explanation: 'The remote pilot in command (RPIC) has final authority and responsibility for the safe operation of the sUAS.',
            difficulty: 'easy',
            tags: ['authority', 'rpic']
          }
        ]
      }
    ]
  }
];

export const getAllFlashcards = (): Flashcard[] => {
  return studyModules.reduce((allCards: Flashcard[], module) => {
    const moduleCards = module.topics.reduce((topicCards: Flashcard[], topic) => {
      return [...topicCards, ...topic.flashcards];
    }, []);
    return [...allCards, ...moduleCards];
  }, []);
};

export const getAllQuestions = (): Question[] => {
  return studyModules.reduce((allQuestions: Question[], module) => {
    const moduleQuestions = module.topics.reduce((topicQuestions: Question[], topic) => {
      return [...topicQuestions, ...topic.practiceQuestions];
    }, []);
    return [...allQuestions, ...moduleQuestions];
  }, []);
};

export const getQuestionsByModule = (moduleId: string): Question[] => {
  const studyModule = studyModules.find(m => m.id === moduleId);
  if (!studyModule) return [];
  
  return studyModule.topics.reduce((questions: Question[], topic) => {
    return [...questions, ...topic.practiceQuestions];
  }, []);
};

export const getFlashcardsByModule = (moduleId: string): Flashcard[] => {
  const studyModule = studyModules.find(m => m.id === moduleId);
  if (!studyModule) return [];
  
  return studyModule.topics.reduce((cards: Flashcard[], topic) => {
    return [...cards, ...topic.flashcards];
  }, []);
};