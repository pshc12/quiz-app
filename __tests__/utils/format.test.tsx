import { diffAndFormatTime, formatTime } from '@/utils/format'
import '@testing-library/jest-dom'
import dayjs from 'dayjs'

describe('formatTime', () => {
  it('pads zeros', () => {
    expect(formatTime(0, 0, 0)).toEqual('0:00:00')
    expect(formatTime(9, 9, 9)).toEqual('9:09:09')
    expect(formatTime(0, 10, 0)).toEqual('0:10:00')
    expect(formatTime(100, 59, 59)).toEqual('100:59:59')
  })
})

describe('diffAndFormatTime', () => {
  it('diffs and formats duration', () => {
    expect(
      diffAndFormatTime(
        +dayjs('2024-01-01T00:00:00Z'),
        +dayjs('2024-01-01T00:00:00Z'),
      ),
    ).toEqual(formatTime(0, 0, 0))
    expect(
      diffAndFormatTime(
        +dayjs('2024-01-01T00:00:00Z'),
        +dayjs('2024-01-01T01:01:30Z'),
      ),
    ).toEqual(formatTime(1, 1, 30))
    expect(
      diffAndFormatTime(
        +dayjs('2024-01-01T00:00:00Z'),
        +dayjs('2024-01-02T04:50:59Z'),
      ),
    ).toEqual(formatTime(28, 50, 59))
    expect(
      diffAndFormatTime(
        +dayjs('2024-01-01T00:00:00Z'),
        +dayjs('2024-01-01T01:00:03Z'),
      ),
    ).toEqual(formatTime(1, 0, 3))
  })
})
