import dayjs from 'dayjs'

export const formatTime = (hour: number, minute: number, second: number) => {
  return `${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`
}

export const diffAndFormatTime = (startTime?: number, endTime?: number) => {
  if (!startTime || !endTime) {
    return ''
  }
  const startDt = dayjs(startTime)
  const endDt = dayjs(endTime)
  const hoursTaken = endDt.diff(startDt, 'hour')
  const minutesTaken = endDt.diff(startDt, 'minute')
  const secondsTaken = endDt.diff(startDt, 'second')

  const minuteRem = minutesTaken % 60
  const secondRem = secondsTaken - minutesTaken * 60
  return formatTime(hoursTaken, minuteRem, secondRem)
}
