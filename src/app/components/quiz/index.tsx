import useQuestionsQuery from '@/app/hooks/useQuestionsQuery'
import { useMainStore } from '@/app/stores/useMainStore'
import { getWrongAnswers, useReviewStore } from '@/app/stores/useReviewStore'
import dayjs from 'dayjs'
import DifficultyBadge from '../common/DifficultyBadge'
import { NextButton } from '../common/buttons'

const Quiz: React.FC = () => {
  const questionIndex = useMainStore((state) => state.questionIndex)
  const goToNext = useMainStore((state) => state.goToNext)
  const goToResult = useMainStore((state) => state.goToResult)
  const addReviewData = useReviewStore((state) => state.addData)
  const saveAnswer = useMainStore((state) => state.saveAnswer)
  const myAnswers = useMainStore((state) => state.answers)
  const endTime = useMainStore((state) => state.endTime)
  const setEndTime = useMainStore((state) => state.setEndTime)

  const { data } = useQuestionsQuery()

  if (!data) {
    return null
  }

  const isLastQuestion = questionIndex === data.length - 1

  const handleChoiceClick = (choice: string) => {
    saveAnswer(choice)
    if (isLastQuestion) {
      setEndTime()
    }
  }

  const handleResultClick = () => {
    addReviewData({
      endTime: dayjs(endTime!).format('YYYY.MM.DD HH:mm:ss'),
      wrongAnswers: getWrongAnswers(data, myAnswers),
    })
    goToResult()
  }

  const item = data[questionIndex]
  const choices = [...item.incorrect_answers, item.correct_answer].sort()
  const myAnswer = myAnswers[questionIndex]

  return (
    <div
      lang="en"
      className="flex flex-col items-center gap-4 w-full text-center"
    >
      <h1 className="text-lg mt-12 flex items-center gap-2">
        Q#{questionIndex + 1}
        <DifficultyBadge difficulty={item.difficulty} />
      </h1>

      <h2 className="min-h-[160px] text-2xl max-w-[300px] font-semibold leading-tight">
        {item.question}
      </h2>
      <ul className="text-left space-y-2">
        {choices.map((choice) => (
          <li key={choice} className="min-w-[200px]">
            {!myAnswer ? (
              <button
                type="button"
                className="w-full text-left px-4 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 active:outline active:outline-1 active:outline-white/60 transition"
                onClick={() => handleChoiceClick(choice)}
                disabled={!!myAnswer}
              >
                {choice}
              </button>
            ) : (
              <div
                className={`w-full text-left px-4 py-1.5 rounded-2xl bg-white/10 aria-[description=정답]:bg-green-600/70 aria-selected:bg-red-600/70 aria-selected:aria-[description=정답]:bg-emerald-600/70
                `}
                aria-selected={choice === myAnswer ? 'true' : 'false'}
                aria-description={
                  choice === item.correct_answer ? '정답' : undefined
                }
              >
                {choice}
              </div>
            )}
          </li>
        ))}
      </ul>

      {myAnswer && !isLastQuestion && (
        <NextButton onClick={goToNext}>다음</NextButton>
      )}
      {myAnswer && isLastQuestion && (
        <NextButton onClick={handleResultClick}>결과 보기</NextButton>
      )}
    </div>
  )
}

export default Quiz
