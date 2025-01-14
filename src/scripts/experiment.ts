import { bellCurve } from "../helpers/shapes/bellCurve.ts"

console.log(
  JSON.stringify(
    bellCurve({
      range: [1, 240],
      entries: 600,
      curvePeakAt: 90,
      normalizeAt: 90,
    }),
    null,
    2
  )
)

// write result to file
