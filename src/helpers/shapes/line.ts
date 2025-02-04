import { Line } from "./shapes.types.ts"

export function line({ range, entries }: Line) {
  const [start, end] = range
  const result: number[] = []

  // special case for 1 entry
  if (entries === 1) {
    return [start]
  }

  if (start <= end) {
    return generateEntries(start, end, entries)
  }

  if (start > end) {
    return generateEntries(end, start, entries).reverse()
  }

  return result
}

function generateEntries(min: number, max: number, entries: number) {
  const result: number[] = []
  const range = max - min + 1

  if (range < entries) {
    return generateEvenEntries(min, max, entries)
  }

  const step = (min - max) / (entries - 1)

  for (let i = 0; i < entries; i++) {
    result.push(Math.round(min - i * step))
  }

  return result
}

function generateEvenEntries(min: number, max: number, entries: number) {
  const segments = max - min + 1
  const baseEntriesPerSegment = Math.floor(entries / segments)
  const remainder = entries % segments
  const result: number[] = []

  for (let value = min; value <= max; value++) {
    // Add base entries for this number
    for (let i = 0; i < baseEntriesPerSegment; i++) {
      result.push(value)
    }

    // Add one extra entry if we still have remainder
    if (result.length < entries && value - min < remainder) {
      result.push(value)
    }
  }

  return result
}