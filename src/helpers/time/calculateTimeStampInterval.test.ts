import { expect, test } from "vitest"
import { calculateTimeStampInterval } from "./calculateTimeStampInterval.ts"

test(`should generate specified amount of timestamp entries between start and end times`, () => {
  const dateString = `2024-01-01`

  const res = calculateTimeStampInterval({
    end: new Date(`2024-01-02`).getTime(),
    entries: 24,
    start: new Date(dateString).getTime(),
  })

  expect(res.length).toEqual(24)
  expect(res.map((t) => new Date(t).toISOString())).toStrictEqual([
    `${dateString}T00:00:00.000Z`,
    `${dateString}T01:00:00.000Z`,
    `${dateString}T02:00:00.000Z`,
    `${dateString}T03:00:00.000Z`,
    `${dateString}T04:00:00.000Z`,
    `${dateString}T05:00:00.000Z`,
    `${dateString}T06:00:00.000Z`,
    `${dateString}T07:00:00.000Z`,
    `${dateString}T08:00:00.000Z`,
    `${dateString}T09:00:00.000Z`,
    `${dateString}T10:00:00.000Z`,
    `${dateString}T11:00:00.000Z`,
    `${dateString}T12:00:00.000Z`,
    `${dateString}T13:00:00.000Z`,
    `${dateString}T14:00:00.000Z`,
    `${dateString}T15:00:00.000Z`,
    `${dateString}T16:00:00.000Z`,
    `${dateString}T17:00:00.000Z`,
    `${dateString}T18:00:00.000Z`,
    `${dateString}T19:00:00.000Z`,
    `${dateString}T20:00:00.000Z`,
    `${dateString}T21:00:00.000Z`,
    `${dateString}T22:00:00.000Z`,
    `${dateString}T23:00:00.000Z`,
  ])
})
