import '@testing-library/jest-dom'
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import Quiz from '@/app/components/quiz'
import useQuestionsQuery from '@/app/hooks/useQuestionsQuery'
import { useMainStore } from '@/app/stores/useMainStore'
import { createWrapper, mockQuestionsApi } from '../test-utils'
import { questionsData } from '../__mocks__/api-data'

const wrapper = createWrapper()

describe('Quiz', () => {
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
  })

  it('renders first question', () => {
    render(<Quiz />, { wrapper })

    const el = screen.getByRole('heading', { level: 1, name: /Q#1/ })
    expect(el).toBeInTheDocument()

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const choices = within(list).getAllByRole('button')
    expect(choices).toHaveLength(4)
  })

  it('renders correct answer on correct answer', () => {
    render(<Quiz />, { wrapper })

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const choices = within(list).getAllByRole('button')

    const choiceTexts = [
      ...questionsData[0].incorrect_answers,
      questionsData[0].correct_answer,
    ].sort()

    const index = choiceTexts.findIndex(
      (v) => v === questionsData[0].correct_answer,
    )

    fireEvent.click(choices[index])

    const choice = within(list).getByText(choiceTexts[index])
    expect(choice).toHaveAccessibleDescription('정답')
    expect(choice).toHaveAttribute('aria-selected', 'true')
  })

  it('renders correct answer on wrong answer', () => {
    render(<Quiz />, { wrapper })

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const choices = within(list).getAllByRole('button')

    const choiceTexts = [
      ...questionsData[0].incorrect_answers,
      questionsData[0].correct_answer,
    ].sort()

    const index = choiceTexts.findIndex(
      (v) => v === questionsData[0].incorrect_answers[0],
    )

    fireEvent.click(choices[index])

    const choice = within(list).getByText(choiceTexts[index])
    expect(choice).not.toHaveAccessibleDescription('정답')
    expect(choice).toHaveAttribute('aria-selected', 'true')

    const correct = within(list).getByText(questionsData[0].correct_answer)
    expect(correct).toHaveAccessibleDescription('정답')
  })

  it('renders next button on answer', () => {
    render(<Quiz />, { wrapper })

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const choices = within(list).getAllByRole('button')
    fireEvent.click(choices[0])

    const next = screen.getByRole('button', { name: /다음/ })
    expect(next).toBeInTheDocument()
  })

  it('renders next question on next click', async () => {
    render(<Quiz />, { wrapper })

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const choices = within(list).getAllByRole('button')
    fireEvent.click(choices[0])

    const next = screen.getByRole('button', { name: /다음/ })
    fireEvent.click(next)

    const el = screen.getByRole('heading', { level: 1, name: /Q#2/ })
    expect(el).toBeInTheDocument()

    const next2 = screen.queryByRole('button', { name: /다음/ })
    expect(next2).not.toBeInTheDocument()
  })

  it('renders see result on last answer', async () => {
    render(<Quiz />, { wrapper })

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()

    let i = 0
    while (i < 9) {
      const choices = within(list).getAllByRole('button')
      fireEvent.click(choices[0])

      const next = screen.getByRole('button', { name: /다음/ })
      fireEvent.click(next)
      i += 1
    }

    const el = screen.getByRole('heading', { level: 1, name: /Q#10/ })
    expect(el).toBeInTheDocument()

    const choices = within(list).getAllByRole('button')
    fireEvent.click(choices[0])

    const next = screen.queryByRole('button', { name: /다음/ })
    expect(next).not.toBeInTheDocument()

    const result = screen.getByRole('button', { name: /결과/ })
    expect(result).toBeInTheDocument()
  })
})
