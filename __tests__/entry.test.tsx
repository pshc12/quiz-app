import '@testing-library/jest-dom'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import Entry from '@/app/components/entry'
import { getWrongAnswers, useReviewStore } from '@/app/stores/useReviewStore'
import dayjs from 'dayjs'
import { createWrapper, mockQuestionsApiOnce } from '../test-utils'
import { questionsData } from '../__mocks__/api-data'

describe('Entry', () => {
  it('renders loading', () => {
    render(<Entry />, { wrapper: createWrapper() })

    const loading = screen.getByRole('alert', { busy: true })

    expect(loading).toBeInTheDocument()
  })

  it('renders start button', async () => {
    mockQuestionsApiOnce()

    render(<Entry />, { wrapper: createWrapper() })

    await waitFor(() => {
      const button = screen.getByRole('button', { name: '퀴즈 풀기' })
      expect(button).toBeInTheDocument()
    })
  })

  it('renders error', async () => {
    fetchMock.mockRejectOnce()

    render(<Entry />, { wrapper: createWrapper() })

    await waitFor(() => {
      const text = screen.getByText(/오류/)
      expect(text).toBeInTheDocument()
      const button = screen.queryByRole('button', { name: '퀴즈 풀기' })
      expect(button).not.toBeInTheDocument()
    })
  })

  it('does not render review button if has no review data', async () => {
    mockQuestionsApiOnce()
    render(<Entry />, { wrapper: createWrapper() })

    const button = screen.queryByRole('button', { name: '오답 노트' })
    expect(button).not.toBeInTheDocument()
  })

  it('renders review button if has review data', async () => {
    mockQuestionsApiOnce()
    render(<Entry />, { wrapper: createWrapper() })

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
    expect(button).toBeInTheDocument()
  })
})
