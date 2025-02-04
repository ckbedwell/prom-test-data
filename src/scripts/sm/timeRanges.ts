import { EntryLessTime } from '../../helpers/samples/sampleFromShapes.ts'
import { ONE_MINUTE_IN_MS, ONE_MONTH_IN_MINUTES, ONE_SECOND_IN_MS, ONE_YEAR_IN_MINUTES } from '../../helpers/time/time.constants.ts'

const ENDING_DATE = new Date(`Tue Jan 20 2025 12:00:00`).getTime()

export interface TimeRange {
  time: EntryLessTime,
  entries: number,
  ref: string,
}

const TEN_MINUTES: TimeRange = {
  time: {
    end: ENDING_DATE,
    interval: ONE_SECOND_IN_MS * 15,
  },
  entries: 40,
  ref: `10m`
}

const THREE_HOURS: TimeRange = {
  time: {
    end: ENDING_DATE,
    interval: ONE_SECOND_IN_MS * 15,
  },
  entries: 720,
  ref: `3h`
}

const SIX_MONTHS: TimeRange = {
  time: {
    end: ENDING_DATE,
    interval: ONE_MINUTE_IN_MS,
  },
  entries: ONE_MONTH_IN_MINUTES * 6,
  ref: `6M`
}

const ONE_YEAR: TimeRange = {
  time: {
    end: ENDING_DATE,
    interval: ONE_MINUTE_IN_MS,
  },
  entries: ONE_YEAR_IN_MINUTES,
  ref: `1y`
}

export const TIME_RANGES = [
  TEN_MINUTES,
  THREE_HOURS,
  SIX_MONTHS,
  ONE_YEAR
]
