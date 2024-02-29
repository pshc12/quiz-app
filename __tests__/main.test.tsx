import '@testing-library/jest-dom'
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import Main from '@/app/components/main'
import { useMainStore } from '@/app/stores/useMainStore'
import { getWrongAnswers, useReviewStore } from '@/app/stores/useReviewStore'
import dayjs from 'dayjs'
import { mockQuestionsApiOnce, createWrapper } from '../test-utils'
import { questionsData } from '../__mocks__/api-data'

describe('Main', () => {
  it('renders Entry', () => {
    render(<Main />, { wrapper: createWrapper() })

    const title = screen.getByText(/퀴즈 과제/)
    expect(title).toBeInTheDocument()
  })

  it('goes to Quiz on start button click', async () => {
    mockQuestionsApiOnce()
    render(<Main />, { wrapper: createWrapper() })

    await waitFor(() => {
      const button = screen.getByRole('button', { name: '퀴즈 풀기' })

      fireEvent.click(button)

      const firstQ = screen.getByText(/Q#1/)
      expect(firstQ).toBeInTheDocument()
    })
  })

  it('renders Result after finishing Quiz', async () => {
    mockQuestionsApiOnce()
    render(<Main />, { wrapper: createWrapper() })

    await waitFor(() => {
      const button = screen.getByRole('button', { name: '퀴즈 풀기' })

      fireEvent.click(button)

      const firstQ = screen.getByText(/Q#1/)
      expect(firstQ).toBeInTheDocument()
    })

    renderHook(() => {
      const saveAnswer = useMainStore((state) => state.saveAnswer)
      const goToNext = useMainStore((state) => state.goToNext)

      questionsData.forEach((item, i) => {
        saveAnswer(item.incorrect_answers[0])
        if (i < 9) {
          goToNext()
        }
      })
    })

    const result = screen.getByRole('button', { name: /결과/ })
    fireEvent.click(result)

    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: '퀴즈 결과' })
      expect(heading).toBeInTheDocument()
    })
  })

  it('goes back to Entry from Review', async () => {
    mockQuestionsApiOnce()
    render(<Main />, { wrapper: createWrapper() })

    renderHook(() => {
      const addReviewData = useReviewStore((state) => state.addData)

      addReviewData({
        endTime: dayjs('2024-02-29T11:00:00+09:00').format(
          'YYYY.MM.DD HH:mm:ss',
        ),
        wrongAnswers: getWrongAnswers(
          questionsData,
          questionsData.map((item, i) =>
            i ? item.incorrect_answers[0] : item.correct_answer,
          ),
        ),
      })
    })

    const button = screen.getByRole('button', { name: '오답 노트' })
    fireEvent.click(button)

    await waitFor(() => {
      const back = screen.getByRole('button', { name: /뒤로가기/ })
      fireEvent.click(back)
    })

    await waitFor(() => {
      const title = screen.getByText(/퀴즈 과제/)
      expect(title).toBeInTheDocument()
    })
  })

  it('goes back to Result from Review if from Result', async () => {
    mockQuestionsApiOnce()
    render(<Main />, { wrapper: createWrapper() })

    await waitFor(() => {
      const button = screen.getByRole('button', { name: '퀴즈 풀기' })

      fireEvent.click(button)

      const firstQ = screen.getByText(/Q#1/)
      expect(firstQ).toBeInTheDocument()
    })

    renderHook(() => {
      const addReviewData = useReviewStore((state) => state.addData)

      const saveAnswer = useMainStore((state) => state.saveAnswer)
      const goToNext = useMainStore((state) => state.goToNext)

      questionsData.forEach((item, i) => {
        saveAnswer(item.incorrect_answers[0])
        if (i < 9) {
          goToNext()
        }
      })
      addReviewData({
        endTime: dayjs('2024-02-29T11:00:00+09:00').format(
          'YYYY.MM.DD HH:mm:ss',
        ),
        wrongAnswers: getWrongAnswers(
          questionsData,
          questionsData.map((item, i) =>
            i ? item.incorrect_answers[0] : item.correct_answer,
          ),
        ),
      })
    })

    const result = screen.getByRole('button', { name: /결과/ })
    fireEvent.click(result)

    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: '퀴즈 결과' })
      expect(heading).toBeInTheDocument()
    })

    const button = screen.getByRole('button', { name: '오답 노트' })
    fireEvent.click(button)

    await waitFor(() => {
      const back = screen.getByRole('button', { name: /뒤로가기/ })
      fireEvent.click(back)
    })

    await waitFor(() => {
      const title = screen.getByText(/퀴즈 결과/)
      expect(title).toBeInTheDocument()
    })
  })
})
