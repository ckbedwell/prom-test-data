import { Shape } from "../shapes/shapes.types.ts"
import { Ran } from "./scenarios.types.ts"

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
      type: `line`,
      range: [1, 1],
      entries: successEntries,
    },
    {
      type: `line`,
      range: [0, 0],
      entries: failureEntries,
    },
  ]
}
