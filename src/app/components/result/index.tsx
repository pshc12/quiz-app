import useQuestionsQuery from '@/app/hooks/useQuestionsQuery'
import { useMainStore } from '@/app/stores/useMainStore'
import dynamic from 'next/dynamic'
import { diffAndFormatTime } from '@/utils/format'
import ReviewButton from '../common/ReviewButton'
import { RetryButton } from '../common/buttons'

const DynamicChart = dynamic(() => import('./AnswerRatioChart'), {
  loading: () => <div className="h-[200px] flex" />,
  ssr: false,
})

const Result: React.FC = () => {
  const goBackToEntry = useMainStore((state) => state.goBackToEntry)
  const myAnswers = useMainStore((state) => state.answers)
  const startTime = useMainStore((state) => state.startTime)
  const endTime = useMainStore((state) => state.endTime)
  const formattedDuration = diffAndFormatTime(startTime, endTime)

  const { data } = useQuestionsQuery()

  if (!data) {
    return null
  }

  const correctCount = data.reduce(
    (acc, currQ, i) => acc + Number(currQ.correct_answer === myAnswers[i]),
    0,
  )
  const wrongCount = data.length - correctCount

  return (
    <div className="flex-1 flex flex-col min-h-full items-center gap-4 w-full text-center">
      <h1 className="text-2xl font-bold mt-10">퀴즈 결과</h1>
      <div>
        <div>걸린 시간: {formattedDuration}</div>
        <div className="flex gap-8">
          <div>정답 수: {correctCount}</div>
          <div>오답 수: {wrongCount}</div>
        </div>
      </div>
      <div>
        <DynamicChart correctCount={correctCount} wrongCount={wrongCount} />
      </div>
      <RetryButton onClick={goBackToEntry} />
      <div className="mt-auto">
        <ReviewButton />
      </div>
    </div>
  )
}

export default Result
