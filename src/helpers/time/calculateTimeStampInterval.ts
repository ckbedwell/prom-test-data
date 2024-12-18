import { CalculateTimestampInterval } from "./time.types.ts"

export function calculateTimeStampInterval(args: CalculateTimestampInterval) {
  const { start, end } = args

  return Array.from({ length: args.entries }, (_, i) => {
    return Math.round(start + i * ((end - start) / args.entries))
  })
}
