import { FillTimeStampFromStart } from "./time.types.ts"

export function fillTimeStampEntriesFromStart(args: FillTimeStampFromStart) {
  const { start, interval, entries } = args

  return Array.from({ length: entries }, (_, i) => {
    return Math.round(start + i * interval)
  })
}
