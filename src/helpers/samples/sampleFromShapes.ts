import { assignValues } from "../general/assignValues.ts"
import { multiShape } from "../shapes/multiShape.ts"
import { Shape } from "../shapes/shapes.types.ts"
import { calculateTimeStampInterval } from "../time/calculateTimeStampInterval.ts"
import { fillTimeStampEntriesFromStart } from "../time/fillTimeStampEntriesFromStart.ts"
import { fillTimeStampEntriesToEnd } from "../time/fillTimeStampEntriesToEnd.ts"
import {
  CalculateTimestampInterval,
  FillTimeStampFromStart,
  FillTimeStampToEnd,
} from "../time/time.types.ts"

type EntryLessInterval = Omit<CalculateTimestampInterval, "entries">
type EntryLessStart = Omit<FillTimeStampFromStart, "entries">
type EntryLessEnd = Omit<FillTimeStampToEnd, "entries">

export type FitTimeToShapeOptions = {
  shapes: Shape[]
  time: EntryLessEnd | EntryLessInterval | EntryLessStart
}

export function sampleFromShapes(options: FitTimeToShapeOptions) {
  const shapeValues = multiShape(options.shapes)
  const entries = shapeValues.length
  const timestamps = calculateTimestamps(options, entries)

  return assignValues(shapeValues, timestamps)
}

function calculateTimestamps(options: FitTimeToShapeOptions, entries: number) {
  if ("end" in options.time && "start" in options.time) {
    return calculateTimeStampInterval({
      ...options.time,
      entries,
    })
  }

  if ("start" in options.time) {
    return fillTimeStampEntriesFromStart({
      ...options.time,
      entries,
    })
  }

  return fillTimeStampEntriesToEnd({
    ...options.time,
    entries,
  })
}
