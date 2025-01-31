import { expect, test, describe } from "vitest"
import { calculateSplits } from "./scenarios.utils.ts"

describe("calculateSplits", () => {
  test("splits evenly", () => {
    expect(calculateSplits(9, 3)).toEqual([3, 3, 3])
  })

  test("handles remainder of 1", () => {
    expect(calculateSplits(10, 3)).toEqual([4, 3, 3])
  })

  test("handles remainder of 2", () => {
    expect(calculateSplits(11, 3)).toEqual([4, 4, 3])
  })

  test("handles single split", () => {
    expect(calculateSplits(5, 1)).toEqual([5])
  })

  test("handles splits larger than length", () => {
    expect(calculateSplits(3, 5)).toEqual([1, 1, 1])
  })
})
