'use client'

import { useMainStore } from '../stores/useMainStore'
import Entry from './entry'
import Quiz from './quiz'
import Result from './result'
import Review from './review'

const Main: React.FC = () => {
  const stage = useMainStore((state) => state.stage)

  return (
    <div className="relative w-full sm:w-[500px] bg-white/10 min-h-full flex-1 flex flex-col p-4">
      {stage === 'entry' ? <Entry /> : null}
      {stage === 'quiz' ? <Quiz /> : null}
      {stage === 'result' ? <Result /> : null}
      {stage === 'review' ? <Review /> : null}
    </div>
  )
}

export default Main
