import { Shape } from "../shapes/shapes.types.ts"

type Ran<T extends number> = number extends T ? number : _Range<T, []>
type _Range<T extends number, R extends unknown[]> = R["length"] extends T
  ? R[number] | T
  : _Range<T, [R["length"], ...R]>

export function percentSuccess({
  percentage,
  entries,
}: {
  percentage: Ran<100>
  entries: number
}): Shape[] {
  const successEntries = Math.floor((percentage / 100) * entries)
  const failureEntries = entries - successEntries

  return [
    {
      range: [1, 1],
      entries: successEntries,
    },
    {
      range: [0, 0],
      entries: failureEntries,
    },
  ]
}
