import { getRandomOffset } from "./getRandomOffset.ts"
import { CalculateTimestampInterval, RandomOffsets } from "./time.types.ts"

export function calculateTimeStampInterval(args: CalculateTimestampInterval) {
  const { start, end, entries: oEntries, random } = args
  const entries = oEntries - 1
  const interval = (end - start) / entries

  let res: number[] = []

  for (let i = 0; i < entries; i++) {
    const startingTime = i === 0 ? start : res[i - 1] + interval

    res.push(calculateEntry(startingTime, random))
  }

  return [...res, calculateEntry(end, random)]
}

function calculateEntry(startingTime: number, randomOffset?: RandomOffsets) {
  return Math.round(startingTime + getRandomOffset(randomOffset))
}
