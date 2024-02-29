import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Question } from '../hooks/useQuestionsQuery'

export type ReviewData = Pick<Question, 'question' | 'difficulty'> & {
  myAnswer: string
  correctAnswer: string
}

export interface ReviewNote {
  endTime: string
  wrongAnswers: ReviewData[]
}

interface ReviewStore {
  data: ReviewNote[]
  addData: (newData: ReviewNote) => void
  clearData: () => void
}

export const getWrongAnswers = (data: Question[], myAnswers: string[]) => {
  return data
    .map(({ question, difficulty, correct_answer }, i) =>
      correct_answer === myAnswers[i]
        ? null
        : {
            question,
            difficulty,
            correctAnswer: correct_answer,
            myAnswer: myAnswers[i],
          },
    )
    .filter((item) => !!item) as ReviewData[]
}

const myMiddlewares = (
  f: StateCreator<
    ReviewStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    []
  >,
) => devtools(persist(f, { name: 'review-storage' }))

export const useReviewStore = create<ReviewStore>()(
  myMiddlewares((set) => ({
    data: [],
    addData: (newData) => set((state) => ({ data: [...state.data, newData] })),
    clearData: () => set({ data: [] }),
  })),
)
