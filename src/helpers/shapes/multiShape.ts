import { bellCurve } from "./bellCurve.ts"
import { curve } from "./curve.ts"
import { line } from "./line.ts"
import { BellCurve, Curve, Shape } from "./shapes.types.ts"

export function multiShape(shapes: Shape[]) {
  return shapes
    .map((shape) => {
      if (isBellCurve(shape)) {
        return bellCurve(shape)
      }

      if (isCurve(shape)) {
        return curve(shape)
      }

      return line(shape)
    })
    .flat()
}

function isBellCurve(shape: Shape): shape is BellCurve {
  return shape.hasOwnProperty("curvePeakAt")
}

function isCurve(shape: Shape): shape is Curve {
  return shape.hasOwnProperty("rate")
}
