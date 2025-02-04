import { describe, expect, test } from "vitest";
import { random } from "./random.ts";
import { testRandom } from "../../test/utils.ts";


describe(`random`, () => {
  testRandom(`should generate the correct amount of entries`, () => {
    const result = random({ type: `random`, entries: 5, range: [10, 100] })

    expect(result).toHaveLength(5)
    expect(result).toEqual(expect.arrayContaining([expect.any(Number)]))
  })

  testRandom(`should generate random numbers within the range`, () => {
    const result = random({ type: `random`, entries: 10, range: [10, 100] })

    result.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(10)
      expect(number).toBeLessThanOrEqual(100)
    })
  })

  testRandom(`should generate the same number when it has no range`, () => {
    const result = random({ type: `random`, entries: 10, range: [10, 10] })

    result.forEach((number) => {
      expect(number).toBe(10)
    })
  })
})

