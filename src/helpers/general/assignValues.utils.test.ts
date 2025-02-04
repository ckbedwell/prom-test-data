import { describe, expect, test } from "vitest/dist/index.js"
import { isInRange, normalizeTimestamps, shuffle, unfurlIndices } from "./assignValues.utils.ts"

describe(`shuffle`, () => {
  test(`shuffle`, () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const shuffled = shuffle(values)

    expect(shuffled).not.toEqual(values)
  })
})

describe(`unfurlIndices`, () => {
  test(`should unfurl indices`, () => {
    const indices = [0, [2, 4], [11, 18], 26]
    const expected = [0, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 18, 26]

    const result = unfurlIndices(indices)
    expect(result).toEqual(expected)
  })
})

describe(`normalizeTimestamps`, () => {
  test(`should normalize timestamps`, () => {
    const timestamps = [1738663200000, [`Tue Feb 04 2025 11:00:00 GMT+0000 (Greenwich Mean Time)`, `2025-02-04T12:00:00`], 1738674000000]
    const expected = [1738663200000, [1738666800000, 1738670400000], 1738674000000]

    const result = normalizeTimestamps(timestamps)
    expect(result).toEqual(expected)
  })
})

describe(`isInRange`, () => {
  test(`should return true if value is in range`, () => {
    const range = [1, [3, 5], 8]

    expect(isInRange(1, range)).toEqual(true)
    expect(isInRange(2, range)).toEqual(false)
    expect(isInRange(3, range)).toEqual(true)
    expect(isInRange(4, range)).toEqual(true)
    expect(isInRange(5, range)).toEqual(true)
    expect(isInRange(6, range)).toEqual(false)
    expect(isInRange(7, range)).toEqual(false)
    expect(isInRange(8, range)).toEqual(true)
    expect(isInRange(9, range)).toEqual(false)
  })
})