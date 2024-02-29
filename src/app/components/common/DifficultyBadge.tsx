import { QuestionDifficulty } from '@/app/hooks/useQuestionsQuery'
import { useMainStore } from '@/app/stores/useMainStore'

const classMap = {
  easy: 'bg-emerald-600/70',
  medium: 'bg-amber-600/70',
  hard: 'bg-rose-600/70',
}

const DifficultyBadge = ({
  difficulty,
}: {
  difficulty: QuestionDifficulty
}) => {
  const goToReview = useMainStore((state) => state.goToReview)

  return (
    <button
      type="button"
      className={`rounded-md h-5 px-1.5 text-sm ${classMap[difficulty]}`}
      onClick={() => goToReview()}
    >
      {difficulty}
    </button>
  )
}

export default DifficultyBadge
