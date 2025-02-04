import { assignValues, AssignValuesOptions } from "../general/assignValues.ts"
import { multiShape } from "../shapes/multiShape.ts"
import { BellCurve, Curve, Line, Shape } from "../shapes/shapes.types.ts"
import { calculateTimeStampEntries } from "../time/calculateTimeStampEntries.ts"
import { CalculateTimeStampEntries } from "../time/time.types.ts"

type EntryLessShape =
  | Omit<Line, "entries">
  | Omit<Curve, "entries">
  | Omit<BellCurve, "entries">

// assume constant time across shapes
export type FitShapeToTimeOptions = {
  shapes: EntryLessShape[]
  time: CalculateTimeStampEntries
  options?: AssignValuesOptions
}

export function sampleFromTime({
  shapes,
  time,
  options,
}: FitShapeToTimeOptions) {
  const timeStamps = calculateTimeStampEntries(time)
  const entries = timeStamps.length
  const numberOfShapes = shapes.length
  const entriesPerShape = Math.floor(entries / numberOfShapes)
  const remainder = entries % numberOfShapes

  const shapesWithEntries: Shape[] = shapes.map((shape, index) => {
    const shapeEntries = entriesPerShape + (index < remainder ? 1 : 0)
    return { ...shape, entries: shapeEntries }
  })

  const flatShape = multiShape(shapesWithEntries)

  return assignValues(flatShape, timeStamps, options)
}
