interface ShapeBase {
  entries: number
  range: [number, number]
}

export interface Line extends ShapeBase {
  type: `line`
}

export interface Curve extends ShapeBase {
  type: `curve`
  attrs: {
    rate: number
  }
}

export interface BellCurve extends ShapeBase {
  type: `bellCurve`
  attrs: {
    curvePeakAt: number // Percentage of total samples where the peak occurs
    normalizeAt?: number // Percentage of total samples to normalize back to rangeMin
    stdDevFactor?: number // Standard deviation factor
  }
}

export interface Random extends ShapeBase {
  type: `random`
}

export type Shape = Line | Curve | BellCurve | Random
