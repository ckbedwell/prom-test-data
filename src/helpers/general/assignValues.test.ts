import { describe, expect, test } from "vitest/dist/index.js"
import { assignValues } from "./assignValues.ts"

describe(`assignValues`, () => {
  test(`should assign values to an object`, () => {
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
})
