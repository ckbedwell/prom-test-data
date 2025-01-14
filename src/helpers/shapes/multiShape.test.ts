import { describe, test } from "vitest"
import { multiShape } from "./multiShape.ts"

describe(`multiShape`, () => {
  test(`should return a flat set of values`, () => {
    const res = multiShape([
      {
        range: [10, 100],
        entries: 10,
      },
      {
        range: [90, 10],
        entries: 10,
        rate: 0.25,
      },
      {
        range: [10, 100],
        entries: 10,
        curvePeakAt: 50,
      },
    ])
  })
})
