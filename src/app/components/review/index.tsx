import { useMainStore } from '@/app/stores/useMainStore'
import { useReviewStore } from '@/app/stores/useReviewStore'
import useScrollVisibility from '@/app/hooks/useScrollVisibility'
import DifficultyBadge from '../common/DifficultyBadge'

const Review: React.FC = () => {
  const goBackToEntry = useMainStore((state) => state.goBackToEntry)
  const goToResult = useMainStore((state) => state.goToResult)
  const fromResult = !!useMainStore((state) => state.startTime)
  const reviewData = useReviewStore((state) => state.data)
  const clearData = useReviewStore((state) => state.clearData)

  const [showScroll, handleScrollToTop] = useScrollVisibility(500)

  const handleBackClick = () => {
    if (!fromResult) {
      goBackToEntry()
      return
    }
    goToResult()
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <div className="flex relative items-center w-full justify-center">
        <button
          type="button"
          className="absolute -left-3 p-3 rounded-md hover:bg-white/10 active:bg-white/10"
          onClick={handleBackClick}
        >
          뒤로가기
        </button>
        <h1 className="text-xl font-bold">오답 노트</h1>
        <button
          type="button"
          className="absolute -right-3 p-3 rounded-md hover:bg-white/10 active:bg-white/10"
          onClick={clearData}
        >
          기록 삭제
        </button>
      </div>
      <ol className="flex flex-col gap-8 -m-2">
        {reviewData.map(({ endTime, wrongAnswers }) => (
          <li key={endTime} aria-label={endTime}>
            <p className="text-sm ml-1 text-white/60">{endTime}</p>
            <ul className="mt-1 flex flex-col gap-4 bg-white/5 p-2 rounded-md">
              {wrongAnswers.map((item) => (
                <li key={item.question}>
                  <p>
                    {item.question}{' '}
                    <DifficultyBadge difficulty={item.difficulty} />
                  </p>
                  <p className="text-red-300 text-sm">내 답: {item.myAnswer}</p>
                  <p className="text-green-300 text-sm">
                    정답: {item.correctAnswer}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {showScroll && (
        <button
          type="button"
          className="text-sm fixed right-8 bottom-12 h-12 w-12 rounded-full border border-emerald-300 text-emerald-300 shadow-glow-sm shadow-emerald-400/30 bg-emerald-400/5"
          onClick={handleScrollToTop}
        >
          맨위로
        </button>
      )}
    </div>
  )
}

export default Review
