import { describe, expect, test } from "vitest"
import { multiShape } from "./multiShape.ts"

describe(`multiShape`, () => {
  test(`should return a flat set of values`, () => {
    const res = multiShape([
      {
        type: `line`,
        range: [10, 100],
        entries: 10,
      },
      {
        type: `curve`,
        range: [90, 10],
        entries: 10,
        attrs: {
          rate: 0.25,
        },
      },
      {
        type: `bellCurve`,
        range: [10, 100],
        entries: 10,
        attrs: {
          curvePeakAt: 50,
        },
      },
    ])

    expect(res).toEqual([])
  })
})
