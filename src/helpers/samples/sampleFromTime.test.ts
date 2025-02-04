import { expect, test } from "vitest"
import { sampleFromTime } from "./sampleFromTime.ts"
import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS } from "../time/time.constants.ts"

test(`should generate a sample when shapes have no entries`, () => {
  const dateString = `2024-01-01`

  const res = sampleFromTime({
    shapes: [
      {
        type: `line`,
        range: [1, 25],
      },
    ],
    time: {
      start: new Date(dateString).getTime(),
      end: new Date(dateString).getTime() + ONE_DAY_IN_MS,
      interval: ONE_HOUR_IN_MS,
    },
  })

  expect(res.map(({ timestamp, value }) => ({
    timestamp: new Date(timestamp).toISOString(),
    value,
  }))).toEqual([
    { timestamp: `${dateString}T00:00:00.000Z`, value: 1 },
    { timestamp: `${dateString}T01:00:00.000Z`, value: 2 },
    { timestamp: `${dateString}T02:00:00.000Z`, value: 3 },
    { timestamp: `${dateString}T03:00:00.000Z`, value: 4 },
    { timestamp: `${dateString}T04:00:00.000Z`, value: 5 },
    { timestamp: `${dateString}T05:00:00.000Z`, value: 6 },
    { timestamp: `${dateString}T06:00:00.000Z`, value: 7 },
    { timestamp: `${dateString}T07:00:00.000Z`, value: 8 },
    { timestamp: `${dateString}T08:00:00.000Z`, value: 9 },
    { timestamp: `${dateString}T09:00:00.000Z`, value: 10 },
    { timestamp: `${dateString}T10:00:00.000Z`, value: 11 },
    { timestamp: `${dateString}T11:00:00.000Z`, value: 12 },
    { timestamp: `${dateString}T12:00:00.000Z`, value: 13 },
    { timestamp: `${dateString}T13:00:00.000Z`, value: 14 },
    { timestamp: `${dateString}T14:00:00.000Z`, value: 15 },
    { timestamp: `${dateString}T15:00:00.000Z`, value: 16 },
    { timestamp: `${dateString}T16:00:00.000Z`, value: 17 },
    { timestamp: `${dateString}T17:00:00.000Z`, value: 18 },
    { timestamp: `${dateString}T18:00:00.000Z`, value: 19 },
    { timestamp: `${dateString}T19:00:00.000Z`, value: 20 },
    { timestamp: `${dateString}T20:00:00.000Z`, value: 21 },
    { timestamp: `${dateString}T21:00:00.000Z`, value: 22 },
    { timestamp: `${dateString}T22:00:00.000Z`, value: 23 },
    { timestamp: `${dateString}T23:00:00.000Z`, value: 24 },
    { timestamp: `2024-01-02T00:00:00.000Z`, value: 25 }
  ])
})
