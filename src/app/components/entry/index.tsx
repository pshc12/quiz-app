import useQuestionsQuery from '@/app/hooks/useQuestionsQuery'
import { useMainStore } from '@/app/stores/useMainStore'
import { useReviewStore } from '@/app/stores/useReviewStore'
import { HTMLAttributes, useEffect } from 'react'
import ReviewButton from '../common/ReviewButton'

interface ButtonProps
  extends Pick<HTMLAttributes<HTMLButtonElement>, 'onClick'> {}

const StartButton = ({ onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="rounded-full bg-pink-600 h-20 w-48 font-bold text-2xl text-white/80 hover:text-white/90 hover:shadow-glow hover:shadow-pink-700 hover:outline hover:outline-8 hover:outline-offset-4 hover:outline-pink-700/30 transition"
      onClick={onClick}
    >
      퀴즈 풀기
    </button>
  )
}

const Loading = () => {
  return (
    <ul
      className="flex gap-2 [&>li]:w-6 [&>li]:h-6 [&>li]:rounded-full [&>li]:bg-pink-600 [&>li]:shadow-glow-sm [&>li]:shadow-pink-700 [&>li]:animate-shrink"
      role="alert"
      aria-busy="true"
      aria-live="polite"
    >
      <li style={{ animationDelay: '-1.7s' }} />
      <li style={{ animationDelay: '-1.4s' }} />
      <li style={{ animationDelay: '-1.1s' }} />
      <li style={{ animationDelay: '-0.8s' }} />
      <li style={{ animationDelay: '-0.5s' }} />
    </ul>
  )
}

const Entry: React.FC = () => {
  const startQuiz = useMainStore((state) => state.startQuiz)
  const setQuestionsKey = useMainStore((state) => state.setQuestionsKey)
  const reviewData = useReviewStore((state) => state.data)

  const { status } = useQuestionsQuery()

  useEffect(() => {
    setQuestionsKey()
  }, [setQuestionsKey])

  return (
    <div className="flex flex-col min-h-full flex-1 items-center gap-10 w-full text-center relative">
      <h1 className="text-xl font-bold mt-20">클래스팅 프론트엔드 퀴즈 과제</h1>
      <div className="flex-1 flex items-center">
        {status === 'error' ? '오류가 발생했습니다. 다시 시도해주세요.' : null}
        {status === 'pending' ? <Loading /> : null}
        {status === 'success' ? <StartButton onClick={startQuiz} /> : null}
      </div>
      {reviewData.length > 0 && <ReviewButton />}
    </div>
  )
}

export default Entry
