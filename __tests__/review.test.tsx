import '@testing-library/jest-dom'
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import Review from '@/app/components/review'
import dayjs from 'dayjs'
import { getWrongAnswers, useReviewStore } from '@/app/stores/useReviewStore'
import { createWrapper } from '../test-utils'
import { questionsData } from '../__mocks__/api-data'

const wrapper = createWrapper()

describe('Review', () => {
  beforeEach(async () => {
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
      addReviewData({
        endTime: dayjs('2024-02-29T13:59:59+09:00').format(
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
  })

  it('renders review questions and buttons', async () => {
    render(<Review />, { wrapper })

    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: '오답 노트' })
      expect(heading).toBeInTheDocument()
    })

    const back = screen.getByRole('button', { name: '뒤로가기' })
    const clear = screen.getByRole('button', { name: '기록 삭제' })

    expect(back).toBeInTheDocument()
    expect(clear).toBeInTheDocument()

    const listitem = screen.getByRole('listitem', {
      name: '2024.02.29 11:00:00',
    })
    const listitem2 = screen.getByRole('listitem', {
      name: '2024.02.29 13:59:59',
    })
    expect(listitem).toBeInTheDocument()
    expect(listitem2).toBeInTheDocument()

    const questions = within(listitem).getAllByRole('listitem')
    expect(questions).toHaveLength(9)
  })

  it('deletes all on clear', async () => {
    render(<Review />, { wrapper })

    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: '오답 노트' })
      expect(heading).toBeInTheDocument()
    })

    const listitem = screen.getByRole('listitem', {
      name: '2024.02.29 11:00:00',
    })
    const listitem2 = screen.getByRole('listitem', {
      name: '2024.02.29 13:59:59',
    })
    expect(listitem).toBeInTheDocument()
    expect(listitem2).toBeInTheDocument()

    const clear = screen.getByRole('button', { name: '기록 삭제' })
    fireEvent.click(clear)

    await waitFor(() => {
      const deleted = screen.queryByRole('listitem', {
        name: '2024.02.29 11:00:00',
      })
      expect(deleted).not.toBeInTheDocument()
    })
    const deleted2 = screen.queryByRole('listitem', {
      name: '2024.02.29 13:59:59',
    })
    expect(deleted2).not.toBeInTheDocument()
  })
})
