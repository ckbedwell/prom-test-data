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

    expect(res).toEqual([
      // line
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      // curve
      90,
      68,
      51,
      38,
      28,
      21,
      16,
      12,
      10,
      10,
      // bellCurve
      10,
      10,
      20,
      49,
      84,
      100,
      84,
      49,
      20,
      10
    ])
  })
})
