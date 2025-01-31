import { describe, expect, test } from "vitest"
import { bellCurve } from "./bellCurve.ts"

describe(`bellcurve`, () => {
  test(`standard curve`, () => {
    const expected = [10, 10, 26, 55, 86, 100, 86, 55, 26, 10, 10]
    const result = bellCurve({
      type: `bellCurve`,
      entries: 11,
      range: [10, 100],
      attrs: {
        curvePeakAt: 50,
        normalizeAt: 90,
      },
    })

    expect(result).toEqual(expected)
  })

  test(`10 entries | 10 - 100 | peak 50 | normalize 50`, () => {
    const expected = [10, 10, 20, 49, 84, 100, 69, 33, 14, 10]
    const result = bellCurve({
      type: `bellCurve`,
      entries: 10,
      range: [10, 100],
      attrs: {
        curvePeakAt: 50,
        normalizeAt: 50,
      },
    })

    expect(result).toEqual(expected)
  })

  test(`10 entries | 10 - 100 | peak 10 | normalize 50`, () => {
    const expected = [84, 100, 84, 49, 20, 10, 10, 10, 10, 10]
    const result = bellCurve({
      type: `bellCurve`,
      entries: 10,
      range: [10, 100],
      attrs: {
        curvePeakAt: 10,
        normalizeAt: 50,
      },
    })

    expect(result).toEqual(expected)
  })

  test(`10 entries | 10 - 100 | peak 10 | normalize 90`, () => {
    const expected = [61, 73, 84, 92, 98, 100, 98, 92, 84, 73]
    const result = bellCurve({
      type: `bellCurve`,
      entries: 10,
      range: [10, 100],
      attrs: {
        curvePeakAt: 50,
        normalizeAt: 100,
        stdDevFactor: 2,
      },
    })

    expect(result).toEqual(expected)
  })
})
