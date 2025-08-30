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
          },
          {
            id: 'reg-004',
            front: 'What constitutes a commercial operation under Part 107?',
            back: 'Any operation conducted for compensation or hire, or to further a business purpose',
            difficulty: 'medium',
            tags: ['commercial', 'compensation']
          },
          {
            id: 'reg-005',
            front: 'Can a person with only a student pilot certificate operate a sUAS under Part 107?',
            back: 'No, they must have a Remote Pilot Certificate or operate under supervision',
            difficulty: 'medium',
            tags: ['student-pilot', 'certificate']
          },
          {
            id: 'reg-006',
            front: 'What is the TSA security threat assessment requirement?',
            back: 'Required for all Remote Pilot Certificate applicants as part of the certification process',
            difficulty: 'medium',
            tags: ['tsa', 'security']
          },
          {
            id: 'reg-007',
            front: 'What happens if a remote pilot certificate is revoked?',
            back: 'The person cannot act as a remote pilot and must surrender the certificate to FAA',
            difficulty: 'hard',
            tags: ['revocation', 'enforcement']
          },
          {
            id: 'reg-008',
            front: 'Who can request to see a remote pilot certificate?',
            back: 'FAA inspectors, law enforcement, and authorized representatives of TSA or NTSB',
            difficulty: 'medium',
            tags: ['certificate', 'authority']
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
          },
          {
            id: 'reg-q002',
            question: 'What is the minimum age to obtain a Remote Pilot Certificate?',
            options: ['14 years old', '16 years old', '18 years old', '21 years old'],
            correctAnswer: 1,
            explanation: 'Part 107 requires remote pilots to be at least 16 years old to obtain certification.',
            difficulty: 'easy',
            tags: ['age', 'certificate']
          },
          {
            id: 'reg-q003',
            question: 'How often must a remote pilot pass a recurrent knowledge test?',
            options: ['Every 12 months', 'Every 24 months', 'Every 36 months', 'Only once'],
            correctAnswer: 1,
            explanation: 'Remote pilots must pass a recurrent knowledge test every 24 calendar months to maintain their certificate.',
            difficulty: 'medium',
            tags: ['recurrent', 'knowledge-test']
          },
          {
            id: 'reg-q004',
            question: 'What is required to register a small unmanned aircraft?',
            options: [
              'Aircraft must weigh more than 0.55 pounds',
              'Aircraft must be used commercially',
              'Aircraft must have GPS capability',
              'Registration is not required for sUAS'
            ],
            correctAnswer: 0,
            explanation: 'Small unmanned aircraft weighing more than 0.55 pounds (250 grams) must be registered with the FAA.',
            difficulty: 'easy',
            tags: ['registration', 'weight']
          },
          {
            id: 'reg-q005',
            question: 'Remote pilot certificates are valid for:',
            options: ['1 year', '2 years', '3 years', '5 years'],
            correctAnswer: 1,
            explanation: 'Remote pilot certificates are valid for 2 years from the date of issuance.',
            difficulty: 'medium',
            tags: ['certificate', 'validity']
          },
          {
            id: 'reg-q006',
            question: 'A remote pilot certificate with sUAS rating expires:',
            options: [
              'On the last day of the 24th calendar month',
              'Exactly 2 years from issue date',
              'On the pilot\'s birthday in the 2nd year',
              'When recurrent training is due'
            ],
            correctAnswer: 0,
            explanation: 'Remote pilot certificates expire on the last day of the 24th calendar month after the month of issuance.',
            difficulty: 'hard',
            tags: ['certificate', 'expiration']
          },
          {
            id: 'reg-q012',
            question: 'Which of the following would constitute a commercial operation under Part 107?',
            options: [
              'Flying for personal enjoyment only',
              'Real estate photography for a listing agent',
              'Flying to test new equipment for personal use',
              'Educational demonstrations at schools for free'
            ],
            correctAnswer: 1,
            explanation: 'Real estate photography for compensation or to further business purposes is a commercial operation requiring Part 107 compliance.',
            difficulty: 'medium',
            tags: ['commercial', 'real-estate']
          },
          {
            id: 'reg-q013',
            question: 'A person with a student pilot certificate may operate a sUAS under Part 107:',
            options: [
              'Without any restrictions',
              'Only under direct supervision of a certified remote pilot',
              'Only during daylight hours',
              'Student pilots cannot operate under Part 107'
            ],
            correctAnswer: 3,
            explanation: 'Student pilot certificates do not authorize sUAS operations under Part 107. A Remote Pilot Certificate is required.',
            difficulty: 'medium',
            tags: ['student-pilot', 'restrictions']
          },
          {
            id: 'reg-q014',
            question: 'The TSA security threat assessment is required for:',
            options: [
              'Only pilots flying near airports',
              'All Remote Pilot Certificate applicants',
              'Only commercial operators',
              'Pilots operating aircraft over 25 pounds'
            ],
            correctAnswer: 1,
            explanation: 'All applicants for a Remote Pilot Certificate must undergo a TSA security threat assessment.',
            difficulty: 'easy',
            tags: ['tsa', 'requirements']
          },
          {
            id: 'reg-q015',
            question: 'If a remote pilot certificate is suspended or revoked, the person must:',
            options: [
              'Continue flying until the appeal process is complete',
              'Immediately stop all sUAS operations and surrender the certificate',
              'Only stop commercial operations',
              'Apply for a new certificate immediately'
            ],
            correctAnswer: 1,
            explanation: 'When a certificate is suspended or revoked, the person must immediately cease operations and surrender the certificate to FAA.',
            difficulty: 'hard',
            tags: ['suspension', 'revocation']
          },
          {
            id: 'reg-q016',
            question: 'Who has the authority to request inspection of a Remote Pilot Certificate?',
            options: [
              'Any airport personnel',
              'Local police officers only',
              'FAA inspectors and authorized law enforcement',
              'Only FAA headquarters staff'
            ],
            correctAnswer: 2,
            explanation: 'FAA inspectors, authorized law enforcement, and representatives of TSA or NTSB may request to see certificates.',
            difficulty: 'medium',
            tags: ['inspection', 'authority']
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
            id: 'reg-009',
            front: 'What is the maximum altitude for Part 107 operations?',
            back: '400 feet above ground level (AGL)',
            difficulty: 'easy',
            tags: ['altitude', 'limitations']
          },
          {
            id: 'reg-010',
            front: 'What is the maximum groundspeed for sUAS under Part 107?',
            back: '87 knots (100 mph)',
            difficulty: 'medium',
            tags: ['speed', 'limitations']
          },
          {
            id: 'reg-011',
            front: 'Can sUAS operations be conducted over people?',
            back: 'Generally no, unless operating under specific categories (Category 1-4) with proper equipment and procedures',
            difficulty: 'hard',
            tags: ['people', 'operations']
          },
          {
            id: 'reg-012',
            front: 'What is required for night operations under Part 107?',
            back: 'A waiver from the FAA and anti-collision lighting visible for 3 statute miles',
            difficulty: 'hard',
            tags: ['night', 'waiver']
          },
          {
            id: 'reg-013',
            front: 'What does VLOS stand for?',
            back: 'Visual Line of Sight - the ability to see the aircraft with your own eyes',
            difficulty: 'easy',
            tags: ['vlos', 'visual']
          },
          {
            id: 'reg-014',
            front: 'What is the minimum visibility required for Part 107 operations?',
            back: '3 statute miles from the control station',
            difficulty: 'medium',
            tags: ['visibility', 'weather']
          },
          {
            id: 'reg-015',
            front: 'Can operations be conducted from a moving vehicle?',
            back: 'Yes, but only over sparsely populated areas and not from aircraft',
            difficulty: 'hard',
            tags: ['moving-vehicle', 'operations']
          },
          {
            id: 'reg-016',
            front: 'What defines "civil twilight" for Part 107 operations?',
            back: 'The time period from 30 minutes before official sunrise to 30 minutes after official sunset',
            difficulty: 'medium',
            tags: ['twilight', 'time-limitations']
          }
        ],
        practiceQuestions: [
          {
            id: 'reg-q017',
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
          },
          {
            id: 'reg-q018',
            question: 'What is the maximum groundspeed allowed for sUAS operations?',
            options: ['87 knots', '100 mph', '120 mph', '150 knots'],
            correctAnswer: 0,
            explanation: 'The maximum groundspeed for sUAS operations is 87 knots (100 mph).',
            difficulty: 'medium',
            tags: ['speed', 'limitations']
          },
          {
            id: 'reg-q019',
            question: 'Operations over people are prohibited unless:',
            options: [
              'The aircraft weighs less than 0.55 pounds',
              'Operating under Categories 1-4 with proper procedures',
              'Flying at night with lighting',
              'Operating in Class G airspace only'
            ],
            correctAnswer: 1,
            explanation: 'Operations over people are allowed under specific categories (1-4) with appropriate aircraft certification and operational procedures.',
            difficulty: 'hard',
            tags: ['people', 'categories']
          },
          {
            id: 'reg-q020',
            question: 'Visual line of sight (VLOS) means:',
            options: [
              'Using binoculars or telescopes to see the aircraft',
              'Monitoring the aircraft through the control station display',
              'Seeing the aircraft with unaided vision',
              'Having a visual observer present'
            ],
            correctAnswer: 2,
            explanation: 'VLOS requires the remote pilot to see the aircraft with their own unaided vision (except for corrective lenses).',
            difficulty: 'medium',
            tags: ['vlos', 'visual']
          },
          {
            id: 'reg-q021',
            question: 'Night operations under Part 107:',
            options: [
              'Are prohibited without exception',
              'Require a waiver and anti-collision lighting',
              'Are allowed with any lighting',
              'Only require pilot certification'
            ],
            correctAnswer: 1,
            explanation: 'Night operations require an FAA waiver and anti-collision lighting visible for 3 statute miles.',
            difficulty: 'hard',
            tags: ['night', 'waiver', 'lighting']
          },
          {
            id: 'reg-q022',
            question: 'The maximum weight limit for small unmanned aircraft is:',
            options: ['25 pounds', '35 pounds', '55 pounds', '100 pounds'],
            correctAnswer: 2,
            explanation: 'Small unmanned aircraft must weigh less than 55 pounds including payload.',
            difficulty: 'easy',
            tags: ['weight', 'aircraft']
          },
          {
            id: 'reg-q023',
            question: 'The minimum flight visibility for sUAS operations is:',
            options: ['1 statute mile', '3 statute miles', '5 statute miles', '10 statute miles'],
            correctAnswer: 1,
            explanation: 'Part 107 requires minimum flight visibility of 3 statute miles from the control station.',
            difficulty: 'medium',
            tags: ['visibility', 'weather-minimums']
          },
          {
            id: 'reg-q024',
            question: 'Operations from a moving vehicle or aircraft:',
            options: [
              'Are always prohibited',
              'Are allowed only from aircraft',
              'Are prohibited from aircraft but allowed from vehicles over sparsely populated areas',
              'Are allowed without restrictions'
            ],
            correctAnswer: 2,
            explanation: 'Operations from moving vehicles are allowed over sparsely populated areas, but operations from aircraft are prohibited.',
            difficulty: 'hard',
            tags: ['moving-vehicle', 'aircraft']
          },
          {
            id: 'reg-q025',
            question: 'Civil twilight operations are defined as:',
            options: [
              '30 minutes before sunrise to 30 minutes after sunset',
              '1 hour before sunrise to 1 hour after sunset',
              'Sunrise to sunset only',
              'Any time with adequate lighting'
            ],
            correctAnswer: 0,
            explanation: 'Civil twilight for Part 107 is defined as 30 minutes before official sunrise to 30 minutes after official sunset.',
            difficulty: 'medium',
            tags: ['civil-twilight', 'time-restrictions']
          },
          {
            id: 'reg-q026',
            question: 'When operating near a structure taller than 400 feet AGL, a sUAS may:',
            options: [
              'Never exceed 400 feet AGL',
              'Fly up to 400 feet above the structure',
              'Fly at any altitude with ATC approval',
              'Only fly at ground level'
            ],
            correctAnswer: 1,
            explanation: 'sUAS may operate up to 400 feet above a structure if within 400 feet horizontally of that structure.',
            difficulty: 'hard',
            tags: ['structures', 'altitude-exception']
          }
        ]
      },
      {
        id: 'waivers-authorizations',
        title: 'Waivers and Authorizations',
        content: `The FAA provides processes for obtaining waivers from certain Part 107 restrictions 
        and authorizations for operations in controlled airspace.`,
        keyPoints: [
          'Waivers available for most Part 107 restrictions',
          'LAANC provides automated airspace authorization',
          'Manual authorization process for complex operations',
          'Operations over people require specific categories',
          'Night operations require anti-collision lighting'
        ],
        flashcards: [
          {
            id: 'reg-017',
            front: 'What is LAANC?',
            back: 'Low Altitude Authorization and Notification Capability - automated airspace authorization system',
            difficulty: 'medium',
            tags: ['laanc', 'authorization']
          },
          {
            id: 'reg-018',
            front: 'Which Part 107 restrictions cannot be waived?',
            back: 'Operations over people without proper categorization and remote pilot certificate requirements',
            difficulty: 'hard',
            tags: ['waivers', 'restrictions']
          },
          {
            id: 'reg-019',
            front: 'What are the four categories for operations over people?',
            back: 'Category 1, 2, 3, and 4 - each with specific aircraft and operational requirements',
            difficulty: 'hard',
            tags: ['categories', 'people']
          },
          {
            id: 'reg-020',
            front: 'How long is a Part 107 waiver typically valid?',
            back: 'Up to 4 years, but many are issued for 2 years',
            difficulty: 'medium',
            tags: ['waiver', 'validity']
          }
        ],
        practiceQuestions: [
          {
            id: 'reg-q027',
            question: 'LAANC provides:',
            options: [
              'Weather information for drone operations',
              'Automated processing of airspace authorizations',
              'Flight training for remote pilots',
              'Aircraft registration services'
            ],
            correctAnswer: 1,
            explanation: 'LAANC (Low Altitude Authorization and Notification Capability) provides automated processing of airspace authorizations.',
            difficulty: 'medium',
            tags: ['laanc', 'airspace']
          },
          {
            id: 'reg-q028',
            question: 'Which of the following Part 107 restrictions CANNOT be waived?',
            options: [
              'Visual line of sight requirement',
              'Operations at night',
              'Remote pilot certificate requirement',
              'Maximum altitude of 400 feet AGL'
            ],
            correctAnswer: 2,
            explanation: 'The requirement for a Remote Pilot Certificate cannot be waived under Part 107.',
            difficulty: 'hard',
            tags: ['waivers', 'certificate']
          },
          {
            id: 'reg-q029',
            question: 'Category 1 operations over people allow:',
            options: [
              'Any aircraft over any number of people',
              'Aircraft weighing 0.55 pounds or less over people',
              'Any aircraft with special equipment over people',
              'Only commercial aircraft over people'
            ],
            correctAnswer: 1,
            explanation: 'Category 1 allows aircraft weighing 0.55 pounds (250 grams) or less to operate over people.',
            difficulty: 'hard',
            tags: ['category-1', 'weight']
          },
          {
            id: 'reg-q030',
            question: 'A Part 107 waiver is typically valid for:',
            options: [
              '6 months',
              '1 year',
              '2-4 years',
              'Indefinitely'
            ],
            correctAnswer: 2,
            explanation: 'Part 107 waivers are typically valid for 2-4 years, depending on the specific waiver.',
            difficulty: 'medium',
            tags: ['waiver', 'duration']
          }
        ]
      },
      {
        id: 'registration-marking',
        title: 'Registration and Marking Requirements',
        content: `All sUAS used for commercial purposes must be properly registered and marked 
        according to FAA requirements.`,
        keyPoints: [
          'Registration required for aircraft over 0.55 pounds',
          'Registration number must be displayed on aircraft',
          'Registration valid for 3 years',
          'Owner must be US citizen or permanent resident',
          'Registration can be done online'
        ],
        flashcards: [
          {
            id: 'reg-021',
            front: 'How long is aircraft registration valid?',
            back: '3 years from the date of issuance',
            difficulty: 'medium',
            tags: ['registration', 'validity']
          },
          {
            id: 'reg-022',
            front: 'Where must the registration number be displayed?',
            back: 'In a readily accessible location inside the aircraft or on an external surface',
            difficulty: 'medium',
            tags: ['marking', 'registration']
          },
          {
            id: 'reg-023',
            front: 'Who can register a sUAS in the United States?',
            back: 'U.S. citizens, permanent residents, or corporations with U.S. citizenship',
            difficulty: 'medium',
            tags: ['eligibility', 'citizenship']
          },
          {
            id: 'reg-024',
            front: 'What is the registration fee for sUAS?',
            back: '$5 per aircraft for recreational use, commercial rates may vary',
            difficulty: 'easy',
            tags: ['fees', 'registration']
          }
        ],
        practiceQuestions: [
          {
            id: 'reg-q031',
            question: 'Aircraft registration is valid for:',
            options: [
              '1 year',
              '2 years', 
              '3 years',
              '5 years'
            ],
            correctAnswer: 2,
            explanation: 'FAA aircraft registration is valid for 3 years from the date of issuance.',
            difficulty: 'medium',
            tags: ['registration', 'expiration']
          },
          {
            id: 'reg-q032',
            question: 'The registration marking must be placed:',
            options: [
              'Only on the outside of the aircraft',
              'Only inside a battery compartment',
              'In a readily accessible location inside or on external surface',
              'On the remote control device'
            ],
            correctAnswer: 2,
            explanation: 'The registration marking must be in a readily accessible location either inside the aircraft or on an external surface.',
            difficulty: 'medium',
            tags: ['marking', 'location']
          },
          {
            id: 'reg-q033',
            question: 'To register a sUAS in the United States, the owner must:',
            options: [
              'Be at least 16 years old',
              'Be a U.S. citizen or permanent resident',
              'Have a pilot certificate',
              'Live in the United States'
            ],
            correctAnswer: 1,
            explanation: 'Aircraft registration requires the owner to be a U.S. citizen, permanent resident, or qualifying corporation.',
            difficulty: 'medium',
            tags: ['citizenship', 'requirements']
          },
          {
            id: 'reg-q034',
            question: 'If an aircraft weighs exactly 0.55 pounds (250 grams):',
            options: [
              'Registration is required',
              'Registration is not required',
              'Registration is optional',
              'Only commercial operators must register'
            ],
            correctAnswer: 1,
            explanation: 'Aircraft weighing 0.55 pounds (250 grams) or less are not required to be registered.',
            difficulty: 'medium',
            tags: ['weight-threshold', 'registration']
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
          },
          {
            id: 'air-003',
            front: 'What color represents Class B airspace on sectional charts?',
            back: 'Blue solid lines with blue shaded areas',
            difficulty: 'medium',
            tags: ['class-b', 'charts', 'colors']
          },
          {
            id: 'air-004',
            front: 'What is the shape of Class D airspace?',
            back: 'Cylindrical from the surface up to a designated altitude, typically 2,500 feet AGL',
            difficulty: 'medium',
            tags: ['class-d', 'shape']
          },
          {
            id: 'air-005',
            front: 'What does a magenta dashed line represent on a sectional chart?',
            back: 'Class E airspace beginning at 700 feet AGL',
            difficulty: 'hard',
            tags: ['class-e', 'charts', 'magenta']
          },
          {
            id: 'air-006',
            front: 'Are sUAS operations allowed in Class A airspace?',
            back: 'No, Class A airspace (18,000 feet MSL and above) is prohibited for sUAS',
            difficulty: 'easy',
            tags: ['class-a', 'prohibited']
          },
          {
            id: 'air-007',
            front: 'What is a NOTAM?',
            back: 'Notice to Airmen - provides timely information about airports and airspace',
            difficulty: 'easy',
            tags: ['notam', 'information']
          },
          {
            id: 'air-008',
            front: 'How do you obtain airspace authorization for sUAS?',
            back: 'Through LAANC (Low Altitude Authorization and Notification Capability) or by requesting a waiver',
            difficulty: 'medium',
            tags: ['laanc', 'authorization']
          },
          {
            id: 'air-009',
            front: 'What color represents Class C airspace on sectional charts?',
            back: 'Magenta solid lines',
            difficulty: 'medium',
            tags: ['class-c', 'charts', 'colors']
          },
          {
            id: 'air-010',
            front: 'What altitude does Class A airspace begin?',
            back: '18,000 feet MSL (Flight Level 180)',
            difficulty: 'medium',
            tags: ['class-a', 'altitude']
          },
          {
            id: 'air-011',
            front: 'What does a blue vignette on a sectional chart represent?',
            back: 'Class E airspace beginning at 1,200 feet AGL',
            difficulty: 'hard',
            tags: ['class-e', 'vignette']
          },
          {
            id: 'air-012',
            front: 'What is the typical diameter of Class D airspace?',
            back: '8.7 nautical miles (5 statute miles) radius',
            difficulty: 'hard',
            tags: ['class-d', 'dimensions']
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
          },
          {
            id: 'air-q002',
            question: 'Class B airspace is represented on sectional charts by:',
            options: [
              'Magenta solid lines',
              'Blue solid lines',
              'Red dashed lines',
              'Green circles'
            ],
            correctAnswer: 1,
            explanation: 'Class B airspace is depicted with blue solid lines and blue shaded areas.',
            difficulty: 'medium',
            tags: ['class-b', 'charts']
          },
          {
            id: 'air-q003',
            question: 'What does LAANC stand for?',
            options: [
              'Low Altitude Aircraft Navigation Center',
              'Low Altitude Authorization and Notification Capability',
              'Local Airport Air Navigation Control',
              'Low Altitude Airspace Notification Center'
            ],
            correctAnswer: 1,
            explanation: 'LAANC provides automated processing of airspace authorizations for sUAS operations.',
            difficulty: 'medium',
            tags: ['laanc', 'authorization']
          },
          {
            id: 'air-q004',
            question: 'Class G airspace extends from the surface up to:',
            options: [
              'Always 1,200 feet AGL',
              'Always 700 feet AGL', 
              'Either 700 or 1,200 feet AGL depending on location',
              '400 feet AGL'
            ],
            correctAnswer: 2,
            explanation: 'Class G airspace extends from the surface up to 700 feet AGL in most areas, or 1,200 feet AGL in some areas.',
            difficulty: 'hard',
            tags: ['class-g', 'altitudes']
          },
          {
            id: 'air-q005',
            question: 'Which airspace requires two-way radio communication for manned aircraft?',
            options: [
              'Class G only',
              'Class E only',
              'Class B, C, and D',
              'All controlled airspace'
            ],
            correctAnswer: 2,
            explanation: 'Class B, C, and D airspace require two-way radio communication for manned aircraft operations.',
            difficulty: 'medium',
            tags: ['communication', 'controlled-airspace']
          },
          {
            id: 'air-q006',
            question: 'Special Use Airspace includes:',
            options: [
              'Only military operations areas',
              'Prohibited, restricted, warning, and alert areas',
              'Only Class B and C airspace',
              'International airspace only'
            ],
            correctAnswer: 1,
            explanation: 'Special Use Airspace includes prohibited areas, restricted areas, warning areas, military operations areas, and alert areas.',
            difficulty: 'medium',
            tags: ['special-use', 'airspace']
          },
          {
            id: 'air-q035',
            question: 'Class C airspace is depicted on sectional charts with:',
            options: [
              'Blue solid lines',
              'Magenta solid lines',
              'Dashed blue lines',
              'Green solid lines'
            ],
            correctAnswer: 1,
            explanation: 'Class C airspace is shown with magenta solid lines on sectional charts.',
            difficulty: 'medium',
            tags: ['class-c', 'chart-symbols']
          },
          {
            id: 'air-q036',
            question: 'Class A airspace begins at:',
            options: [
              '10,000 feet MSL',
              '12,500 feet MSL',
              '18,000 feet MSL',
              '20,000 feet MSL'
            ],
            correctAnswer: 2,
            explanation: 'Class A airspace begins at 18,000 feet MSL (FL180) and extends upward.',
            difficulty: 'medium',
            tags: ['class-a', 'floor']
          },
          {
            id: 'air-q037',
            question: 'A blue vignette (shaded area) on a sectional chart indicates:',
            options: [
              'Class B airspace',
              'Class C airspace',
              'Class E airspace beginning at 1,200 feet AGL',
              'Prohibited airspace'
            ],
            correctAnswer: 2,
            explanation: 'Blue vignettes indicate Class E controlled airspace beginning at 1,200 feet AGL.',
            difficulty: 'hard',
            tags: ['class-e', 'vignette']
          },
          {
            id: 'air-q038',
            question: 'The typical radius of Class D airspace is:',
            options: [
              '4 nautical miles',
              '5 nautical miles',
              '10 nautical miles',
              '20 nautical miles'
            ],
            correctAnswer: 1,
            explanation: 'Class D airspace typically has a radius of 5 nautical miles from the airport reference point.',
            difficulty: 'hard',
            tags: ['class-d', 'radius']
          },
          {
            id: 'air-q039',
            question: 'Magenta dashed lines on sectional charts represent:',
            options: [
              'Class C airspace boundaries',
              'Class E airspace beginning at 700 feet AGL',
              'Restricted areas',
              'Military training routes'
            ],
            correctAnswer: 1,
            explanation: 'Magenta dashed lines indicate Class E controlled airspace beginning at 700 feet AGL.',
            difficulty: 'hard',
            tags: ['class-e', 'dashed-lines']
          },
          {
            id: 'air-q040',
            question: 'In which airspace can sUAS operate without prior authorization?',
            options: [
              'Class B only',
              'Class G only',
              'Class E above 400 feet AGL',
              'Any airspace below 400 feet AGL'
            ],
            correctAnswer: 1,
            explanation: 'Class G (uncontrolled) airspace does not require prior authorization for sUAS operations.',
            difficulty: 'medium',
            tags: ['class-g', 'authorization']
          }
        ]
      },
      {
        id: 'sectional-charts',
        title: 'Sectional Charts and Symbols',
        content: `Sectional charts are the primary navigation tool for pilots, showing airspace boundaries, 
        airports, terrain, and other important aviation information using standardized symbols and colors.`,
        keyPoints: [
          'Scale: 1:500,000 (1 inch = 6.86 nautical miles)',
          'Updated every 6 months',
          'Shows airspace boundaries and restrictions',
          'Indicates airports and their types',
          'Displays terrain elevation and obstacles'
        ],
        flashcards: [
          {
            id: 'air-013',
            front: 'How often are sectional charts updated?',
            back: 'Every 6 months',
            difficulty: 'medium',
            tags: ['charts', 'updates']
          },
          {
            id: 'air-014',
            front: 'What is the scale of sectional aeronautical charts?',
            back: '1:500,000 (1 inch = 6.86 nautical miles)',
            difficulty: 'hard',
            tags: ['scale', 'charts']
          },
          {
            id: 'air-015',
            front: 'What does a magenta circle with "R" indicate on a sectional chart?',
            back: 'Restricted area with specific operating restrictions',
            difficulty: 'medium',
            tags: ['restricted-area', 'symbols']
          },
          {
            id: 'air-016',
            front: 'What do the numbers in sectional chart airspace depictions represent?',
            back: 'The floor and ceiling altitudes of that airspace in hundreds of feet',
            difficulty: 'medium',
            tags: ['altitudes', 'chart-reading']
          },
          {
            id: 'air-017',
            front: 'What does a red "P" on a sectional chart indicate?',
            back: 'Prohibited area where aircraft operations are forbidden',
            difficulty: 'easy',
            tags: ['prohibited-area', 'symbols']
          },
          {
            id: 'air-018',
            front: 'How are airports depicted on sectional charts?',
            back: 'Different symbols based on type: public (magenta or blue), private (R), military (anchor)',
            difficulty: 'medium',
            tags: ['airports', 'symbols']
          }
        ],
        practiceQuestions: [
          {
            id: 'air-q041',
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
          },
          {
            id: 'air-q042',
            question: 'The scale of sectional aeronautical charts is:',
            options: [
              '1:250,000',
              '1:500,000',
              '1:1,000,000',
              '1:2,000,000'
            ],
            correctAnswer: 1,
            explanation: 'Sectional charts use a scale of 1:500,000, where 1 inch equals approximately 6.86 nautical miles.',
            difficulty: 'hard',
            tags: ['scale', 'charts']
          },
          {
            id: 'air-q043',
            question: 'A magenta "R" with numbers on a sectional chart indicates:',
            options: [
              'A runway designation',
              'A restricted area with operating times and altitudes',
              'Radio frequency information',
              'Route designation'
            ],
            correctAnswer: 1,
            explanation: 'Restricted areas are shown with magenta "R" followed by numbers indicating the restriction area and altitudes affected.',
            difficulty: 'medium',
            tags: ['restricted-areas', 'chart-symbols']
          },
          {
            id: 'air-q044',
            question: 'On sectional charts, prohibited areas are marked with:',
            options: [
              'Blue "P"',
              'Red "P"',
              'Magenta "P"',
              'Green "P"'
            ],
            correctAnswer: 1,
            explanation: 'Prohibited areas are depicted with a red "P" followed by identification numbers.',
            difficulty: 'easy',
            tags: ['prohibited-areas', 'symbols']
          },
          {
            id: 'air-q045',
            question: 'Airport symbols on sectional charts vary by:',
            options: [
              'Size of the runway only',
              'Type of ownership and services available',
              'Geographic location only',
              'Weather conditions'
            ],
            correctAnswer: 1,
            explanation: 'Airport symbols indicate ownership type (public/private) and available services through different colors and markings.',
            difficulty: 'medium',
            tags: ['airports', 'chart-symbols']
          },
          {
            id: 'air-q046',
            question: 'Elevation numbers on sectional charts inside airspace areas represent:',
            options: [
              'Ground elevation only',
              'Maximum altitude for that area',
              'Floor and ceiling altitudes in hundreds of feet',
              'Radio frequencies'
            ],
            correctAnswer: 2,
            explanation: 'Numbers in airspace areas show the floor and ceiling altitudes, typically expressed in hundreds of feet MSL.',
            difficulty: 'medium',
            tags: ['altitudes', 'airspace-depiction']
          }
        ]
      },
      {
        id: 'special-use-airspace',
        title: 'Special Use Airspace',
        content: `Special Use Airspace consists of areas where activities must be confined because of their nature 
        or where limitations may be imposed on aircraft operations that are not a part of normal operations.`,
        keyPoints: [
          'Prohibited Areas (P) - Flight prohibited at all times',
          'Restricted Areas (R) - May have operating hours and altitude restrictions',
          'Warning Areas (W) - Hazardous activities, generally over water',
          'Military Operations Areas (MOA) - Military training activities',
          'Alert Areas (A) - High volume of pilot training or unusual aerial activity'
        ],
        flashcards: [
          {
            id: 'air-019',
            front: 'What is a Prohibited Area?',
            back: 'Airspace where aircraft flight is prohibited at all times for security or safety reasons',
            difficulty: 'easy',
            tags: ['prohibited', 'special-use']
          },
          {
            id: 'air-020',
            front: 'What is the difference between Restricted and Warning areas?',
            back: 'Restricted areas are over land with specific restrictions; Warning areas are generally over water',
            difficulty: 'medium',
            tags: ['restricted', 'warning']
          },
          {
            id: 'air-021',
            front: 'What does MOA stand for?',
            back: 'Military Operations Area - airspace used for military training activities',
            difficulty: 'medium',
            tags: ['moa', 'military']
          },
          {
            id: 'air-022',
            front: 'Can sUAS operate in Alert Areas?',
            back: 'Yes, but pilots should exercise extreme caution due to high volume of training or unusual activity',
            difficulty: 'medium',
            tags: ['alert-area', 'operations']
          }
        ],
        practiceQuestions: [
          {
            id: 'air-q047',
            question: 'Flight through a Prohibited Area is:',
            options: [
              'Allowed with prior coordination',
              'Prohibited at all times',
              'Allowed only during certain hours',
              'Allowed for sUAS but not manned aircraft'
            ],
            correctAnswer: 1,
            explanation: 'Prohibited Areas prohibit all aircraft operations at all times for security or other reasons.',
            difficulty: 'easy',
            tags: ['prohibited-area', 'restrictions']
          },
          {
            id: 'air-q048',
            question: 'Restricted Areas may:',
            options: [
              'Never be entered by any aircraft',
              'Have specific operating hours and altitude restrictions',
              'Only restrict military aircraft',
              'Only apply to aircraft over 55 pounds'
            ],
            correctAnswer: 1,
            explanation: 'Restricted Areas may have specific times of use and altitude restrictions that vary by area.',
            difficulty: 'medium',
            tags: ['restricted-area', 'operating-times']
          },
          {
            id: 'air-q049',
            question: 'Warning Areas are typically located:',
            options: [
              'Over populated areas',
              'Near military bases only',
              'Over water beyond 3 nautical miles from shore',
              'Only in mountainous terrain'
            ],
            correctAnswer: 2,
            explanation: 'Warning Areas are generally established over water beyond 3 nautical miles from the U.S. coast.',
            difficulty: 'medium',
            tags: ['warning-area', 'location']
          },
          {
            id: 'air-q050',
            question: 'Military Operations Areas (MOAs) are used for:',
            options: [
              'Civilian flight training only',
              'Military training activities',
              'Commercial airline routes',
              'Emergency landing areas'
            ],
            correctAnswer: 1,
            explanation: 'MOAs are designated for military training activities that could be hazardous to nonparticipating aircraft.',
            difficulty: 'easy',
            tags: ['moa', 'purpose']
          },
          {
            id: 'air-q051',
            question: 'Alert Areas inform pilots of:',
            options: [
              'Prohibited flight operations',
              'Required radio communications',
              'High volume of pilot training or unusual aerial activity',
              'Mandatory altitude restrictions'
            ],
            correctAnswer: 2,
            explanation: 'Alert Areas notify pilots of areas with a high volume of pilot training or unusual types of aerial activity.',
            difficulty: 'medium',
            tags: ['alert-area', 'information']
          }
        ]
      },
      {
        id: 'notams-tfrs',
        title: 'NOTAMs and Temporary Flight Restrictions',
        content: `NOTAMs provide timely information about the national airspace system, while TFRs establish 
        temporary restrictions on aircraft operations in specific areas.`,
        keyPoints: [
          'NOTAMs provide time-critical aeronautical information',
          'TFRs restrict aircraft operations in specific areas and times',
          'Presidential TFRs have strict enforcement',
          'Disaster area TFRs protect emergency operations',
          'Sports event TFRs cover major sporting events'
        ],
        flashcards: [
          {
            id: 'air-023',
            front: 'What does NOTAM stand for?',
            back: 'Notice to Airmen - time-critical aeronautical information',
            difficulty: 'easy',
            tags: ['notam', 'definition']
          },
          {
            id: 'air-024',
            front: 'What does TFR stand for?',
            back: 'Temporary Flight Restriction - temporary prohibition or restriction of aircraft operations',
            difficulty: 'easy',
            tags: ['tfr', 'definition']
          },
          {
            id: 'air-025',
            front: 'How far do Presidential TFRs typically extend?',
            back: 'Usually 10 or 30 nautical mile radius with different restriction levels',
            difficulty: 'medium',
            tags: ['presidential-tfr', 'dimensions']
          },
          {
            id: 'air-026',
            front: 'Where can pilots find current NOTAMs and TFRs?',
            back: 'FAA NOTAM system, ForeFlight, and other approved aviation weather sources',
            difficulty: 'medium',
            tags: ['notam-sources', 'planning']
          }
        ],
        practiceQuestions: [
          {
            id: 'air-q052',
            question: 'NOTAMs provide information about:',
            options: [
              'Only airport closures',
              'Weather conditions only',
              'Time-critical aeronautical information affecting flight safety',
              'Pilot certification requirements'
            ],
            correctAnswer: 2,
            explanation: 'NOTAMs provide time-critical information about the national airspace system that could affect flight safety.',
            difficulty: 'easy',
            tags: ['notam', 'purpose']
          },
          {
            id: 'air-q053',
            question: 'Temporary Flight Restrictions (TFRs):',
            options: [
              'Are permanent airspace restrictions',
              'Only apply to commercial aircraft',
              'Temporarily restrict aircraft operations in specific areas',
              'Are the same as NOTAMs'
            ],
            correctAnswer: 2,
            explanation: 'TFRs establish temporary restrictions on aircraft operations in specific areas for various reasons.',
            difficulty: 'easy',
            tags: ['tfr', 'restrictions']
          },
          {
            id: 'air-q054',
            question: 'Presidential TFRs typically:',
            options: [
              'Only restrict airliners',
              'Have multiple security rings with different restrictions',
              'Allow sUAS operations without restriction',
              'Only apply at night'
            ],
            correctAnswer: 1,
            explanation: 'Presidential TFRs typically have inner and outer rings with increasingly strict restrictions closer to the protected person.',
            difficulty: 'medium',
            tags: ['presidential-tfr', 'security']
          },
          {
            id: 'air-q055',
            question: 'Where should pilots check for current NOTAMs and TFRs?',
            options: [
              'Local newspaper weather section',
              'FAA NOTAM system and approved aviation sources',
              'Social media aviation groups',
              'Word of mouth from other pilots'
            ],
            correctAnswer: 1,
            explanation: 'Pilots must check official FAA NOTAM sources and approved aviation weather services for current information.',
            difficulty: 'easy',
            tags: ['notam-sources', 'official-sources']
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
          },
          {
            id: 'wx-004',
            front: 'What does "VRB" mean in a METAR wind report?',
            back: 'Variable wind direction (when winds are light and variable)',
            difficulty: 'medium',
            tags: ['metar', 'wind', 'codes']
          },
          {
            id: 'wx-005',
            front: 'What does "SPECI" indicate in a weather report?',
            back: 'A special weather report issued when conditions change significantly between regular observations',
            difficulty: 'medium',
            tags: ['speci', 'weather-reports']
          },
          {
            id: 'wx-006',
            front: 'How long is a TAF forecast typically valid?',
            back: '24 or 30 hours, depending on the airport',
            difficulty: 'medium',
            tags: ['taf', 'validity']
          },
          {
            id: 'wx-007',
            front: 'What does "CAVOK" mean in a METAR?',
            back: 'Ceiling And Visibility OK - visibility 10km or more, no clouds below 5000 feet, no significant weather',
            difficulty: 'hard',
            tags: ['cavok', 'metar']
          },
          {
            id: 'wx-008',
            front: 'What does the "Z" at the end of METAR time indicate?',
            back: 'Zulu time (UTC/GMT) - all aviation weather uses coordinated universal time',
            difficulty: 'medium',
            tags: ['zulu-time', 'utc']
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
          },
          {
            id: 'wx-q056',
            question: 'A TAF weather forecast is valid for:',
            options: [
              '6 hours',
              '12 hours',
              '24-30 hours',
              '48 hours'
            ],
            correctAnswer: 2,
            explanation: 'TAF forecasts are typically valid for 24 or 30 hours, depending on the airport.',
            difficulty: 'medium',
            tags: ['taf', 'validity-period']
          },
          {
            id: 'wx-q057',
            question: 'In a METAR, wind direction "VRB" indicates:',
            options: [
              'Very strong winds',
              'Variable wind direction',
              'Vertical wind component',
              'Visibility reduced by wind'
            ],
            correctAnswer: 1,
            explanation: 'VRB indicates variable wind direction, typically used when winds are light and direction varies.',
            difficulty: 'medium',
            tags: ['wind', 'variable']
          },
          {
            id: 'wx-q058',
            question: 'SPECI reports are issued when:',
            options: [
              'Every 30 minutes',
              'Weather conditions change significantly between regular observations',
              'Only during severe weather',
              'At pilot request only'
            ],
            correctAnswer: 1,
            explanation: 'SPECI (special) reports are issued when weather conditions change significantly between regular hourly observations.',
            difficulty: 'medium',
            tags: ['speci', 'special-reports']
          },
          {
            id: 'wx-q059',
            question: 'CAVOK in a METAR indicates:',
            options: [
              'Ceiling and visibility are below minimums',
              'Caution advised for aircraft operations',
              'Ceiling and visibility OK - excellent conditions',
              'Cloud cover is variable'
            ],
            correctAnswer: 2,
            explanation: 'CAVOK means Ceiling And Visibility OK, indicating visibility 10km or more and no significant clouds or weather.',
            difficulty: 'hard',
            tags: ['cavok', 'excellent-conditions']
          },
          {
            id: 'wx-q060',
            question: 'The "Z" suffix in METAR observation times indicates:',
            options: [
              'Local time zone',
              'Zero visibility',
              'Zulu (UTC) time',
              'Zone of precipitation'
            ],
            correctAnswer: 2,
            explanation: 'The "Z" indicates Zulu time (UTC), which is the standard time reference used in all aviation weather reports.',
            difficulty: 'medium',
            tags: ['zulu-time', 'time-standard']
          }
        ]
      },
      {
        id: 'weather-hazards',
        title: 'Weather Hazards and Phenomena',
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
            id: 'wx-009',
            front: 'What is the minimum distance to stay away from thunderstorms?',
            back: 'At least 20 nautical miles',
            difficulty: 'medium',
            tags: ['thunderstorms', 'safety']
          },
          {
            id: 'wx-010',
            front: 'What visibility is considered low for sUAS operations?',
            back: 'Less than 3 statute miles',
            difficulty: 'medium',
            tags: ['visibility', 'minimums']
          },
          {
            id: 'wx-011',
            front: 'What are the three stages of thunderstorm development?',
            back: 'Cumulus, mature, and dissipating stages',
            difficulty: 'medium',
            tags: ['thunderstorms', 'stages']
          },
          {
            id: 'wx-012',
            front: 'What is wind shear?',
            back: 'A sudden change in wind speed and/or direction over a short distance',
            difficulty: 'medium',
            tags: ['wind-shear', 'definition']
          },
          {
            id: 'wx-013',
            front: 'At what temperature does structural icing occur?',
            back: 'When visible moisture exists and temperature is at or below 0°C (32°F)',
            difficulty: 'medium',
            tags: ['icing', 'temperature']
          },
          {
            id: 'wx-014',
            front: 'What is a microburst?',
            back: 'A localized column of sinking air that spreads out in all directions when it hits the ground',
            difficulty: 'hard',
            tags: ['microburst', 'wind-phenomenon']
          },
          {
            id: 'wx-015',
            front: 'What weather conditions favor turbulence?',
            back: 'Strong wind shear, mountain waves, thermal activity, and frontal passages',
            difficulty: 'medium',
            tags: ['turbulence', 'conditions']
          },
          {
            id: 'wx-016',
            front: 'What is the difference between ceiling and visibility?',
            back: 'Ceiling is the height of the lowest broken or overcast cloud layer; visibility is horizontal distance you can see',
            difficulty: 'medium',
            tags: ['ceiling', 'visibility']
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
          },
          {
            id: 'wx-q061',
            question: 'The three stages of thunderstorm development are:',
            options: [
              'Formation, development, decay',
              'Cumulus, mature, dissipating',
              'Building, active, weakening',
              'Initial, peak, final'
            ],
            correctAnswer: 1,
            explanation: 'Thunderstorms progress through cumulus (building), mature (most dangerous), and dissipating stages.',
            difficulty: 'medium',
            tags: ['thunderstorm-stages', 'development']
          },
          {
            id: 'wx-q062',
            question: 'Wind shear is defined as:',
            options: [
              'Constant high wind speeds',
              'A sudden change in wind speed or direction',
              'Wind flowing parallel to the ground',
              'Circular wind patterns'
            ],
            correctAnswer: 1,
            explanation: 'Wind shear is a sudden change in wind speed and/or direction over a short distance, creating hazardous conditions.',
            difficulty: 'medium',
            tags: ['wind-shear', 'hazard']
          },
          {
            id: 'wx-q063',
            question: 'Structural icing occurs when:',
            options: [
              'Temperature is below -10°C regardless of moisture',
              'Visible moisture exists and temperature is at or below 0°C',
              'Only during winter months',
              'Aircraft speed exceeds certain limits'
            ],
            correctAnswer: 1,
            explanation: 'Structural icing requires both visible moisture (clouds, precipitation) and temperatures at or below freezing.',
            difficulty: 'medium',
            tags: ['icing-conditions', 'temperature']
          },
          {
            id: 'wx-q064',
            question: 'A microburst is characterized by:',
            options: [
              'Upward flowing air currents',
              'Horizontal wind flow only',
              'Localized downdrafts that spread outward upon hitting the ground',
              'Circular wind patterns'
            ],
            correctAnswer: 2,
            explanation: 'A microburst is a localized column of sinking air that creates dangerous diverging winds when it hits the ground.',
            difficulty: 'hard',
            tags: ['microburst', 'downdraft']
          },
          {
            id: 'wx-q065',
            question: 'Turbulence is most likely to occur:',
            options: [
              'In clear, calm conditions only',
              'Near strong wind shear, mountains, and thermal activity',
              'Only during thunderstorms',
              'Only at high altitudes'
            ],
            correctAnswer: 1,
            explanation: 'Turbulence commonly occurs with wind shear, mountain waves, thermal activity, and frontal passages.',
            difficulty: 'medium',
            tags: ['turbulence-causes', 'conditions']
          },
          {
            id: 'wx-q066',
            question: 'The difference between ceiling and visibility is:',
            options: [
              'There is no difference, they are the same',
              'Ceiling is horizontal distance, visibility is vertical',
              'Ceiling is height of lowest broken/overcast clouds, visibility is horizontal distance',
              'Ceiling applies only to airports, visibility applies everywhere'
            ],
            correctAnswer: 2,
            explanation: 'Ceiling refers to the vertical height of the lowest broken or overcast cloud layer, while visibility is the horizontal distance you can see.',
            difficulty: 'medium',
            tags: ['ceiling-vs-visibility', 'definitions']
          }
        ]
      },
      {
        id: 'weather-systems',
        title: 'Weather Systems and Fronts',
        content: `Understanding weather systems, fronts, and pressure systems helps pilots anticipate 
        weather changes and plan safe operations.`,
        keyPoints: [
          'High pressure systems bring stable weather',
          'Low pressure systems bring unstable weather',
          'Cold fronts move fast with steep slopes',
          'Warm fronts move slowly with gradual slopes',
          'Occluded fronts combine cold and warm fronts'
        ],
        flashcards: [
          {
            id: 'wx-017',
            front: 'What type of weather is associated with high pressure systems?',
            back: 'Generally stable weather with clear skies and light winds',
            difficulty: 'easy',
            tags: ['high-pressure', 'stable-weather']
          },
          {
            id: 'wx-018',
            front: 'What type of weather is associated with low pressure systems?',
            back: 'Unstable weather with clouds, precipitation, and stronger winds',
            difficulty: 'easy',
            tags: ['low-pressure', 'unstable-weather']
          },
          {
            id: 'wx-019',
            front: 'How do cold fronts differ from warm fronts in movement?',
            back: 'Cold fronts move faster with steep slopes; warm fronts move slower with gradual slopes',
            difficulty: 'medium',
            tags: ['fronts', 'movement']
          },
          {
            id: 'wx-020',
            front: 'What is an occluded front?',
            back: 'When a cold front overtakes a warm front, lifting the warm air completely off the ground',
            difficulty: 'hard',
            tags: ['occluded-front', 'definition']
          },
          {
            id: 'wx-021',
            front: 'In the Northern Hemisphere, winds around a low pressure system circulate:',
            back: 'Counterclockwise and inward toward the center',
            difficulty: 'medium',
            tags: ['low-pressure', 'circulation']
          },
          {
            id: 'wx-022',
            front: 'What is a trough in weather terms?',
            back: 'An elongated area of low pressure, often associated with unsettled weather',
            difficulty: 'medium',
            tags: ['trough', 'low-pressure']
          }
        ],
        practiceQuestions: [
          {
            id: 'wx-q067',
            question: 'High pressure weather systems are characterized by:',
            options: [
              'Unstable conditions with heavy precipitation',
              'Generally stable weather with clear skies',
              'Strong winds and turbulence',
              'Rapid weather changes'
            ],
            correctAnswer: 1,
            explanation: 'High pressure systems typically produce stable weather conditions with clear skies and light winds.',
            difficulty: 'easy',
            tags: ['high-pressure', 'characteristics']
          },
          {
            id: 'wx-q068',
            question: 'Low pressure weather systems typically produce:',
            options: [
              'Clear skies and calm winds',
              'Stable atmospheric conditions',
              'Clouds, precipitation, and unstable conditions',
              'High visibility conditions'
            ],
            correctAnswer: 2,
            explanation: 'Low pressure systems are associated with unstable weather, including clouds, precipitation, and stronger winds.',
            difficulty: 'easy',
            tags: ['low-pressure', 'weather-patterns']
          },
          {
            id: 'wx-q069',
            question: 'Cold fronts typically:',
            options: [
              'Move slowly with gradual weather changes',
              'Move quickly with abrupt weather changes',
              'Produce only light precipitation',
              'Have no effect on local weather'
            ],
            correctAnswer: 1,
            explanation: 'Cold fronts move relatively quickly and have steep slopes, causing rapid, often dramatic weather changes.',
            difficulty: 'medium',
            tags: ['cold-fronts', 'movement']
          },
          {
            id: 'wx-q070',
            question: 'Warm fronts are characterized by:',
            options: [
              'Steep slopes and fast movement',
              'Gradual slopes and slow movement',
              'No precipitation',
              'Extreme temperature changes'
            ],
            correctAnswer: 1,
            explanation: 'Warm fronts have gradual slopes and move slowly, producing widespread but generally lighter precipitation.',
            difficulty: 'medium',
            tags: ['warm-fronts', 'characteristics']
          },
          {
            id: 'wx-q071',
            question: 'An occluded front occurs when:',
            options: [
              'Two high pressure systems meet',
              'A cold front overtakes a warm front',
              'Warm air remains at the surface',
              'No frontal activity is present'
            ],
            correctAnswer: 1,
            explanation: 'An occluded front forms when a faster-moving cold front catches up to and overtakes a warm front.',
            difficulty: 'hard',
            tags: ['occluded-front', 'formation']
          },
          {
            id: 'wx-q072',
            question: 'In the Northern Hemisphere, surface winds around a low pressure system circulate:',
            options: [
              'Clockwise and outward',
              'Counterclockwise and inward',
              'Straight toward the center',
              'In random directions'
            ],
            correctAnswer: 1,
            explanation: 'Due to the Coriolis effect, surface winds around low pressure systems in the Northern Hemisphere circulate counterclockwise and inward.',
            difficulty: 'medium',
            tags: ['circulation', 'coriolis-effect']
          }
        ]
      },
      {
        id: 'weather-sources',
        title: 'Weather Information Sources',
        content: `Pilots must obtain current weather information from official sources for safe flight planning 
        and operations.`,
        keyPoints: [
          'Flight Service Station (FSS) provides briefings',
          'Aviation Weather Center provides forecasts and analysis',
          'Automated Surface Observing System (ASOS/AWOS)',
          'Weather apps and websites with official data',
          'Pilot reports (PIREPs) provide real-time conditions'
        ],
        flashcards: [
          {
            id: 'wx-023',
            front: 'What does FSS stand for?',
            back: 'Flight Service Station - provides weather briefings and flight planning services',
            difficulty: 'easy',
            tags: ['fss', 'weather-services']
          },
          {
            id: 'wx-024',
            front: 'What is the difference between ASOS and AWOS?',
            back: 'Both provide automated weather observations; ASOS is newer with more capabilities than AWOS',
            difficulty: 'medium',
            tags: ['asos', 'awos']
          },
          {
            id: 'wx-025',
            front: 'What is a PIREP?',
            back: 'Pilot Report - real-time weather conditions reported by pilots in flight',
            difficulty: 'easy',
            tags: ['pirep', 'pilot-reports']
          },
          {
            id: 'wx-026',
            front: 'What types of weather briefings are available from FSS?',
            back: 'Standard, abbreviated, and outlook briefings',
            difficulty: 'medium',
            tags: ['briefing-types', 'fss']
          }
        ],
        practiceQuestions: [
          {
            id: 'wx-q073',
            question: 'Flight Service Station (FSS) provides:',
            options: [
              'Aircraft maintenance services',
              'Weather briefings and flight planning assistance',
              'Air traffic control services',
              'Aircraft fueling services'
            ],
            correctAnswer: 1,
            explanation: 'FSS provides weather briefings, flight planning assistance, and other pilot services.',
            difficulty: 'easy',
            tags: ['fss-services', 'briefings']
          },
          {
            id: 'wx-q074',
            question: 'ASOS and AWOS systems provide:',
            options: [
              'Air traffic control instructions',
              'Automated surface weather observations',
              'Flight planning services',
              'Navigation guidance'
            ],
            correctAnswer: 1,
            explanation: 'ASOS (Automated Surface Observing System) and AWOS (Automated Weather Observing System) provide continuous automated weather observations.',
            difficulty: 'easy',
            tags: ['asos-awos', 'automated-weather']
          },
          {
            id: 'wx-q075',
            question: 'PIREPs are valuable because they provide:',
            options: [
              'Forecast information only',
              'Real-time conditions from pilots actually flying',
              'Historical weather data',
              'Airport operational information'
            ],
            correctAnswer: 1,
            explanation: 'Pilot Reports (PIREPs) provide current, real-time weather conditions from pilots actually experiencing the weather.',
            difficulty: 'easy',
            tags: ['pirep-value', 'real-time']
          },
          {
            id: 'wx-q076',
            question: 'The three types of weather briefings available from FSS are:',
            options: [
              'Local, regional, national',
              'Short, medium, long',
              'Standard, abbreviated, outlook',
              'Basic, intermediate, advanced'
            ],
            correctAnswer: 2,
            explanation: 'FSS provides standard (complete), abbreviated (updated), and outlook (future planning) briefings.',
            difficulty: 'medium',
            tags: ['briefing-types', 'weather-planning']
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
            back: 'The aircraft becomes nose-heavy and may be difficult to control in pitch',
            difficulty: 'medium',
            tags: ['cg', 'stability']
          },
          {
            id: 'perf-002',
            front: 'What is the effect of exceeding maximum gross weight?',
            back: 'Reduced performance, shorter endurance, and potential control issues',
            difficulty: 'medium',
            tags: ['weight', 'performance']
          },
          {
            id: 'perf-003',
            front: 'What is center of gravity (CG)?',
            back: 'The point where all weight and mass of the aircraft is considered to be concentrated',
            difficulty: 'easy',
            tags: ['cg', 'definition']
          },
          {
            id: 'perf-004',
            front: 'How does battery placement affect sUAS performance?',
            back: 'Battery placement significantly affects center of gravity and overall aircraft balance',
            difficulty: 'medium',
            tags: ['battery', 'balance']
          },
          {
            id: 'perf-005',
            front: 'What is useful load?',
            back: 'The difference between maximum gross weight and empty weight',
            difficulty: 'medium',
            tags: ['useful-load', 'weight']
          },
          {
            id: 'perf-006',
            front: 'What happens if payload exceeds useful load capacity?',
            back: 'The aircraft will exceed maximum gross weight limits and become unsafe',
            difficulty: 'medium',
            tags: ['payload', 'limits']
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
          },
          {
            id: 'perf-q077',
            question: 'Center of gravity is defined as:',
            options: [
              'The geometric center of the aircraft',
              'The point where all weight is concentrated',
              'The balance point of the wings only',
              'The center of the fuselage'
            ],
            correctAnswer: 1,
            explanation: 'Center of gravity is the point where all the weight and mass of the aircraft is considered to be concentrated.',
            difficulty: 'easy',
            tags: ['cg-definition', 'weight-balance']
          },
          {
            id: 'perf-q078',
            question: 'Exceeding the maximum gross weight will result in:',
            options: [
              'Improved climb performance',
              'Reduced performance and potential safety hazards',
              'No noticeable effect',
              'Better fuel efficiency'
            ],
            correctAnswer: 1,
            explanation: 'Exceeding maximum gross weight reduces performance, shortens range/endurance, and creates safety hazards.',
            difficulty: 'medium',
            tags: ['max-weight', 'performance']
          },
          {
            id: 'perf-q079',
            question: 'The useful load of an aircraft is:',
            options: [
              'The maximum weight it can carry',
              'The empty weight of the aircraft',
              'The difference between maximum gross weight and empty weight',
              'The weight of fuel only'
            ],
            correctAnswer: 2,
            explanation: 'Useful load is calculated by subtracting the empty weight from the maximum allowable gross weight.',
            difficulty: 'medium',
            tags: ['useful-load', 'calculation']
          },
          {
            id: 'perf-q080',
            question: 'Battery placement in a sUAS is critical because it affects:',
            options: [
              'Only the electrical system',
              'Center of gravity and aircraft balance',
              'Only the flight time',
              'Communication range only'
            ],
            correctAnswer: 1,
            explanation: 'Battery placement significantly affects the center of gravity and overall balance of the aircraft.',
            difficulty: 'medium',
            tags: ['battery-placement', 'cg-effects']
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
            id: 'perf-007',
            front: 'What are the four forces acting on an aircraft?',
            back: 'Lift, Weight (Gravity), Thrust, and Drag',
            difficulty: 'easy',
            tags: ['forces', 'aerodynamics']
          },
          {
            id: 'perf-008',
            front: 'What happens when an aircraft stalls?',
            back: 'Airflow separates from the wing surface, causing a sudden loss of lift',
            difficulty: 'medium',
            tags: ['stall', 'airflow']
          },
          {
            id: 'perf-009',
            front: 'What is angle of attack?',
            back: 'The angle between the wing chord line and the relative wind',
            difficulty: 'medium',
            tags: ['angle-of-attack', 'definition']
          },
          {
            id: 'perf-010',
            front: 'What is density altitude?',
            back: 'Pressure altitude corrected for non-standard temperature',
            difficulty: 'hard',
            tags: ['density-altitude', 'performance']
          },
          {
            id: 'perf-011',
            front: 'How does high density altitude affect aircraft performance?',
            back: 'Reduces performance - less lift, less thrust, longer takeoff/landing distances',
            difficulty: 'medium',
            tags: ['density-altitude', 'effects']
          },
          {
            id: 'perf-012',
            front: 'What is relative wind?',
            back: 'The airflow direction relative to the aircraft, opposite to the flight path',
            difficulty: 'medium',
            tags: ['relative-wind', 'airflow']
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
          },
          {
            id: 'perf-q081',
            question: 'An aircraft stalls when:',
            options: [
              'The engine stops running',
              'Airflow separates from the wing surface',
              'The aircraft runs out of fuel',
              'The pilot reduces power'
            ],
            correctAnswer: 1,
            explanation: 'A stall occurs when the airflow separates from the wing surface, typically due to exceeding the critical angle of attack.',
            difficulty: 'medium',
            tags: ['stall', 'airflow-separation']
          },
          {
            id: 'perf-q082',
            question: 'Angle of attack is the angle between:',
            options: [
              'The wing and the horizon',
              'The wing chord line and the relative wind',
              'The fuselage and the ground',
              'The propeller and the wing'
            ],
            correctAnswer: 1,
            explanation: 'Angle of attack is specifically the angle between the wing chord line and the relative wind direction.',
            difficulty: 'medium',
            tags: ['angle-of-attack', 'definition']
          },
          {
            id: 'perf-q083',
            question: 'Density altitude is:',
            options: [
              'The same as pressure altitude',
              'Always higher than actual altitude',
              'Pressure altitude corrected for non-standard temperature',
              'Only important at high altitudes'
            ],
            correctAnswer: 2,
            explanation: 'Density altitude is pressure altitude corrected for non-standard temperature variations.',
            difficulty: 'hard',
            tags: ['density-altitude', 'calculation']
          },
          {
            id: 'perf-q084',
            question: 'High density altitude conditions result in:',
            options: [
              'Improved aircraft performance',
              'Reduced aircraft performance',
              'No effect on performance',
              'Only affects jet aircraft'
            ],
            correctAnswer: 1,
            explanation: 'High density altitude reduces air density, resulting in decreased lift, thrust, and overall aircraft performance.',
            difficulty: 'medium',
            tags: ['density-altitude-effects', 'performance']
          },
          {
            id: 'perf-q085',
            question: 'Relative wind is:',
            options: [
              'Wind relative to the ground',
              'The airflow direction relative to the aircraft',
              'Only present during windy conditions',
              'The same as surface wind'
            ],
            correctAnswer: 1,
            explanation: 'Relative wind is the airflow direction relative to the aircraft, which is opposite to the aircraft\'s flight path.',
            difficulty: 'medium',
            tags: ['relative-wind', 'airflow']
          }
        ]
      },
      {
        id: 'environmental-factors',
        title: 'Environmental Factors Affecting Performance',
        content: `Various environmental conditions significantly impact aircraft performance including 
        temperature, altitude, humidity, and wind conditions.`,
        keyPoints: [
          'High temperature reduces air density and performance',
          'High altitude reduces air density',
          'High humidity reduces performance',
          'Wind affects ground speed and drift',
          'Pressure changes affect altimeter readings'
        ],
        flashcards: [
          {
            id: 'perf-013',
            front: 'How does high temperature affect aircraft performance?',
            back: 'High temperature reduces air density, resulting in decreased performance',
            difficulty: 'medium',
            tags: ['temperature', 'performance']
          },
          {
            id: 'perf-014',
            front: 'What is the effect of high humidity on aircraft performance?',
            back: 'High humidity reduces air density and decreases performance',
            difficulty: 'medium',
            tags: ['humidity', 'performance']
          },
          {
            id: 'perf-015',
            front: 'How does altitude affect air density?',
            back: 'Higher altitude = lower air density = reduced aircraft performance',
            difficulty: 'easy',
            tags: ['altitude', 'air-density']
          },
          {
            id: 'perf-016',
            front: 'What is ground effect?',
            back: 'Increased lift and reduced drag when operating close to the ground surface',
            difficulty: 'hard',
            tags: ['ground-effect', 'low-altitude']
          }
        ],
        practiceQuestions: [
          {
            id: 'perf-q086',
            question: 'High temperature conditions will:',
            options: [
              'Improve aircraft performance',
              'Have no effect on performance',
              'Reduce aircraft performance',
              'Only affect turbine engines'
            ],
            correctAnswer: 2,
            explanation: 'High temperatures reduce air density, which decreases lift production and overall aircraft performance.',
            difficulty: 'medium',
            tags: ['temperature-effects', 'performance']
          },
          {
            id: 'perf-q087',
            question: 'The effect of high humidity on aircraft performance is:',
            options: [
              'Improved performance due to cooler air',
              'No significant effect',
              'Reduced performance due to less dense air',
              'Only affects propeller aircraft'
            ],
            correctAnswer: 2,
            explanation: 'High humidity makes air less dense, reducing lift production and aircraft performance.',
            difficulty: 'medium',
            tags: ['humidity-effects', 'air-density']
          },
          {
            id: 'perf-q088',
            question: 'As altitude increases, air density:',
            options: [
              'Increases',
              'Decreases',
              'Remains constant',
              'Varies unpredictably'
            ],
            correctAnswer: 1,
            explanation: 'Air density decreases with altitude, resulting in reduced aircraft performance at higher altitudes.',
            difficulty: 'easy',
            tags: ['altitude-effects', 'density']
          },
          {
            id: 'perf-q089',
            question: 'Ground effect occurs when:',
            options: [
              'Flying in ground clutter',
              'Operating close to the ground surface',
              'Landing on soft surfaces',
              'Flying in mountainous terrain'
            ],
            correctAnswer: 1,
            explanation: 'Ground effect occurs when operating close to the ground, typically within one wingspan of the surface.',
            difficulty: 'hard',
            tags: ['ground-effect', 'proximity']
          }
        ]
      },
      {
        id: 'aircraft-systems',
        title: 'Aircraft Systems and Components',
        content: `Understanding aircraft systems and components is essential for proper operation 
        and maintenance of sUAS.`,
        keyPoints: [
          'Flight control systems provide maneuverability',
          'Propulsion systems provide thrust',
          'Power systems provide electrical energy',
          'Navigation systems provide positioning',
          'Communication systems enable remote control'
        ],
        flashcards: [
          {
            id: 'perf-017',
            front: 'What are the primary flight control surfaces?',
            back: 'Elevators (pitch), rudder (yaw), and ailerons (roll)',
            difficulty: 'easy',
            tags: ['flight-controls', 'surfaces']
          },
          {
            id: 'perf-018',
            front: 'What is the function of a gyroscope in aircraft systems?',
            back: 'Provides attitude and heading information for flight control',
            difficulty: 'medium',
            tags: ['gyroscope', 'navigation']
          },
          {
            id: 'perf-019',
            front: 'What type of engines are commonly used in sUAS?',
            back: 'Electric motors powered by batteries are most common',
            difficulty: 'easy',
            tags: ['propulsion', 'electric-motors']
          },
          {
            id: 'perf-020',
            front: 'What is GPS used for in sUAS operations?',
            back: 'Navigation, position holding, and return-to-home functions',
            difficulty: 'easy',
            tags: ['gps', 'navigation']
          }
        ],
        practiceQuestions: [
          {
            id: 'perf-q090',
            question: 'The primary flight control surfaces are:',
            options: [
              'Wings, fuselage, and tail',
              'Elevators, rudder, and ailerons',
              'Propellers, motors, and batteries',
              'GPS, compass, and altimeter'
            ],
            correctAnswer: 1,
            explanation: 'The primary flight controls are elevators (pitch), rudder (yaw), and ailerons (roll).',
            difficulty: 'easy',
            tags: ['flight-controls', 'primary-surfaces']
          },
          {
            id: 'perf-q091',
            question: 'In most sUAS, propulsion is provided by:',
            options: [
              'Internal combustion engines',
              'Jet engines',
              'Electric motors',
              'Rocket motors'
            ],
            correctAnswer: 2,
            explanation: 'Most small unmanned aircraft systems use electric motors powered by rechargeable batteries.',
            difficulty: 'easy',
            tags: ['propulsion', 'electric']
          },
          {
            id: 'perf-q092',
            question: 'GPS in sUAS is primarily used for:',
            options: [
              'Communication with ATC',
              'Weather information',
              'Navigation and position control',
              'Engine monitoring'
            ],
            correctAnswer: 2,
            explanation: 'GPS provides navigation, position holding, waypoint flying, and return-to-home capabilities.',
            difficulty: 'easy',
            tags: ['gps-functions', 'navigation']
          },
          {
            id: 'perf-q093',
            question: 'A gyroscope in aircraft systems provides:',
            options: [
              'Power generation',
              'Attitude and heading information',
              'Communication capabilities',
              'Weather data'
            ],
            correctAnswer: 1,
            explanation: 'Gyroscopes provide critical attitude and heading information for flight control and navigation.',
            difficulty: 'medium',
            tags: ['gyroscope-function', 'flight-instruments']
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
          },
          {
            id: 'ops-003',
            front: 'What items should be checked on the aircraft structure during preflight?',
            back: 'Fuselage, wings, landing gear, and attachment points for damage or wear',
            difficulty: 'medium',
            tags: ['structural-inspection', 'preflight']
          },
          {
            id: 'ops-004',
            front: 'How should propellers be inspected?',
            back: 'Check for cracks, nicks, proper attachment, and freedom of movement',
            difficulty: 'medium',
            tags: ['propeller', 'inspection']
          },
          {
            id: 'ops-005',
            front: 'What battery checks should be performed before flight?',
            back: 'Verify charge level, secure connections, physical condition, and proper installation',
            difficulty: 'easy',
            tags: ['battery', 'preflight']
          },
          {
            id: 'ops-006',
            front: 'What control system tests should be performed?',
            back: 'Test all control inputs, verify proper response, and check range/signal strength',
            difficulty: 'medium',
            tags: ['control-systems', 'testing']
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
          },
          {
            id: 'ops-q094',
            question: 'During preflight inspection, the propeller should be checked for:',
            options: [
              'Proper color and markings only',
              'Cracks, nicks, and secure attachment',
              'Weight and balance only',
              'Electrical connections only'
            ],
            correctAnswer: 1,
            explanation: 'Propellers should be inspected for any cracks, nicks, damage, and secure attachment to the motor.',
            difficulty: 'medium',
            tags: ['propeller-inspection', 'safety']
          },
          {
            id: 'ops-q095',
            question: 'Battery condition during preflight should include checking:',
            options: [
              'Only the charge level',
              'Charge level, connections, and physical condition',
              'Only the voltage',
              'Only the weight'
            ],
            correctAnswer: 1,
            explanation: 'Battery inspection should include charge level, secure connections, physical condition, and proper installation.',
            difficulty: 'easy',
            tags: ['battery-inspection', 'preflight']
          },
          {
            id: 'ops-q096',
            question: 'Control system testing during preflight should verify:',
            options: [
              'Only the power-on sequence',
              'All control inputs and proper aircraft response',
              'Only the GPS system',
              'Only the camera controls'
            ],
            correctAnswer: 1,
            explanation: 'All control inputs should be tested to ensure proper aircraft response and system functionality.',
            difficulty: 'medium',
            tags: ['control-testing', 'verification']
          },
          {
            id: 'ops-q097',
            question: 'Which weather information is most critical for preflight planning?',
            options: [
              'Historical weather data only',
              'Current conditions, forecasts, and NOTAMs',
              'Only wind information',
              'Only visibility information'
            ],
            correctAnswer: 1,
            explanation: 'Comprehensive weather information including current conditions, forecasts, and relevant NOTAMs is essential for flight planning.',
            difficulty: 'medium',
            tags: ['weather-planning', 'preflight']
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
            id: 'ops-007',
            front: 'What should a pilot do if the sUAS experiences a lost link situation?',
            back: 'Follow predetermined lost link procedures, typically including automatic return-to-home',
            difficulty: 'medium',
            tags: ['lost-link', 'emergency']
          },
          {
            id: 'ops-008',
            front: 'What is the first priority during any emergency?',
            back: 'Maintain aircraft control and ensure the safety of people and property on the ground',
            difficulty: 'easy',
            tags: ['emergency', 'priorities']
          },
          {
            id: 'ops-009',
            front: 'What should be done when receiving a low battery warning?',
            back: 'Immediately initiate return-to-home or land at the nearest safe location',
            difficulty: 'easy',
            tags: ['battery', 'emergency']
          },
          {
            id: 'ops-010',
            front: 'What is the typical response to engine/motor failure?',
            back: 'Establish best glide speed and execute emergency landing procedures',
            difficulty: 'medium',
            tags: ['engine-failure', 'landing']
          },
          {
            id: 'ops-011',
            front: 'How should control system malfunctions be handled?',
            back: 'Switch to manual control if possible, or initiate automatic safety features like RTH',
            difficulty: 'medium',
            tags: ['control-failure', 'manual']
          },
          {
            id: 'ops-012',
            front: 'What factors should be considered for emergency landing site selection?',
            back: 'Away from people, soft surface if possible, clear of obstacles, and accessible for recovery',
            difficulty: 'hard',
            tags: ['emergency-landing', 'site-selection']
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
          },
          {
            id: 'ops-q098',
            question: 'The primary concern during any emergency is:',
            options: [
              'Saving the aircraft',
              'Completing the mission',
              'Safety of people and property on the ground',
              'Maintaining communication'
            ],
            correctAnswer: 2,
            explanation: 'The safety of people and property on the ground is always the primary concern during emergencies.',
            difficulty: 'easy',
            tags: ['emergency-priorities', 'safety']
          },
          {
            id: 'ops-q099',
            question: 'When a low battery warning is received, the pilot should:',
            options: [
              'Continue the mission for a few more minutes',
              'Immediately return to home or land safely',
              'Ignore the warning if the mission is important',
              'Reduce power to extend flight time'
            ],
            correctAnswer: 1,
            explanation: 'Low battery warnings should prompt immediate return-to-home or landing to prevent complete power loss.',
            difficulty: 'easy',
            tags: ['low-battery', 'immediate-action']
          },
          {
            id: 'ops-q100',
            question: 'During an engine failure, the pilot should:',
            options: [
              'Attempt to restart the engine repeatedly',
              'Establish best glide and prepare for emergency landing',
              'Climb to gain altitude',
              'Continue flying normally'
            ],
            correctAnswer: 1,
            explanation: 'Engine failure requires establishing best glide speed and executing emergency landing procedures.',
            difficulty: 'medium',
            tags: ['engine-failure', 'glide']
          },
          {
            id: 'ops-q101',
            question: 'Emergency landing site selection should prioritize:',
            options: [
              'The shortest distance to land',
              'Areas away from people with suitable terrain',
              'The most expensive-looking property',
              'Areas with the best cell phone coverage'
            ],
            correctAnswer: 1,
            explanation: 'Emergency landing sites should be away from people with terrain suitable for the safest possible landing.',
            difficulty: 'medium',
            tags: ['landing-site', 'selection-criteria']
          },
          {
            id: 'ops-q102',
            question: 'If control system malfunctions occur, the pilot should:',
            options: [
              'Panic and shut down all systems',
              'Switch to backup control modes if available',
              'Ignore the problem',
              'Increase altitude immediately'
            ],
            correctAnswer: 1,
            explanation: 'Control malfunctions should be addressed by switching to backup control modes, manual control, or automated safety features.',
            difficulty: 'medium',
            tags: ['control-malfunction', 'backup-systems']
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
            id: 'ops-013',
            front: 'What is the primary goal of Crew Resource Management?',
            back: 'To improve safety through better communication, decision-making, and teamwork',
            difficulty: 'medium',
            tags: ['crm', 'safety']
          },
          {
            id: 'ops-014',
            front: 'Who has the final authority for sUAS operations?',
            back: 'The remote pilot in command (RPIC) has final authority and responsibility',
            difficulty: 'easy',
            tags: ['authority', 'responsibility']
          },
          {
            id: 'ops-015',
            front: 'What is situational awareness?',
            back: 'Understanding what is happening around you and anticipating future events',
            difficulty: 'medium',
            tags: ['situational-awareness', 'definition']
          },
          {
            id: 'ops-016',
            front: 'What role does a visual observer (VO) play?',
            back: 'Assists the RPIC by maintaining visual contact with the aircraft and monitoring for hazards',
            difficulty: 'medium',
            tags: ['visual-observer', 'role']
          },
          {
            id: 'ops-017',
            front: 'How should workload be managed during complex operations?',
            back: 'Prioritize safety-critical tasks and delegate appropriate responsibilities to crew members',
            difficulty: 'hard',
            tags: ['workload-management', 'prioritization']
          },
          {
            id: 'ops-018',
            front: 'What is the difference between RPIC and person manipulating controls?',
            back: 'RPIC has overall responsibility; person manipulating controls operates the aircraft under RPIC supervision',
            difficulty: 'medium',
            tags: ['rpic', 'pilot-roles']
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
          },
          {
            id: 'ops-q103',
            question: 'Crew Resource Management is primarily concerned with:',
            options: [
              'Technical aircraft systems only',
              'Communication, decision-making, and teamwork',
              'Weather analysis only',
              'Cost management'
            ],
            correctAnswer: 1,
            explanation: 'CRM focuses on human factors including communication, decision-making, teamwork, and workload management.',
            difficulty: 'medium',
            tags: ['crm-focus', 'human-factors']
          },
          {
            id: 'ops-q104',
            question: 'Situational awareness involves:',
            options: [
              'Only knowing aircraft position',
              'Understanding current conditions and anticipating future events',
              'Only monitoring weather',
              'Only checking equipment status'
            ],
            correctAnswer: 1,
            explanation: 'Situational awareness encompasses understanding the current situation and anticipating how it might develop.',
            difficulty: 'medium',
            tags: ['situational-awareness', 'definition']
          },
          {
            id: 'ops-q105',
            question: 'A visual observer\'s primary responsibility is to:',
            options: [
              'Operate the camera systems',
              'Navigate the aircraft',
              'Maintain visual contact with the aircraft and scan for hazards',
              'Handle all communications'
            ],
            correctAnswer: 2,
            explanation: 'Visual observers assist the RPIC by maintaining visual contact with the aircraft and monitoring for potential hazards.',
            difficulty: 'medium',
            tags: ['visual-observer', 'responsibilities']
          },
          {
            id: 'ops-q106',
            question: 'During high workload situations, the RPIC should:',
            options: [
              'Try to handle everything alone',
              'Prioritize tasks and delegate appropriately',
              'Ignore less important tasks completely',
              'Speed up all operations'
            ],
            correctAnswer: 1,
            explanation: 'Effective workload management involves prioritizing safety-critical tasks and using crew members effectively.',
            difficulty: 'hard',
            tags: ['workload-management', 'delegation']
          },
          {
            id: 'ops-q107',
            question: 'The difference between RPIC and the person manipulating controls is:',
            options: [
              'There is no difference',
              'RPIC has overall responsibility; person manipulating controls operates under supervision',
              'Person manipulating controls has final authority',
              'They must be the same person always'
            ],
            correctAnswer: 1,
            explanation: 'The RPIC maintains overall responsibility and authority even when someone else is manipulating the controls.',
            difficulty: 'medium',
            tags: ['pilot-roles', 'responsibility']
          }
        ]
      },
      {
        id: 'risk-management',
        title: 'Risk Assessment and Management',
        content: `Risk management involves identifying, assessing, and mitigating hazards to ensure safe operations. 
        This includes threat identification, risk assessment, and implementation of mitigation strategies.`,
        keyPoints: [
          'Hazard identification and assessment',
          'Risk matrix evaluation (probability vs severity)',
          'Risk mitigation strategies',
          'Go/no-go decision making',
          'Continuous risk assessment during flight'
        ],
        flashcards: [
          {
            id: 'ops-019',
            front: 'What is the difference between a hazard and risk?',
            back: 'A hazard is a condition that could cause harm; risk is the probability and severity of that harm occurring',
            difficulty: 'medium',
            tags: ['hazard', 'risk', 'definitions']
          },
          {
            id: 'ops-020',
            front: 'What are the components of a risk assessment matrix?',
            back: 'Probability (likelihood) and severity (consequence) of an event occurring',
            difficulty: 'medium',
            tags: ['risk-matrix', 'assessment']
          },
          {
            id: 'ops-021',
            front: 'What are common risk mitigation strategies?',
            back: 'Eliminate, reduce, transfer, or accept the risk based on the assessment',
            difficulty: 'hard',
            tags: ['risk-mitigation', 'strategies']
          },
          {
            id: 'ops-022',
            front: 'When should a go/no-go decision be made?',
            back: 'Before flight based on all identified risks, and continuously during the operation',
            difficulty: 'medium',
            tags: ['go-no-go', 'decision-making']
          },
          {
            id: 'ops-023',
            front: 'What factors increase operational risk?',
            back: 'Weather, terrain, obstacles, people, aircraft condition, pilot experience, and mission complexity',
            difficulty: 'medium',
            tags: ['risk-factors', 'operations']
          }
        ],
        practiceQuestions: [
          {
            id: 'ops-q108',
            question: 'Risk is defined as:',
            options: [
              'Any dangerous condition',
              'The probability and severity of a hazard causing harm',
              'Only the likelihood of an event',
              'Only the consequences of an event'
            ],
            correctAnswer: 1,
            explanation: 'Risk combines both the probability (likelihood) and severity (consequences) of a hazardous event occurring.',
            difficulty: 'medium',
            tags: ['risk-definition', 'assessment']
          },
          {
            id: 'ops-q109',
            question: 'A risk assessment matrix evaluates:',
            options: [
              'Only the cost of operations',
              'Probability and severity of potential events',
              'Only weather conditions',
              'Only equipment reliability'
            ],
            correctAnswer: 1,
            explanation: 'Risk assessment matrices plot probability (likelihood) against severity (consequences) to evaluate overall risk levels.',
            difficulty: 'medium',
            tags: ['risk-matrix', 'evaluation']
          },
          {
            id: 'ops-q110',
            question: 'The four basic risk management strategies are:',
            options: [
              'Plan, execute, monitor, adjust',
              'Eliminate, reduce, transfer, accept',
              'Identify, assess, communicate, document',
              'Avoid, delay, modify, continue'
            ],
            correctAnswer: 1,
            explanation: 'The four fundamental risk management strategies are eliminate, reduce, transfer, or accept the identified risk.',
            difficulty: 'hard',
            tags: ['risk-strategies', 'management']
          },
          {
            id: 'ops-q111',
            question: 'Go/no-go decisions should be based on:',
            options: [
              'Time pressure only',
              'Comprehensive risk assessment of all factors',
              'Weather conditions only',
              'Client expectations only'
            ],
            correctAnswer: 1,
            explanation: 'Go/no-go decisions must consider all risk factors including weather, aircraft condition, pilot capability, and mission requirements.',
            difficulty: 'medium',
            tags: ['go-no-go', 'decision-factors']
          },
          {
            id: 'ops-q112',
            question: 'Risk assessment should be conducted:',
            options: [
              'Only before the flight',
              'Only during emergencies',
              'Continuously throughout the operation',
              'Only after incidents occur'
            ],
            correctAnswer: 2,
            explanation: 'Risk assessment is a continuous process that should occur before, during, and after flight operations.',
            difficulty: 'medium',
            tags: ['continuous-assessment', 'ongoing-evaluation']
          }
        ]
      },
      {
        id: 'maintenance-inspections',
        title: 'Maintenance and Inspections',
        content: `Proper maintenance and regular inspections ensure continued airworthiness and safe operation 
        of small unmanned aircraft systems.`,
        keyPoints: [
          'Regular maintenance requirements',
          'Inspection intervals and procedures',
          'Recordkeeping requirements',
          'Component replacement criteria',
          'Troubleshooting common issues'
        ],
        flashcards: [
          {
            id: 'ops-024',
            front: 'Who is responsible for maintaining sUAS in airworthy condition?',
            back: 'The owner/operator is responsible for maintaining the aircraft in airworthy condition',
            difficulty: 'easy',
            tags: ['maintenance', 'responsibility']
          },
          {
            id: 'ops-025',
            front: 'What records should be kept for sUAS maintenance?',
            back: 'Maintenance logs, inspection records, component changes, and any repairs or modifications',
            difficulty: 'medium',
            tags: ['records', 'documentation']
          },
          {
            id: 'ops-026',
            front: 'How often should routine inspections be performed?',
            back: 'Based on manufacturer recommendations, flight hours, or operational requirements',
            difficulty: 'medium',
            tags: ['inspection-intervals', 'frequency']
          },
          {
            id: 'ops-027',
            front: 'What are signs that components need replacement?',
            back: 'Visible damage, excessive wear, performance degradation, or manufacturer service limits',
            difficulty: 'medium',
            tags: ['component-replacement', 'wear-indicators']
          }
        ],
        practiceQuestions: [
          {
            id: 'ops-q113',
            question: 'The responsibility for maintaining a sUAS in airworthy condition lies with:',
            options: [
              'The FAA',
              'The manufacturer',
              'The owner/operator',
              'The remote pilot certificate holder'
            ],
            correctAnswer: 2,
            explanation: 'The owner/operator is responsible for ensuring the sUAS remains in airworthy condition through proper maintenance.',
            difficulty: 'easy',
            tags: ['maintenance-responsibility', 'owner-operator']
          },
          {
            id: 'ops-q114',
            question: 'Maintenance records should include:',
            options: [
              'Only major repairs',
              'Only component replacements',
              'All maintenance, inspections, and modifications',
              'Only manufacturer warranty work'
            ],
            correctAnswer: 2,
            explanation: 'Complete maintenance records should document all maintenance activities, inspections, repairs, and modifications.',
            difficulty: 'medium',
            tags: ['maintenance-records', 'documentation']
          },
          {
            id: 'ops-q115',
            question: 'Inspection intervals should be based on:',
            options: [
              'Calendar time only',
              'Flight hours only',
              'Manufacturer recommendations and operational requirements',
              'Personal preference only'
            ],
            correctAnswer: 2,
            explanation: 'Inspection intervals should follow manufacturer recommendations while considering actual operational use and conditions.',
            difficulty: 'medium',
            tags: ['inspection-intervals', 'guidelines']
          },
          {
            id: 'ops-q116',
            question: 'Components should be replaced when they show:',
            options: [
              'Any signs of use',
              'Damage, excessive wear, or performance degradation',
              'Minor cosmetic issues only',
              'Only when they completely fail'
            ],
            correctAnswer: 1,
            explanation: 'Components should be replaced when showing damage, excessive wear, performance issues, or reaching service limits.',
            difficulty: 'medium',
            tags: ['component-replacement', 'criteria']
          }
        ]
      },
      {
        id: 'airport-operations',
        title: 'Airport Operations and Coordination',
        content: `Operating near airports requires understanding of airport operations, coordination procedures, 
        and specific requirements for sUAS operations in controlled airspace.`,
        keyPoints: [
          'Airport traffic patterns and procedures',
          'Coordination with ATC and airport personnel',
          'Understanding of controlled vs uncontrolled airports',
          'LAANC authorization procedures',
          'Emergency response coordination'
        ],
        flashcards: [
          {
            id: 'ops-028',
            front: 'What is the standard traffic pattern altitude for airports?',
            back: '1,000 feet AGL for most general aviation airports',
            difficulty: 'medium',
            tags: ['traffic-pattern', 'altitude']
          },
          {
            id: 'ops-029',
            front: 'What is required for sUAS operations at controlled airports?',
            back: 'Prior authorization through LAANC or manual waiver process',
            difficulty: 'easy',
            tags: ['controlled-airports', 'authorization']
          },
          {
            id: 'ops-030',
            front: 'How should emergency coordination be handled near airports?',
            back: 'Immediately contact airport operations and ATC if operating in controlled airspace',
            difficulty: 'medium',
            tags: ['emergency-coordination', 'airports']
          },
          {
            id: 'ops-031',
            front: 'What information should be provided when requesting airport coordination?',
            back: 'Aircraft type, location, altitude, duration, and purpose of operation',
            difficulty: 'medium',
            tags: ['coordination-information', 'communication']
          }
        ],
        practiceQuestions: [
          {
            id: 'ops-q117',
            question: 'Before operating a sUAS in Class D airspace, a remote pilot must:',
            options: [
              'File a flight plan',
              'Obtain prior authorization from ATC',
              'Contact the tower by radio',
              'Land at the airport first'
            ],
            correctAnswer: 1,
            explanation: 'Class D airspace requires prior ATC authorization for sUAS operations, typically obtained through LAANC.',
            difficulty: 'easy',
            tags: ['class-d', 'authorization']
          },
          {
            id: 'ops-q118',
            question: 'The standard traffic pattern altitude at most general aviation airports is:',
            options: [
              '500 feet AGL',
              '1,000 feet AGL',
              '1,500 feet AGL',
              '2,000 feet AGL'
            ],
            correctAnswer: 1,
            explanation: 'Most general aviation airports have traffic pattern altitudes of 1,000 feet AGL.',
            difficulty: 'medium',
            tags: ['traffic-pattern', 'standard-altitude']
          },
          {
            id: 'ops-q119',
            question: 'When coordinating sUAS operations near airports, pilots should provide:',
            options: [
              'Only the aircraft registration number',
              'Aircraft type, location, altitude, duration, and purpose',
              'Only the pilot certificate number',
              'Only the planned flight path'
            ],
            correctAnswer: 1,
            explanation: 'Complete coordination requires providing all relevant operational details to ensure safety and awareness.',
            difficulty: 'medium',
            tags: ['coordination-details', 'communication']
          },
          {
            id: 'ops-q120',
            question: 'If an emergency occurs during sUAS operations near a controlled airport, the pilot should:',
            options: [
              'Handle it alone without notifying anyone',
              'Only call 911',
              'Immediately contact airport operations and ATC',
              'Wait until after landing to report'
            ],
            correctAnswer: 2,
            explanation: 'Airport emergencies require immediate notification to airport operations and ATC to coordinate response and maintain airspace safety.',
            difficulty: 'medium',
            tags: ['airport-emergencies', 'notification']
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