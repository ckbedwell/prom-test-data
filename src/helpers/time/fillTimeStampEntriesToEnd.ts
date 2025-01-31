import { getRandomOffset } from "./getRandomOffset.ts"
import { FillTimeStampToEnd, RandomOffsets } from "./time.types.ts"

export function fillTimeStampEntriesToEnd(args: FillTimeStampToEnd) {
  const { end, interval, entries, random } = args

  let res: number[] = []

  for (let i = 0; i < entries; i++) {
    const endTime = i === 0 ? end : res[i - 1] - interval

    res.push(calculateEntry(endTime, random))
  }

  return res.reverse()
}


function calculateEntry(startingTime: number, randomOffset?: RandomOffsets) {
  return Math.round(startingTime - getRandomOffset(randomOffset))
}
