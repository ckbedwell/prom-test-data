import { describe, expect, test } from "vitest/dist/index.js"
import { assignValues } from "./assignValues.ts"

describe(`assignValues`, () => {
  test(`should assign values to an object in the right order`, () => {
    const values = [1, 2, 3]
    const timestamps = [1, 2, 3]
    const expected = [
      { timestamp: 1, value: 1 },
      { timestamp: 2, value: 2 },
      { timestamp: 3, value: 3 },
    ]

    const result = assignValues(values, timestamps)
    expect(result).toEqual(expected)
  })

  test(`should assign random values`, () => {
    // because we are testing randomness, we need to run the test multiple times
    // the odds of it failing are very very very low but it is possible

    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const timestamps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const expected = [
      { timestamp: 1, value: 1 },
      { timestamp: 2, value: 2 },
      { timestamp: 3, value: 3 },
      { timestamp: 4, value: 4 },
      { timestamp: 5, value: 5 },
      { timestamp: 6, value: 6 },
      { timestamp: 7, value: 7 },
      { timestamp: 8, value: 8 },
      { timestamp: 9, value: 9 },
      { timestamp: 10, value: 10 },
    ]

    const attempts = 10

    for (let i = 1; i < attempts; i++) {
      const result = assignValues(values, timestamps, { randomize: true })

      try {
        expect(result).not.toEqual(expected)
        break
      } catch (e) {
        if (i === attempts) {
          throw e
        }
      }
    }
  })
})
