import { Random } from "./shapes.types.ts"

export function random({ entries, range }: Random) {
  const [start, end] = range
  const result: number[] = []

  for (let i = 0; i < entries; i++) {
    result.push(Math.round(Math.random() * (end - start) + start))
  }

  return result
}
