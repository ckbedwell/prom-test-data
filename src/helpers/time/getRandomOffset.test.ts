import { describe, test, expect } from 'vitest'

import { getRandomOffset, shouldBlip } from './getRandomOffset.ts'

const TEST_RUNS = 1000

describe(`getRandomOffset`, () => {
  test(`returns 0 by default`, () => {
    for (var i = 0; i < TEST_RUNS; i++) {
      expect(getRandomOffset()).toEqual(0)
    }
  })

  test(`never returns greater than the offset`, () => {
    const OFFSET = 100

    for (var i = 0; i < TEST_RUNS; i++) {
      expect(getRandomOffset({
        maxOffset: OFFSET,
        blipLikelyHood: 100,
      })).toBeLessThanOrEqual(OFFSET)
    }
  })

  test(`never returns negative lesser than the offset`, () => {
    const OFFSET = 100

    for (var i = 0; i < TEST_RUNS; i++) {
      expect(getRandomOffset({
        maxOffset: OFFSET,
        blipLikelyHood: 100,
      })).toBeGreaterThanOrEqual(-OFFSET)
    }
  })

  test(`generates random offset`, () => {
    const OFFSET = 5000
    const set = new Set()

    for (var i = 0; i < TEST_RUNS; i++) {
      set.add(getRandomOffset({
        maxOffset: OFFSET,
        blipLikelyHood: 100,
      }))
    }

    expect(set.size).toBeGreaterThan(1)
  })
})

describe(`shouldBlip`, () => {
  test(`always blips when set to 100`, () => {
    for (var i = 0; i < TEST_RUNS; i++) {
      expect(shouldBlip(100)).toEqual(true)
    }
  })

  test(`never blips when set to 0`, () => {
    for (var i = 0; i < TEST_RUNS; i++) {
      expect(shouldBlip(0)).toEqual(false)
    }
  })
})

