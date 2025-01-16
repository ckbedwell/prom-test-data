import { BellCurve } from "./shapes.types.ts"

export function bellCurve({ entries, range, attrs }: BellCurve) {
  const { curvePeakAt, normalizeAt = 100, stdDevFactor = 6 } = attrs

  if (curvePeakAt < 0 || curvePeakAt > 100) {
    throw new Error("curvePeakAt must be between 0 and 100")
  }

  if (normalizeAt < 0 || normalizeAt > 100) {
    throw new Error("normalizeAt must be between 0 and 100")
  }

  const [min, max] = range
  const data: number[] = []
  const peakPoint = Math.floor(entries * (curvePeakAt / 100))
  const normalizePoint = Math.floor(entries * (normalizeAt / 100))
  const stdDev = entries / stdDevFactor // Standard deviation controls the curve's width

  for (let i = 0; i < entries; i++) {
    const x = i - peakPoint // Center the curve at the peak
    let bellValue = max * Math.exp(-(x * x) / (2 * stdDev * stdDev)) // Bell curve formula

    // Smooth normalization after normalizePoint
    if (i > normalizePoint) {
      const weight = (i - normalizePoint) / (entries - normalizePoint) // Linear transition
      bellValue = bellValue * (1 - weight) + min * weight // Interpolate to `min`
    }

    // Clamp values to range
    const value = Math.max(min, Math.min(bellValue, max))

    data.push(Math.round(value))
  }

  return data
}
