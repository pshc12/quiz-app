import { useMainStore } from '@/app/stores/useMainStore'

const ReviewButton = () => {
  const goToReview = useMainStore((state) => state.goToReview)

  return (
    <button
      type="button"
      className="mb-8 transition hover:bg-white/10 active:bg-white/10 rounded-full h-10 px-6"
      onClick={() => goToReview()}
    >
      오답 노트
    </button>
  )
}

export default ReviewButton
