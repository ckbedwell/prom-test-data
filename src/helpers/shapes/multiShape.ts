import { bellCurve } from "./bellCurve.ts"
import { curve } from "./curve.ts"
import { line } from "./line.ts"
import { random } from "./random.ts"
import { Shape } from "./shapes.types.ts"

interface Options {
  randomize?: boolean
}

export function multiShape(shapes: Shape[], options?: Options) {
  const flatShapes = shapes
    .map((shape) => {
      if (shape.type === `bellCurve`) {
        return bellCurve(shape)
      }

      if (shape.type === `curve`) {
        return curve(shape)
      }

      if (shape.type === `random`) {
        return random(shape)
      }

      return line(shape)
    })
    .flat()

  if (options?.randomize) {
    return flatShapes.sort(() => Math.random() - 0.5)
  }

  return flatShapes
}
