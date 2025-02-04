import { expect, test } from "vitest"
import { calculateTimeStampEntries } from "./calculateTimeStampEntries.ts"
import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS, ONE_SECOND_IN_MS } from "./time.constants.ts"

test(`should generate timestamp entries at constant intervals between start and end date`, () => {
  const dateString = `2024-01-01`

  const res = calculateTimeStampEntries({
    end: new Date(dateString).getTime() + ONE_DAY_IN_MS,
    interval: ONE_HOUR_IN_MS,
    start: new Date(dateString).getTime(),
  })

  expect(res.length).toEqual(25)
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
    `2024-01-02T00:00:00.000Z`
  ])
})


test(`should add a random five second offset to the entries`, () => {
  const dateString = `2024-01-01`

  const res = calculateTimeStampEntries({
    end: new Date(`2024-01-02`).getTime(),
    interval: ONE_HOUR_IN_MS,
    start: new Date(dateString).getTime(),
    random: {
      maxOffset: ONE_SECOND_IN_MS * 5,
      blipLiklihood: 1,
    },
  })

  expect(res.length).toEqual(25)
  expect(res.map((t) => new Date(t).toISOString())).not.toStrictEqual([
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
    `2024-01-02T00:00:00.000Z`
  ])
})

test(`should throw an error if start time is greater than end time`, () => {
  expect(() => {
    calculateTimeStampEntries({
      end: new Date(`2024-01-01`).getTime(),
      interval: ONE_HOUR_IN_MS,
      start: new Date(`2024-01-02`).getTime(),
    })
  }).toThrowError(`Start time is greater than end time`)
})
