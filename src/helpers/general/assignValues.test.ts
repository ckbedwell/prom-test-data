import { describe, expect, test } from "vitest/dist/index.js"
import { assignTimestampsToValues, assignValues } from "./assignValues.ts"
import { testRandom } from "../../test/utils.ts"

// integration tests
describe(`assignValues`, () => {
  test(`should assign values to an object in the right order`, () => {
    const values = [1, 2, 3]
    const timestamps = [1000, 2000, 3000]
    const expected = [
      { timestamp: 1000, value: 1 },
      { timestamp: 2000, value: 2 },
      { timestamp: 3000, value: 3 },
    ]

    const result = assignValues(values, timestamps)
    expect(result).toEqual(expected)
  })

  testRandom(`should assign random values`, () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
    const expected = [
      { timestamp: 1000, value: 1 },
      { timestamp: 2000, value: 2 },
      { timestamp: 3000, value: 3 },
      { timestamp: 4000, value: 4 },
      { timestamp: 5000, value: 5 },
      { timestamp: 6000, value: 6 },
      { timestamp: 7000, value: 7 },
      { timestamp: 8000, value: 8 },
      { timestamp: 9000, value: 9 },
      { timestamp: 10000, value: 10 },
    ]

    const result = assignValues(values, timestamps, { randomize: true })
    expect(result).not.toEqual(expected)
  })
})

describe(`assignTimestampsToValues`, () => {
  test(`should assign timestamps to values`, () => {
    const values = [1, 2, 3]
    const timestamps = [1000, 2000, 3000]
    const expected = [
      { timestamp: 1000, value: 1 },
      { timestamp: 2000, value: 2 },
      { timestamp: 3000, value: 3 },
    ]

    const result = assignTimestampsToValues(timestamps, values)
    expect(result).toEqual(expected)
  })

  test(`should drop samples when using indices`, () => {
    const values = [1, 2, 3, 4, 5, 6]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000]
    const indices = [1, 3]
    const expected = [
      { timestamp: 1000, value: 1 },
      { timestamp: 3000, value: 3 },
      { timestamp: 5000, value: 5 },
      { timestamp: 6000, value: 6 },
    ]

    const result = assignTimestampsToValues(timestamps, values, { indices })
    expect(result).toEqual(expected)
  })

  test(`should drop samples when using time ranges`, () => {
    const values = [1, 2, 3, 4, 5, 6]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000]
    const timestampsToDrop = [2000, 4000]
    const expected = [
      { timestamp: 1000, value: 1 },
      { timestamp: 3000, value: 3 },
      { timestamp: 5000, value: 5 },
      { timestamp: 6000, value: 6 },
    ]

    const result = assignTimestampsToValues(timestamps, values, { timestamps: timestampsToDrop })
    expect(result).toEqual(expected)
  })

  test(`should drop samples when using both indices and time ranges`, () => {
    const values = [1, 2, 3, 4, 5, 6]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000]
    const indices = [0, 2] // 2 has the same index as a timestamp that will be dropped
    const timestampsToDrop = [[3000, 4000]]
    const expected = [
      { timestamp: 2000, value: 2 },
      { timestamp: 5000, value: 5 },
      { timestamp: 6000, value: 6 },
    ]

    const result = assignTimestampsToValues(timestamps, values, { indices, timestamps: timestampsToDrop })
    expect(result).toEqual(expected)
  })

  test(`should drop samples randomly`, () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
    const randomChance = 0.5

    const result = assignTimestampsToValues(timestamps, values, { randomChance })
    expect(result.length).toBeLessThan(values.length)
  })


  test(`should drop all samples when randomChance is 1`, () => {
    const values = [1, 2, 3, 4, 5, 6]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000]
    const randomChance = 1

    const result = assignTimestampsToValues(timestamps, values, { randomChance })
    expect(result).toStrictEqual([])
  })

  test(`should drop no samples when randomChance is 0`, () => {
    const values = [1, 2, 3, 4, 5, 6]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000]
    const randomChance = 0

    const result = assignTimestampsToValues(timestamps, values, { randomChance })
    expect(result).toStrictEqual([
      { timestamp: 1000, value: 1 },
      { timestamp: 2000, value: 2 },
      { timestamp: 3000, value: 3 },
      { timestamp: 4000, value: 4 },
      { timestamp: 5000, value: 5 },
      { timestamp: 6000, value: 6 },
    ])
  })

  // we add a retry because it is likely that the test will fail due to the random nature of the test
  testRandom(`should drop samples when using randomChance and indices`, { retry: 3 }, () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const timestamps = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
    const indices = [0, 2]
    const randomChance = 0.5

    const result = assignTimestampsToValues(timestamps, values, { indices, randomChance })
    expect(result.length).toBeLessThan(values.length - 2)
  })
})
