import { sampleFromTime, type FitShapeToTimeOptions } from "./sampleFromTime.ts";
import { sampleFromShapes, type FitTimeToShapeOptions } from "./sampleFromShapes.ts";

export function createSamples(input: FitShapeToTimeOptions | FitTimeToShapeOptions) {
  if (isFitShapeToTimeOptions(input)) {
    return sampleFromTime(input)
  }

  return sampleFromShapes(input)
}

function isFitShapeToTimeOptions(input: FitShapeToTimeOptions | FitTimeToShapeOptions): input is FitShapeToTimeOptions {
  return 'end' in input.time && 'start' in input.time && 'interval' in input.time
}
