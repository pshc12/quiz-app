import { QUESTIONS_API_URL } from '@/app/hooks/useQuestionsQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { successfulApiData } from './__mocks__/api-data'

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  // eslint-disable-next-line react/display-name
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export const mockQuestionsApiOnce = () => {
  fetchMock.mockResponseOnce(async (req) => {
    if (req.url === QUESTIONS_API_URL) {
      return JSON.stringify(successfulApiData)
    }
    return '?'
  })
}

export const mockQuestionsApi = () => {
  fetchMock.mockResponse(async (req) => {
    if (req.url === QUESTIONS_API_URL) {
      return JSON.stringify(successfulApiData)
    }
    return '?'
  })
}
