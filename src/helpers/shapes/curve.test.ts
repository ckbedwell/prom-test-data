import { expect, test, describe } from "vitest"
import { curve } from "./curve.ts"

describe(`curve`, () => {
  describe(`increase`, () => {
    test(`4 entries | 100% growth rate`, () => {
      const expected = [1, 2, 4, 8]

      const result = curve({
        entries: 4,
        rate: 1,
        range: [1, 8],
      })
      expect(result).toEqual(expected)
    })

    test(`4 entries | 50% growth rate | range 10-20`, () => {
      const expected = [10, 15, 20, 20]
      const result = curve({
        entries: 4,
        rate: 0.5,
        range: [10, 20],
      })
      expect(result).toEqual(expected)
    })

    test(`10 entries | 50% growth rate | range 10-20`, () => {
      const expected = [10, 15, 20, 20, 20, 20, 20, 20, 20, 20]
      const result = curve({
        entries: 10,
        rate: 0.5,
        range: [10, 20],
      })

      expect(result).toEqual(expected)
    })

    test(`10 entries | 50% growth rate | range 10-Infinity`, () => {
      const expected = [10, 15, 23, 34, 51, 76, 114, 171, 256, 384]
      const result = curve({
        entries: 10,
        rate: 0.5,
        range: [10, Infinity],
      })

      expect(result).toEqual(expected)
    })
  })

  describe(`decrease`, () => {
    test(`4 entries | 50% decrease rate`, () => {
      const expected = [100, 50, 25, 13]

      const result = curve({
        entries: 4,
        rate: 0.5,
        range: [100, 13],
      })
      expect(result).toEqual(expected)
    })
  })
})
