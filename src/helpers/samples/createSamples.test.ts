import { describe, test, expect } from "vitest";
import { createSamples } from "./createSamples.ts";
import { ONE_DAY_IN_MS } from "../time/time.constants.ts";

const identicalResult = [
  {
    "timestamp": new Date(`2025-01-01`).getTime(),
    "value": 1,
  },
  {
    "timestamp": new Date(`2025-01-02`).getTime(),
    "value": 1,
  },
]

describe("createSamples", () => {
  test(`creates the samples correctly | entries & start & end`, () => {
    // uses sampleFromTime
    const res = createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 1],
          entries: 2,
        }
      ],
      time: {
        start: new Date(`2025-01-01`).getTime(),
        end: new Date(`2025-01-02`).getTime(),
      }
    })

    expect(res).toEqual(identicalResult)
  })

  test(`creates the samples correctly | entries & start & interval`, () => {
    // uses sampleFromShapes
    const res = createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 1],
          entries: 2,
        }
      ],
      time: {
        start: new Date(`2025-01-01`).getTime(),
        interval: ONE_DAY_IN_MS,
      }
    })

    expect(res).toEqual(identicalResult)
  })

  test(`creates the samples correctly | entries & end & interval`, () => {
    // uses sampleFromShapes
    const res = createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 1],
          entries: 2,
        }
      ],
      time: {
        end: new Date(`2025-01-02`).getTime(),
        interval: ONE_DAY_IN_MS,
      }
    })

    expect(res).toEqual(identicalResult)
  })


  test(`creates the samples correctly | start & end & interval`, () => {
    // uses sampleFromShapes
    const res = createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 1],
        }
      ],
      time: {
        start: new Date(`2025-01-01`).getTime(),
        end: new Date(`2025-01-02`).getTime(),
        interval: ONE_DAY_IN_MS,
      }
    })

    expect(res).toEqual(identicalResult)
  })
})
