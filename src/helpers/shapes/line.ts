import { Line } from "./shapes.types.ts"

export function line({ range, entries }: Line) {
  const [start, end] = range
  const result: number[] = []

  if (start <= end) {
    const step = (end - start) / (entries - 1)

    for (let i = 0; i < entries; i++) {
      result.push(Math.round(start + i * step))
    }
  }

  if (start > end) {
    const step = (start - end) / (entries - 1)

    for (let i = 0; i < entries; i++) {
      result.push(Math.round(start - i * step))
    }
  }

  return result
}
