import '@testing-library/jest-dom'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import Result from '@/app/components/result'
import useQuestionsQuery from '@/app/hooks/useQuestionsQuery'
import { useMainStore } from '@/app/stores/useMainStore'
import { questionsData } from '../__mocks__/api-data'
import { createWrapper, mockQuestionsApi } from '../test-utils'

const wrapper = createWrapper()

describe('Result', () => {
  beforeEach(async () => {
    mockQuestionsApi()
    renderHook(() => {
      const setQuestionsKey = useMainStore((state) => state.setQuestionsKey)
      setQuestionsKey()
    })

    const { result } = renderHook(() => useQuestionsQuery(), {
      wrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    renderHook(() => {
      const saveAnswer = useMainStore((state) => state.saveAnswer)
      const goToNext = useMainStore((state) => state.goToNext)
      const setEndTime = useMainStore((state) => state.setEndTime)

      questionsData.forEach((item, i) => {
        saveAnswer(item.incorrect_answers[0])
        if (i < 9) {
          goToNext()
        } else {
          setEndTime()
        }
      })
    })
  })

  it('renders restart, review buttons', async () => {
    render(<Result />, { wrapper })

    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: '퀴즈 결과' })
      expect(heading).toBeInTheDocument()
    })

    const restart = screen.getByRole('button', { name: /다시/ })
    const wrong = screen.getByText(/오답\D*10/)
    const correct = screen.getByText(/정답\D*0/)
    const review = screen.getByRole('button', { name: /오답 노트/ })

    expect(restart).toBeInTheDocument()
    expect(wrong).toBeInTheDocument()
    expect(correct).toBeInTheDocument()
    expect(review).toBeInTheDocument()
  })
})
