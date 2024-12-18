import { FillTimeStampToEnd, FillTimeStampFromStart } from "./time.types.ts"

export function fillTimeStampEntriesToEnd(args: FillTimeStampToEnd) {
  const { end, interval, entries } = args

  return Array.from({ length: entries }, (_, i) => {
    return Math.round(end - i * interval)
  }).reverse()
}
