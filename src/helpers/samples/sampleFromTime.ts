import { assignValues } from "../general/assignValues.ts"
import { multiShape } from "../shapes/multiShape.ts"
import { Shape } from "../shapes/shapes.types.ts"
import { calculateTimeStampEntries } from "../time/calculateTimeStampEntries.ts"
import { CalculateTimeStampEntries } from "../time/time.types.ts"

type EntryLessShape = Omit<Shape, "entries">

// assume constant time across shapes
type FitShapeToTimeOptions = {
  shapes: EntryLessShape[]
  time: CalculateTimeStampEntries
}

export function sampleFromTime(options: FitShapeToTimeOptions) {
  const timeStamps = calculateTimeStampEntries(options.time)
  const entries = timeStamps.length
  const numberOfShapes = options.shapes.length
  const entriesPerShape = Math.floor(entries / numberOfShapes)
  const remainder = entries % numberOfShapes

  const shapes = options.shapes.map((shape, index) => {
    const shapeEntries = entriesPerShape + (index < remainder ? 1 : 0)
    return { ...shape, entries: shapeEntries }
  })

  return assignValues(multiShape(shapes), timeStamps)
}
