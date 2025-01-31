import { expect, test } from "vitest"
import { sampleFromTime } from "./sampleFromTime.ts"
import { ONE_HOUR_IN_MS } from "../time/time.constants.ts"

test(`should generate a sample when shapes have no entries`, () => {
  const res = sampleFromTime({
    shapes: [
      {
        type: `line`,
        range: [1, 24],
      },
    ],
    time: {
      end: new Date(`2024-01-02`).getTime(),
      start: new Date(`2024-01-01`).getTime(),
      interval: ONE_HOUR_IN_MS,
    },
  })

  expect(res).toEqual([
    { timestamp: 1704067200000, value: 1 },
    { timestamp: 1704070800000, value: 2 },
    { timestamp: 1704074400000, value: 3 },
    { timestamp: 1704078000000, value: 4 },
    { timestamp: 1704081600000, value: 5 },
    { timestamp: 1704085200000, value: 6 },
    { timestamp: 1704088800000, value: 7 },
    { timestamp: 1704092400000, value: 8 },
    { timestamp: 1704096000000, value: 9 },
    { timestamp: 1704099600000, value: 10 },
    { timestamp: 1704103200000, value: 11 },
    { timestamp: 1704106800000, value: 12 },
    { timestamp: 1704110400000, value: 13 },
    { timestamp: 1704114000000, value: 14 },
    { timestamp: 1704117600000, value: 15 },
    { timestamp: 1704121200000, value: 16 },
    { timestamp: 1704124800000, value: 17 },
    { timestamp: 1704128400000, value: 18 },
    { timestamp: 1704132000000, value: 19 },
    { timestamp: 1704135600000, value: 20 },
    { timestamp: 1704139200000, value: 21 },
    { timestamp: 1704142800000, value: 22 },
    { timestamp: 1704146400000, value: 23 },
    { timestamp: 1704150000000, value: 24 },
  ])
})
