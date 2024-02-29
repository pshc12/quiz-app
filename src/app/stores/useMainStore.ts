import { create } from 'zustand'

export type Stage = 'entry' | 'quiz' | 'result' | 'review'

interface MainStore {
  stage: Stage
  questionIndex: number
  questionsKey: string
  startTime: number | undefined
  endTime: number | undefined
  answers: string[]
  setQuestionsKey: () => void
  startQuiz: () => void
  saveAnswer: (answer: string) => void
  goToNext: () => void
  goToResult: () => void
  setEndTime: () => void
  goToReview: () => void
  goBackToEntry: () => void
}

export const useMainStore = create<MainStore>()((set) => ({
  stage: 'entry',
  questionsKey: '',
  questionIndex: 0,
  startTime: undefined,
  endTime: undefined,
  answers: [],
  setQuestionsKey: () => {
    set({ questionsKey: `${Date.now()}` })
  },
  goToNext: () => set((state) => ({ questionIndex: state.questionIndex + 1 })),
  goToResult: () => set({ stage: 'result' }),
  goBackToEntry: () =>
    set({
      stage: 'entry',
      startTime: undefined,
      endTime: undefined,
      answers: [],
    }),
  goToReview: () => set({ stage: 'review' }),
  setEndTime: () => set({ endTime: Date.now() }),
  saveAnswer: (answer) =>
    set((state) => {
      const newAnswers = [...state.answers]
      newAnswers.splice(state.questionIndex, 1, answer)
      return { answers: newAnswers }
    }),
  startQuiz: () =>
    set({
      stage: 'quiz',
      questionIndex: 0,
      startTime: Date.now(),
      answers: [],
    }),
}))
