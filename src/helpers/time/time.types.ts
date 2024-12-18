export interface CalculateTimeStampEntries {
  end: number
  interval: number
  start: number
}

export interface CalculateTimestampInterval {
  end: number
  entries: number
  start: number
}

export interface FillTimeStampFromStart {
  entries: number
  interval: number
  start: number
}

export interface FillTimeStampToEnd {
  end: number
  entries: number
  interval: number
}
