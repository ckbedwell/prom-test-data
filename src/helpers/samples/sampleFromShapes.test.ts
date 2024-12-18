import { test } from "vitest"
import { ONE_HOUR } from "../time/time.constants.ts"
import { sampleFromShapes } from "./sampleFromShapes.ts"

test(`should generate a sample when shapes have entries`, () => {
  const res = sampleFromShapes({
    shapes: [
      {
        range: [1, 24],
        entries: 24,
      },
    ],
    time: {
      end: new Date(`2024-01-02`).getTime(),
      interval: ONE_HOUR,
    },
  })

  console.log(res)
})
