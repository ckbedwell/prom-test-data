import { expect, test, describe } from "vitest"
import { percentSuccess } from "./percentSuccess.ts"

describe(`probe_success`, () => {
  test(`100% success`, () => {
    const expected = [
      {
        range: [1, 1],
        entries: 100,
      },
      {
        range: [0, 0],
        entries: 0,
      },
    ]

    const result = percentSuccess({ percentage: 100, entries: 100 })
    expect(result).toEqual(expected)
  })

  test(`99% success`, () => {
    const expected = [
      {
        range: [1, 1],
        entries: 99,
      },
      {
        range: [0, 0],
        entries: 1,
      },
    ]

    const result = percentSuccess({ percentage: 99, entries: 100 })
    expect(result).toEqual(expected)
  })

  test(`50% success`, () => {
    const expected = [
      {
        range: [1, 1],
        entries: 50,
      },
      {
        range: [0, 0],
        entries: 50,
      },
    ]

    const result = percentSuccess({ percentage: 50, entries: 100 })
    expect(result).toEqual(expected)
  })
})
