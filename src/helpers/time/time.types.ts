export interface RandomOffsets {
  maxOffset: number
  blipLiklihood: number // 0 - 1
}

export interface CalculateTimeStampEntries {
  end: number
  interval: number
  start: number
  random?: RandomOffsets
}

export interface CalculateTimestampInterval {
  end: number
  entries: number
  start: number
  random?: RandomOffsets
}

export interface FillTimeStampFromStart {
  entries: number
  interval: number
  start: number
  random?: RandomOffsets
}

export interface FillTimeStampToEnd {
  end: number
  entries: number
  interval: number
  random?: RandomOffsets
}
