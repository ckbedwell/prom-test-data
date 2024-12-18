import { expect, test } from "vitest"
import { fillTimeStampEntriesFromStart } from "./fillTimeStampEntriesFromStart.ts"
import { ONE_HOUR } from "./time.constants.ts"

test(`should generate specified amount of timestamp entries from start date`, () => {
  const res = fillTimeStampEntriesFromStart({
    start: new Date(`2024-01-01`).getTime(),
    entries: 24,
    interval: ONE_HOUR,
  })

  expect(res.length).toEqual(24)
  expect(res.map((t) => new Date(t).toISOString())).toStrictEqual([
    "2024-01-01T00:00:00.000Z",
    "2024-01-01T01:00:00.000Z",
    "2024-01-01T02:00:00.000Z",
    "2024-01-01T03:00:00.000Z",
    "2024-01-01T04:00:00.000Z",
    "2024-01-01T05:00:00.000Z",
    "2024-01-01T06:00:00.000Z",
    "2024-01-01T07:00:00.000Z",
    "2024-01-01T08:00:00.000Z",
    "2024-01-01T09:00:00.000Z",
    "2024-01-01T10:00:00.000Z",
    "2024-01-01T11:00:00.000Z",
    "2024-01-01T12:00:00.000Z",
    "2024-01-01T13:00:00.000Z",
    "2024-01-01T14:00:00.000Z",
    "2024-01-01T15:00:00.000Z",
    "2024-01-01T16:00:00.000Z",
    "2024-01-01T17:00:00.000Z",
    "2024-01-01T18:00:00.000Z",
    "2024-01-01T19:00:00.000Z",
    "2024-01-01T20:00:00.000Z",
    "2024-01-01T21:00:00.000Z",
    "2024-01-01T22:00:00.000Z",
    "2024-01-01T23:00:00.000Z",
  ])
})
