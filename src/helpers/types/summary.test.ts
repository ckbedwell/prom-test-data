import { expect, test, describe } from "vitest"
import { summary } from "./summary.ts"

describe(`summary`, () => {
  describe(`count should increment per entry`, () => {
    const EXPECTED_COUNT = [
      { timestamp: 1, value: 1 },
      { timestamp: 2, value: 2 },
      { timestamp: 3, value: 3 },
    ]

    test("three random entries", () => {
      const result = summary([
        { timestamp: 1, value: 1 },
        { timestamp: 2, value: 0 },
        { timestamp: 3, value: 0 },
      ])

      expect(result.count).toEqual(EXPECTED_COUNT)
    })

    test(`three negative entries`, () => {
      const result = summary([
        { timestamp: 1, value: -1 },
        { timestamp: 2, value: -1 },
        { timestamp: 3, value: -1 },
      ])

      expect(result.count).toEqual(EXPECTED_COUNT)
    })

    test(`three positive entries`, () => {
      const result = summary([
        { timestamp: 1, value: 1 },
        { timestamp: 2, value: 2 },
        { timestamp: 3, value: 3 },
      ])

      expect(result.count).toEqual(EXPECTED_COUNT)
    })
  })

  describe(`sum should accumulate values`, () => {
    test(`three random entries`, () => {
      const result = summary([
        { timestamp: 1, value: 1 },
        { timestamp: 2, value: 2 },
        { timestamp: 3, value: 3 },
      ])

      expect(result.sum).toEqual([
        { timestamp: 1, value: 1 },
        { timestamp: 2, value: 3 },
        { timestamp: 3, value: 6 },
      ])
    })

    test(`three negative entries`, () => {
      const result = summary([
        { timestamp: 1, value: -1 },
        { timestamp: 2, value: -1 },
        { timestamp: 3, value: -1 },
      ])

      expect(result.sum).toEqual([
        { timestamp: 1, value: -1 },
        { timestamp: 2, value: -2 },
        { timestamp: 3, value: -3 },
      ])
    })

    test(`three positive entries`, () => {
      const result = summary([
        { timestamp: 1, value: 1 },
        { timestamp: 2, value: 1 },
        { timestamp: 3, value: 1 },
      ])

      expect(result.sum).toEqual([
        { timestamp: 1, value: 1 },
        { timestamp: 2, value: 2 },
        { timestamp: 3, value: 3 },
      ])
    })
  })
})
