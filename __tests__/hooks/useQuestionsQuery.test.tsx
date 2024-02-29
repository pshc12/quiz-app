import '@testing-library/jest-dom'
import useQuestionsQuery, {
  QUESTIONS_API_URL,
  decodeQuestions,
} from '@/app/hooks/useQuestionsQuery'
import { renderHook, waitFor } from '@testing-library/react'
import { useMainStore } from '@/app/stores/useMainStore'
import { questionsData, successfulApiData } from '../../__mocks__/api-data'
import { createWrapper } from '../../test-utils'

describe('decodeQuestions', () => {
  it('decodes uri encoded questions', async () => {
    expect(decodeQuestions(successfulApiData.results)).toEqual(questionsData)
  })

  it('decodes array values', async () => {
    const example = [
      {
        ...successfulApiData.results[0],
        incorrect_answers: ['%20', '%20%20', '%20%20%20'],
      },
    ]

    expect(decodeQuestions(example)[0].incorrect_answers).toEqual([
      ' ',
      '  ',
      '   ',
    ])
  })
})

describe('useQuestionsQuery', () => {
  it('renders isPending', async () => {
    fetchMock.mockResponseOnce(async (req) => {
      if (req.url === QUESTIONS_API_URL) {
        return JSON.stringify(successfulApiData)
      }
      return '?'
    })

    const { result } = renderHook(() => useQuestionsQuery(), {
      wrapper: createWrapper(),
    })

    return expect(result.current.isPending).toBe(true)
  })

  it('renders isSuccess on questionKey set', async () => {
    fetchMock.mockResponseOnce(async (req) => {
      if (req.url === QUESTIONS_API_URL) {
        return JSON.stringify(successfulApiData)
      }
      return '?'
    })

    renderHook(() => {
      const setQuestionsKey = useMainStore((state) => state.setQuestionsKey)
      setQuestionsKey()
    })

    const { result } = renderHook(() => useQuestionsQuery(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data?.length).toEqual(10)
  })

  it('renders isError on api error', async () => {
    fetchMock.mockRejectOnce()

    renderHook(() => {
      const setQuestionsKey = useMainStore((state) => state.setQuestionsKey)
      setQuestionsKey()
    })

    const { result } = renderHook(() => useQuestionsQuery(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })
})
