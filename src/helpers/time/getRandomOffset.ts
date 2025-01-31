import { Ran } from "../scenarios/scenarios.types.ts"
import { RandomOffsets } from "./time.types.ts"

export function getRandomOffset(randomOffset?: RandomOffsets) {
  if (!randomOffset) {
    return 0
  }

  const { maxOffset, blipLiklihood } = randomOffset

  if (shouldBlip(blipLiklihood)) {
    const positiveOrNegative = Math.random() > 0.5 ? 1 : -1
    const result = positiveOrNegative * Math.random() * maxOffset

    return Math.round(result)
  }


  return 0
}

export function shouldBlip(blipLikelyHood: number) {
  const likelihood = blipLikelyHood / 100

  return Math.random() < likelihood
}
