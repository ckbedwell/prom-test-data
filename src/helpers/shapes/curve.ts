import { Curve } from "./shapes.types.ts"

export function curve({ entries, range, attrs }: Curve) {
  const { rate } = attrs
  const [start, end] = range
  const result: number[] = []

  let value = start

  if (start <= end) {
    for (let i = 0; i < entries; i++) {
      result.push(Math.round(Math.min(value, end)))
      value *= 1 + rate
    }
  }

  if (start > end) {
    for (let i = 0; i < entries; i++) {
      result.push(Math.round(Math.max(value, end)))
      value *= 1 - rate
    }
  }

  return result
}
