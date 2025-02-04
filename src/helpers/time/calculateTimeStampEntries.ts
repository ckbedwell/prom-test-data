import { calculateTimeStampInterval } from "./calculateTimeStampInterval.ts"
import { CalculateTimeStampEntries } from "./time.types.ts"

export function calculateTimeStampEntries(args: CalculateTimeStampEntries) {
  const { start, end } = args

  if (start > end) {
    throw new Error(`Start time is greater than end time`)
  }

  const entries = Math.round((end - start) / args.interval) + 1

  return calculateTimeStampInterval({
    ...args,
    entries,
  })
}
