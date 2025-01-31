import { getRandomOffset } from "./getRandomOffset.ts"
import { CalculateTimestampInterval, RandomOffsets } from "./time.types.ts"

export function calculateTimeStampInterval(args: CalculateTimestampInterval) {
  const { start, end, entries, random } = args
  const interval = (end - start) / entries

  let res: number[] = []

  for (let i = 0; i < entries; i++) {
    const startingTime = i === 0 ? start : res[i - 1] + interval

    res.push(calculateEntry(startingTime, random))
  }

  return res
}

function calculateEntry(startingTime: number, randomOffset?: RandomOffsets) {
  return Math.round(startingTime + getRandomOffset(randomOffset))
}
