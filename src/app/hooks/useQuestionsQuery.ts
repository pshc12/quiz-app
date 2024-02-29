import { useQuery } from '@tanstack/react-query'
import { useMainStore } from '../stores/useMainStore'

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export const QUESTIONS_API_URL =
  'https://opentdb.com/api.php?amount=10&category=18&type=multiple&encode=url3986'

export type Question = {
  type: 'multiple'
  category: string
  question: string
  difficulty: QuestionDifficulty
  correct_answer: string
  incorrect_answers: string[]
}

export interface QuestionsResponse {
  response_code: number
  results: Question[]
}

export const decodeQuestions = (results: Question[]) => {
  return results.map(
    (item) =>
      Object.fromEntries(
        Object.entries(item).map(([k, v]) => [
          k,
          v.constructor === Array // incorrect_answers
            ? v.map((iv: string) => decodeURIComponent(iv))
            : decodeURIComponent(`${v}`),
        ]),
      ) as unknown as Question,
  )
}

const getQuestions = async (): Promise<Question[]> => {
  const res = await fetch(QUESTIONS_API_URL)
  const resBody = (await res.json()) as QuestionsResponse
  if (resBody.response_code > 0) {
    throw new Error('Api Error')
  }

  return decodeQuestions(resBody.results)
}

const useQuestionsQuery = () => {
  const questionsKey = useMainStore((state) => state.questionsKey)

  const query = useQuery<Question[]>({
    queryKey: ['questions', questionsKey],
    queryFn: getQuestions,
    enabled: !!questionsKey,
    staleTime: Infinity,
  })

  return query
}

export default useQuestionsQuery
