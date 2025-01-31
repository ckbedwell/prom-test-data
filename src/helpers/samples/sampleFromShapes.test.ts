import { describe, expect, test } from "vitest"
import { ONE_HOUR_IN_MS } from "../time/time.constants.ts"
import { sampleFromShapes } from "./sampleFromShapes.ts"

describe(`single line entry`, () => {
  test(`should generate a sample when shapes have entries | end`, () => {
    const res = sampleFromShapes({
      shapes: [
        {
          type: `line`,
          range: [1, 24],
          entries: 24,
        },
      ],
      time: {
        end: new Date(`2024-01-02`).getTime(),
        interval: ONE_HOUR_IN_MS,
      },
    })

    expect(res).toEqual([
      { timestamp: 1704070800000, value: 1 },
      { timestamp: 1704074400000, value: 2 },
      { timestamp: 1704078000000, value: 3 },
      { timestamp: 1704081600000, value: 4 },
      { timestamp: 1704085200000, value: 5 },
      { timestamp: 1704088800000, value: 6 },
      { timestamp: 1704092400000, value: 7 },
      { timestamp: 1704096000000, value: 8 },
      { timestamp: 1704099600000, value: 9 },
      { timestamp: 1704103200000, value: 10 },
      { timestamp: 1704106800000, value: 11 },
      { timestamp: 1704110400000, value: 12 },
      { timestamp: 1704114000000, value: 13 },
      { timestamp: 1704117600000, value: 14 },
      { timestamp: 1704121200000, value: 15 },
      { timestamp: 1704124800000, value: 16 },
      { timestamp: 1704128400000, value: 17 },
      { timestamp: 1704132000000, value: 18 },
      { timestamp: 1704135600000, value: 19 },
      { timestamp: 1704139200000, value: 20 },
      { timestamp: 1704142800000, value: 21 },
      { timestamp: 1704146400000, value: 22 },
      { timestamp: 1704150000000, value: 23 },
      { timestamp: 1704153600000, value: 24 },
    ])
  })

  test(`should generate a sample when shapes have entries | start`, () => {
    const res = sampleFromShapes({
      shapes: [
        {
          type: `line`,
          range: [1, 24],
          entries: 24,
        },
      ],
      time: {
        start: new Date(`2024-01-02`).getTime(),
        end: new Date(`2024-01-03`).getTime(),
      },
    })

    expect(res).toEqual([
      { timestamp: 1704153600000, value: 1 },
      { timestamp: 1704157200000, value: 2 },
      { timestamp: 1704160800000, value: 3 },
      { timestamp: 1704164400000, value: 4 },
      { timestamp: 1704168000000, value: 5 },
      { timestamp: 1704171600000, value: 6 },
      { timestamp: 1704175200000, value: 7 },
      { timestamp: 1704178800000, value: 8 },
      { timestamp: 1704182400000, value: 9 },
      { timestamp: 1704186000000, value: 10 },
      { timestamp: 1704189600000, value: 11 },
      { timestamp: 1704193200000, value: 12 },
      { timestamp: 1704196800000, value: 13 },
      { timestamp: 1704200400000, value: 14 },
      { timestamp: 1704204000000, value: 15 },
      { timestamp: 1704207600000, value: 16 },
      { timestamp: 1704211200000, value: 17 },
      { timestamp: 1704214800000, value: 18 },
      { timestamp: 1704218400000, value: 19 },
      { timestamp: 1704222000000, value: 20 },
      { timestamp: 1704225600000, value: 21 },
      { timestamp: 1704229200000, value: 22 },
      { timestamp: 1704232800000, value: 23 },
      { timestamp: 1704236400000, value: 24 },
    ])
  })

  test(`should generate a sample when shapes have entries | start & end`, () => {
    const res = sampleFromShapes({
      shapes: [
        {
          type: `line`,
          range: [1, 24],
          entries: 12,
        },
      ],
      time: {
        start: new Date(`2024-01-02`).getTime(),
        end: new Date(`2024-01-03`).getTime(),
      },
    })

    expect(res).toEqual([
      { timestamp: 1704153600000, value: 1 },
      { timestamp: 1704160800000, value: 3 },
      { timestamp: 1704168000000, value: 5 },
      { timestamp: 1704175200000, value: 7 },
      { timestamp: 1704182400000, value: 9 },
      { timestamp: 1704189600000, value: 11 },
      { timestamp: 1704196800000, value: 14 },
      { timestamp: 1704204000000, value: 16 },
      { timestamp: 1704211200000, value: 18 },
      { timestamp: 1704218400000, value: 20 },
      { timestamp: 1704225600000, value: 22 },
      { timestamp: 1704232800000, value: 24 },
    ])
  })
})

describe(`multi line entry`, () => {
  test(`should generate a sample when shapes have entries | end`, () => {
    const res = sampleFromShapes({
      shapes: [
        {
          type: `line`,
          range: [1, 24],
          entries: 24,
        },
        {
          type: `line`,
          range: [23, 0],
          entries: 24,
        },
      ],
      time: {
        end: new Date(`2024-01-02`).getTime(),
        interval: ONE_HOUR_IN_MS,
      },
    })

    expect(res).toEqual([
      { timestamp: 1703984400000, value: 1 },
      { timestamp: 1703988000000, value: 2 },
      { timestamp: 1703991600000, value: 3 },
      { timestamp: 1703995200000, value: 4 },
      { timestamp: 1703998800000, value: 5 },
      { timestamp: 1704002400000, value: 6 },
      { timestamp: 1704006000000, value: 7 },
      { timestamp: 1704009600000, value: 8 },
      { timestamp: 1704013200000, value: 9 },
      { timestamp: 1704016800000, value: 10 },
      { timestamp: 1704020400000, value: 11 },
      { timestamp: 1704024000000, value: 12 },
      { timestamp: 1704027600000, value: 13 },
      { timestamp: 1704031200000, value: 14 },
      { timestamp: 1704034800000, value: 15 },
      { timestamp: 1704038400000, value: 16 },
      { timestamp: 1704042000000, value: 17 },
      { timestamp: 1704045600000, value: 18 },
      { timestamp: 1704049200000, value: 19 },
      { timestamp: 1704052800000, value: 20 },
      { timestamp: 1704056400000, value: 21 },
      { timestamp: 1704060000000, value: 22 },
      { timestamp: 1704063600000, value: 23 },
      { timestamp: 1704067200000, value: 24 },
      { timestamp: 1704070800000, value: 23 },
      { timestamp: 1704074400000, value: 22 },
      { timestamp: 1704078000000, value: 21 },
      { timestamp: 1704081600000, value: 20 },
      { timestamp: 1704085200000, value: 19 },
      { timestamp: 1704088800000, value: 18 },
      { timestamp: 1704092400000, value: 17 },
      { timestamp: 1704096000000, value: 16 },
      { timestamp: 1704099600000, value: 15 },
      { timestamp: 1704103200000, value: 14 },
      { timestamp: 1704106800000, value: 13 },
      { timestamp: 1704110400000, value: 12 },
      { timestamp: 1704114000000, value: 11 },
      { timestamp: 1704117600000, value: 10 },
      { timestamp: 1704121200000, value: 9 },
      { timestamp: 1704124800000, value: 8 },
      { timestamp: 1704128400000, value: 7 },
      { timestamp: 1704132000000, value: 6 },
      { timestamp: 1704135600000, value: 5 },
      { timestamp: 1704139200000, value: 4 },
      { timestamp: 1704142800000, value: 3 },
      { timestamp: 1704146400000, value: 2 },
      { timestamp: 1704150000000, value: 1 },
      { timestamp: 1704153600000, value: 0 },
    ])
  })
})
