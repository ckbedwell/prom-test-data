import { describe, test, expect } from 'vitest'

import { getRandomOffset, shouldBlip } from './getRandomOffset.ts'
import { testRandom } from '../../test/utils.ts'


describe(`getRandomOffset`, () => {
  test(`returns 0 by default`, () => {
    expect(getRandomOffset()).toEqual(0)
  })

  testRandom(`can generate positive offsets`, () => {
    const OFFSET = 100
    const values = []

    for (var i = 0; i < 1000; i++) {
      values.push(getRandomOffset({
        maxOffset: OFFSET,
        blipLiklihood: 1,
      }))
    }

    expect(values.filter(value => value > 0).length).toBeGreaterThan(0)
  })

  testRandom(`can generate negative offsets`, () => {
    const OFFSET = 100
    const values = []

    for (var i = 0; i < 1000; i++) {
      values.push(getRandomOffset({
        maxOffset: OFFSET,
        blipLiklihood: 1,
      }))
    }

    expect(values.filter(value => value < 0).length).toBeGreaterThan(0)
  })

  test(`generates random offset`, () => {
    const OFFSET = 5000
    const set = new Set()

    for (var i = 0; i < 1000; i++) {
      set.add(getRandomOffset({
        maxOffset: OFFSET,
        blipLiklihood: 1,
      }))
    }

    expect(set.size).toBeGreaterThan(1)
  })
})

describe(`shouldBlip`, () => {
  testRandom(`always blips when set to 100`, () => {
    expect(shouldBlip(100)).toEqual(true)
  })

  testRandom(`never blips when set to 0`, () => {
    expect(shouldBlip(0)).toEqual(false)
  })
})

