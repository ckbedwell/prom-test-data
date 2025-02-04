import { describe, expect, test } from "vitest"
import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS } from "../time/time.constants.ts"
import { sampleFromShapes } from "./sampleFromShapes.ts"

describe(`single line entry`, () => {
  test(`should generate a sample when shapes have entries | end`, () => {
    const dateString = `2024-01-01`

    const res = sampleFromShapes({
      shapes: [
        {
          type: `line`,
          range: [1, 24],
          entries: 24,
        },
      ],
      time: {
        end: new Date(dateString).getTime() + ONE_DAY_IN_MS,
        interval: ONE_HOUR_IN_MS,
      },
    })

    expect(res.map(({ timestamp, value }) => ({
      timestamp: new Date(timestamp).toISOString(),
      value,
    }))).toEqual([
      { timestamp: `${dateString}T01:00:00.000Z`, value: 1 },
      { timestamp: `${dateString}T02:00:00.000Z`, value: 2 },
      { timestamp: `${dateString}T03:00:00.000Z`, value: 3 },
      { timestamp: `${dateString}T04:00:00.000Z`, value: 4 },
      { timestamp: `${dateString}T05:00:00.000Z`, value: 5 },
      { timestamp: `${dateString}T06:00:00.000Z`, value: 6 },
      { timestamp: `${dateString}T07:00:00.000Z`, value: 7 },
      { timestamp: `${dateString}T08:00:00.000Z`, value: 8 },
      { timestamp: `${dateString}T09:00:00.000Z`, value: 9 },
      { timestamp: `${dateString}T10:00:00.000Z`, value: 10 },
      { timestamp: `${dateString}T11:00:00.000Z`, value: 11 },
      { timestamp: `${dateString}T12:00:00.000Z`, value: 12 },
      { timestamp: `${dateString}T13:00:00.000Z`, value: 13 },
      { timestamp: `${dateString}T14:00:00.000Z`, value: 14 },
      { timestamp: `${dateString}T15:00:00.000Z`, value: 15 },
      { timestamp: `${dateString}T16:00:00.000Z`, value: 16 },
      { timestamp: `${dateString}T17:00:00.000Z`, value: 17 },
      { timestamp: `${dateString}T18:00:00.000Z`, value: 18 },
      { timestamp: `${dateString}T19:00:00.000Z`, value: 19 },
      { timestamp: `${dateString}T20:00:00.000Z`, value: 20 },
      { timestamp: `${dateString}T21:00:00.000Z`, value: 21 },
      { timestamp: `${dateString}T22:00:00.000Z`, value: 22 },
      { timestamp: `${dateString}T23:00:00.000Z`, value: 23 },
      { timestamp: `2024-01-02T00:00:00.000Z`, value: 24 },
    ])
  })

  test(`should generate a sample when shapes have entries | start`, () => {
    const dateString = `2024-01-01`

    const res = sampleFromShapes({
      shapes: [
        {
          type: `line`,
          range: [1, 24],
          entries: 24,
        },
      ],
      time: {
        start: new Date(dateString).getTime() + ONE_HOUR_IN_MS,
        end: new Date(`2024-01-02`).getTime(),
      },
    })

    expect(res.map(({ timestamp, value }) => ({
      timestamp: new Date(timestamp).toISOString(),
      value,
    }))).toEqual([
      { timestamp: `${dateString}T01:00:00.000Z`, value: 1 },
      { timestamp: `${dateString}T02:00:00.000Z`, value: 2 },
      { timestamp: `${dateString}T03:00:00.000Z`, value: 3 },
      { timestamp: `${dateString}T04:00:00.000Z`, value: 4 },
      { timestamp: `${dateString}T05:00:00.000Z`, value: 5 },
      { timestamp: `${dateString}T06:00:00.000Z`, value: 6 },
      { timestamp: `${dateString}T07:00:00.000Z`, value: 7 },
      { timestamp: `${dateString}T08:00:00.000Z`, value: 8 },
      { timestamp: `${dateString}T09:00:00.000Z`, value: 9 },
      { timestamp: `${dateString}T10:00:00.000Z`, value: 10 },
      { timestamp: `${dateString}T11:00:00.000Z`, value: 11 },
      { timestamp: `${dateString}T12:00:00.000Z`, value: 12 },
      { timestamp: `${dateString}T13:00:00.000Z`, value: 13 },
      { timestamp: `${dateString}T14:00:00.000Z`, value: 14 },
      { timestamp: `${dateString}T15:00:00.000Z`, value: 15 },
      { timestamp: `${dateString}T16:00:00.000Z`, value: 16 },
      { timestamp: `${dateString}T17:00:00.000Z`, value: 17 },
      { timestamp: `${dateString}T18:00:00.000Z`, value: 18 },
      { timestamp: `${dateString}T19:00:00.000Z`, value: 19 },
      { timestamp: `${dateString}T20:00:00.000Z`, value: 20 },
      { timestamp: `${dateString}T21:00:00.000Z`, value: 21 },
      { timestamp: `${dateString}T22:00:00.000Z`, value: 22 },
      { timestamp: `${dateString}T23:00:00.000Z`, value: 23 },
      { timestamp: `2024-01-02T00:00:00.000Z`, value: 24 },
    ])
  })

  test(`should generate a sample when shapes have entries | start & end`, () => {
    const dateString = `2024-01-01`

    const res = sampleFromShapes({
      shapes: [
        {
          type: `line`,
          range: [0, 24],
          entries: 13,
        },
      ],
      time: {
        start: new Date(dateString).getTime(),
        end: new Date(`2024-01-02`).getTime(),
      },
    })

    expect(res.map(({ timestamp, value }) => ({
      timestamp: new Date(timestamp).toISOString(),
      value,
    }))).toEqual([
      { timestamp: `${dateString}T00:00:00.000Z`, value: 0 },
      { timestamp: `${dateString}T02:00:00.000Z`, value: 2 },
      { timestamp: `${dateString}T04:00:00.000Z`, value: 4 },
      { timestamp: `${dateString}T06:00:00.000Z`, value: 6 },
      { timestamp: `${dateString}T08:00:00.000Z`, value: 8 },
      { timestamp: `${dateString}T10:00:00.000Z`, value: 10 },
      { timestamp: `${dateString}T12:00:00.000Z`, value: 12 },
      { timestamp: `${dateString}T14:00:00.000Z`, value: 14 },
      { timestamp: `${dateString}T16:00:00.000Z`, value: 16 },
      { timestamp: `${dateString}T18:00:00.000Z`, value: 18 },
      { timestamp: `${dateString}T20:00:00.000Z`, value: 20 },
      { timestamp: `${dateString}T22:00:00.000Z`, value: 22 },
      { timestamp: `2024-01-02T00:00:00.000Z`, value: 24 },
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

    expect(res.map(({ timestamp, value }) => ({
      timestamp: new Date(timestamp).toISOString(),
      value,
    }))).toEqual([
      { timestamp: '2023-12-31T01:00:00.000Z', value: 1 },
      { timestamp: '2023-12-31T02:00:00.000Z', value: 2 },
      { timestamp: '2023-12-31T03:00:00.000Z', value: 3 },
      { timestamp: '2023-12-31T04:00:00.000Z', value: 4 },
      { timestamp: '2023-12-31T05:00:00.000Z', value: 5 },
      { timestamp: '2023-12-31T06:00:00.000Z', value: 6 },
      { timestamp: '2023-12-31T07:00:00.000Z', value: 7 },
      { timestamp: '2023-12-31T08:00:00.000Z', value: 8 },
      { timestamp: '2023-12-31T09:00:00.000Z', value: 9 },
      { timestamp: '2023-12-31T10:00:00.000Z', value: 10 },
      { timestamp: '2023-12-31T11:00:00.000Z', value: 11 },
      { timestamp: '2023-12-31T12:00:00.000Z', value: 12 },
      { timestamp: '2023-12-31T13:00:00.000Z', value: 13 },
      { timestamp: '2023-12-31T14:00:00.000Z', value: 14 },
      { timestamp: '2023-12-31T15:00:00.000Z', value: 15 },
      { timestamp: '2023-12-31T16:00:00.000Z', value: 16 },
      { timestamp: '2023-12-31T17:00:00.000Z', value: 17 },
      { timestamp: '2023-12-31T18:00:00.000Z', value: 18 },
      { timestamp: '2023-12-31T19:00:00.000Z', value: 19 },
      { timestamp: '2023-12-31T20:00:00.000Z', value: 20 },
      { timestamp: '2023-12-31T21:00:00.000Z', value: 21 },
      { timestamp: '2023-12-31T22:00:00.000Z', value: 22 },
      { timestamp: '2023-12-31T23:00:00.000Z', value: 23 },
      { timestamp: '2024-01-01T00:00:00.000Z', value: 24 },
      { timestamp: '2024-01-01T01:00:00.000Z', value: 23 },
      { timestamp: '2024-01-01T02:00:00.000Z', value: 22 },
      { timestamp: '2024-01-01T03:00:00.000Z', value: 21 },
      { timestamp: '2024-01-01T04:00:00.000Z', value: 20 },
      { timestamp: '2024-01-01T05:00:00.000Z', value: 19 },
      { timestamp: '2024-01-01T06:00:00.000Z', value: 18 },
      { timestamp: '2024-01-01T07:00:00.000Z', value: 17 },
      { timestamp: '2024-01-01T08:00:00.000Z', value: 16 },
      { timestamp: '2024-01-01T09:00:00.000Z', value: 15 },
      { timestamp: '2024-01-01T10:00:00.000Z', value: 14 },
      { timestamp: '2024-01-01T11:00:00.000Z', value: 13 },
      { timestamp: '2024-01-01T12:00:00.000Z', value: 12 },
      { timestamp: '2024-01-01T13:00:00.000Z', value: 11 },
      { timestamp: '2024-01-01T14:00:00.000Z', value: 10 },
      { timestamp: '2024-01-01T15:00:00.000Z', value: 9 },
      { timestamp: '2024-01-01T16:00:00.000Z', value: 8 },
      { timestamp: '2024-01-01T17:00:00.000Z', value: 7 },
      { timestamp: '2024-01-01T18:00:00.000Z', value: 6 },
      { timestamp: '2024-01-01T19:00:00.000Z', value: 5 },
      { timestamp: '2024-01-01T20:00:00.000Z', value: 4 },
      { timestamp: '2024-01-01T21:00:00.000Z', value: 3 },
      { timestamp: '2024-01-01T22:00:00.000Z', value: 2 },
      { timestamp: '2024-01-01T23:00:00.000Z', value: 1 },
      { timestamp: '2024-01-02T00:00:00.000Z', value: 0 }
    ])
  })
})
