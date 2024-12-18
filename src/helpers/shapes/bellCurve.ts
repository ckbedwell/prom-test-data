import { BellCurve } from "./shapes.types.ts"

export function bellCurve({
  entries,
  range,
  curvePeakAt,
  normalizeAt = 100,
  stdDevFactor = 6,
}: BellCurve) {
  if (curvePeakAt < 0 || curvePeakAt > 100) {
    throw new Error("curvePeakAt must be between 0 and 100")
  }

  if (normalizeAt < 0 || normalizeAt > 100) {
    throw new Error("normalizeAt must be between 0 and 100")
  }

  const [min, max] = range
  const data: number[] = []
  const midPoint = Math.floor(entries * (curvePeakAt / 100))
  const normalizePoint = Math.floor(entries * (normalizeAt / 100))
  const stdDev = entries / stdDevFactor // Standard deviation controls the curve's width

  for (let i = 0; i < entries; i++) {
    const x = i - midPoint // Center the curve at the midpoint
    const bellValue = max * Math.exp(-(x * x) / (2 * stdDev * stdDev)) // Bell curve formula

    // Normalize to rangeMin after normalizePoint
    const value =
      i > normalizePoint ? min : Math.max(min, Math.min(bellValue, max)) // Clamp values to range

    data.push(Math.round(value))
  }

  return data
}
