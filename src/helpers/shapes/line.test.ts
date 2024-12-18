import { expect, test, describe } from "vitest"
import { line } from "./line.ts"

describe(`line`, () => {
  describe(`increase`, () => {
    test(`4 entries | linear growth`, () => {
      const expected = [1, 2, 3, 4]
      const result = line({
        entries: 4,
        range: [1, 4],
      })
      expect(result).toEqual(expected)
    })

    test(`4 entries | linear growth | range 10-20`, () => {
      const expected = [10, 13, 17, 20]
      const result = line({
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
        entries: 5,
        range: [100, 0],
      })

      expect(result).toEqual(expected)
    })
  })
})
