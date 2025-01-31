import { assignValues, AssignValuesOptions } from "../general/assignValues.ts"
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

export type EntryLessTime = EntryLessEnd | EntryLessInterval | EntryLessStart

export type FitTimeToShapeOptions = {
  shapes: Shape[]
  time: EntryLessTime
  options?: AssignValuesOptions
}

export function sampleFromShapes({
  shapes,
  time,
  options,
}: FitTimeToShapeOptions) {
  const shapeValues = multiShape(shapes)
  const entries = shapeValues.length
  const timestamps = calculateTimestamps(time, entries)

  return assignValues(shapeValues, timestamps, options)
}

export function calculateTimestamps(time: EntryLessTime, entries: number) {
  if ("end" in time && "start" in time) {
    return calculateTimeStampInterval({
      ...time,
      entries,
    })
  }

  if ("start" in time) {
    return fillTimeStampEntriesFromStart({
      ...time,
      entries,
    })
  }

  return fillTimeStampEntriesToEnd({
    ...time,
    entries,
  })
}
