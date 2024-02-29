import { Chart as ChartJS, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement)

interface Counts {
  correctCount: number
  wrongCount: number
}

const getData = ({ correctCount, wrongCount }: Counts) => ({
  labels: ['정답', '오답'],
  datasets: [
    {
      data: [correctCount, wrongCount],
      backgroundColor: ['rgba(0,150,0,0.4)', 'rgba(200,0,0,0.4)'],
      borderWidth: 2,
      borderColor: ['rgba(10,180,10,0.8)', 'rgba(230,10,10,0.8)'],
    },
  ],
})

interface Props extends Counts {}

const AnswerRatioChart: React.FC<Props> = (props) => {
  return <Doughnut data={getData(props)} width="200" />
}

export default AnswerRatioChart
