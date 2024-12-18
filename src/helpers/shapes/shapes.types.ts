interface ShapeBase {
  entries: number
  range: [number, number]
}

export interface Line extends ShapeBase {}

export interface Curve extends ShapeBase {
  rate: number
}

export interface BellCurve extends ShapeBase {
  curvePeakAt: number // Percentage of total samples where the peak occurs
  normalizeAt?: number // Percentage of total samples to normalize back to rangeMin
  stdDevFactor?: number // Standard deviation factor
}

export type Shape = Line | Curve | BellCurve
