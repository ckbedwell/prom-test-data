import { expect, test, describe } from "vitest"
import { line } from "./line.ts"

describe(`line`, () => {
  describe(`1 entry`, () => {
    test(`1 entry | range 0`, () => {
      const expected = [0]
      const result = line({
        type: `line`,
        entries: 1,
        range: [0, 0],
      })
      expect(result).toEqual(expected)
    })

    test(`1 entry | range 1`, () => {
      const expected = [1]
      const result = line({
        type: `line`,
        entries: 1,
        range: [1, 1],
      })
      expect(result).toEqual(expected)
    })
  })

  describe(`10 entries, same range`, () => {
    test(`10 entries | range 0-0`, () => {
      const expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const result = line({
        type: `line`,
        entries: 10,
        range: [0, 0],
      })
      expect(result).toEqual(expected)
    })

    test(`10 entries | range 1-1`, () => {
      const expected = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      const result = line({
        type: `line`,
        entries: 10,
        range: [1, 1],
      })
      expect(result).toEqual(expected)
    })
  })

  describe(`increase`, () => {
    test(`4 entries | linear growth`, () => {
      const expected = [1, 2, 3, 4]
      const result = line({
        type: `line`,
        entries: 4,
        range: [1, 4],
      })
      expect(result).toEqual(expected)
    })

    test(`4 entries | linear growth | range 10-20`, () => {
      const expected = [10, 13, 17, 20]
      const result = line({
        type: `line`,
        entries: 4,
        range: [10, 20],
      })
      expect(result).toEqual(expected)
    })
  })

  describe(`decrease`, () => {
    test(`4 entries | linear decrease`, () => {
      const expected = [100, 75, 50, 25, 0]
      const result = line({
        type: `line`,
        entries: 5,
        range: [100, 0],
      })

      expect(result).toEqual(expected)
    })
  })
})
