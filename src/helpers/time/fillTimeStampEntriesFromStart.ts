import { getRandomOffset } from "./getRandomOffset.ts"
import { FillTimeStampFromStart, RandomOffsets } from "./time.types.ts"

export function fillTimeStampEntriesFromStart(args: FillTimeStampFromStart) {
  const { start, interval, entries, random } = args

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
