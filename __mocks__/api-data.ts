import { Question, QuestionsResponse } from '@/app/hooks/useQuestionsQuery'

export const successfulApiData: QuestionsResponse = {
  response_code: 0,
  results: [
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science%3A%20Computers',
      question:
        'Moore%27s%20law%20originally%20stated%20that%20the%20number%20of%20transistors%20on%20a%20microprocessor%20chip%20would%20double%20every...',
      correct_answer: 'Year',
      incorrect_answers: ['Four%20Years', 'Two%20Years', 'Eight%20Years'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science%3A%20Computers',
      question:
        'On%20which%20day%20did%20the%20World%20Wide%20Web%20go%20online%3F',
      correct_answer: 'December%2020%2C%201990',
      incorrect_answers: [
        'December%2017%2C%201996',
        'November%2012%2C%201990',
        'November%2024%2C%201995',
      ],
    },
    {
      type: 'multiple',
      difficulty: 'easy',
      category: 'Science%3A%20Computers',
      question:
        'In%20%22Hexadecimal%22%2C%20what%20color%20would%20be%20displayed%20from%20the%20color%20code%3F%20%22%2300FF00%22%3F',
      correct_answer: 'Green',
      incorrect_answers: ['Red', 'Blue', 'Yellow'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science%3A%20Computers',
      question:
        'All%20of%20the%20following%20programs%20are%20classified%20as%20raster%20graphics%20editors%20EXCEPT%3A',
      correct_answer: 'Inkscape',
      incorrect_answers: ['Paint.NET', 'GIMP', 'Adobe%20Photoshop'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science%3A%20Computers',
      question: 'What%20does%20the%20term%20GPU%20stand%20for%3F',
      correct_answer: 'Graphics%20Processing%20Unit',
      incorrect_answers: [
        'Gaming%20Processor%20Unit',
        'Graphite%20Producing%20Unit',
        'Graphical%20Proprietary%20Unit',
      ],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science%3A%20Computers',
      question: 'How%20many%20bytes%20are%20in%20a%20single%20Kibibyte%3F',
      correct_answer: '1024',
      incorrect_answers: ['2400', '1000', '1240'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science%3A%20Computers',
      question:
        'What%20does%20the%20acronym%20CDN%20stand%20for%20in%20terms%20of%20networking%3F',
      correct_answer: 'Content%20Delivery%20Network',
      incorrect_answers: [
        'Content%20Distribution%20Network',
        'Computational%20Data%20Network',
        'Compressed%20Data%20Network',
      ],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science%3A%20Computers',
      question:
        'What%20did%20the%20name%20of%20the%20Tor%20Anonymity%20Network%20orignially%20stand%20for%3F',
      correct_answer: 'The%20Onion%20Router',
      incorrect_answers: [
        'The%20Only%20Router',
        'The%20Orange%20Router',
        'The%20Ominous%20Router',
      ],
    },
    {
      type: 'multiple',
      difficulty: 'easy',
      category: 'Science%3A%20Computers',
      question:
        'Which%20programming%20language%20shares%20its%20name%20with%20an%20island%20in%20Indonesia%3F',
      correct_answer: 'Java',
      incorrect_answers: ['Python', 'C', 'Jakarta'],
    },
    {
      type: 'multiple',
      difficulty: 'easy',
      category: 'Science%3A%20Computers',
      question:
        'The%20C%20programming%20language%20was%20created%20by%20this%20American%20computer%20scientist.%20',
      correct_answer: 'Dennis%20Ritchie',
      incorrect_answers: [
        'Tim%20Berners%20Lee',
        'al-Khw%C4%81rizm%C4%AB',
        'Willis%20Ware',
      ],
    },
  ],
}

export const failedApiData: QuestionsResponse = {
  response_code: 5,
  results: [],
}

export const questionsData: Question[] = [
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science: Computers',
    question:
      "Moore's law originally stated that the number of transistors on a microprocessor chip would double every...",
    correct_answer: 'Year',
    incorrect_answers: ['Four Years', 'Two Years', 'Eight Years'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science: Computers',
    question: 'On which day did the World Wide Web go online?',
    correct_answer: 'December 20, 1990',
    incorrect_answers: [
      'December 17, 1996',
      'November 12, 1990',
      'November 24, 1995',
    ],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Science: Computers',
    question:
      'In "Hexadecimal", what color would be displayed from the color code? "#00FF00"?',
    correct_answer: 'Green',
    incorrect_answers: ['Red', 'Blue', 'Yellow'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science: Computers',
    question:
      'All of the following programs are classified as raster graphics editors EXCEPT:',
    correct_answer: 'Inkscape',
    incorrect_answers: ['Paint.NET', 'GIMP', 'Adobe Photoshop'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science: Computers',
    question: 'What does the term GPU stand for?',
    correct_answer: 'Graphics Processing Unit',
    incorrect_answers: [
      'Gaming Processor Unit',
      'Graphite Producing Unit',
      'Graphical Proprietary Unit',
    ],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science: Computers',
    question: 'How many bytes are in a single Kibibyte?',
    correct_answer: '1024',
    incorrect_answers: ['2400', '1000', '1240'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science: Computers',
    question: 'What does the acronym CDN stand for in terms of networking?',
    correct_answer: 'Content Delivery Network',
    incorrect_answers: [
      'Content Distribution Network',
      'Computational Data Network',
      'Compressed Data Network',
    ],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science: Computers',
    question:
      'What did the name of the Tor Anonymity Network orignially stand for?',
    correct_answer: 'The Onion Router',
    incorrect_answers: [
      'The Only Router',
      'The Orange Router',
      'The Ominous Router',
    ],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Science: Computers',
    question:
      'Which programming language shares its name with an island in Indonesia?',
    correct_answer: 'Java',
    incorrect_answers: ['Python', 'C', 'Jakarta'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Science: Computers',
    question:
      'The C programming language was created by this American computer scientist. ',
    correct_answer: 'Dennis Ritchie',
    incorrect_answers: ['Tim Berners Lee', 'al-Khwārizmī', 'Willis Ware'],
  },
]
