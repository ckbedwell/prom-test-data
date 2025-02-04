import { Sample } from "prometheus-remote-write/types.js"
import { AssignValuesOptions, DropSamples } from "./assignValues.types.ts"
import { isInRange, normalizeTimestamps, shuffle, unfurlIndices } from "./assignValues.utils.ts"

export function assignValues(
  values: number[],
  timestamps: number[],
  options: AssignValuesOptions = {}
) {
  if (values.length !== timestamps.length) {
    throw new Error(`Values and timestamps must have the same length`)
  }

  const { randomize, dropSamples } = options
  const valuesArranged = randomize ? shuffle(values) : values
  return assignTimestampsToValues(timestamps, valuesArranged, dropSamples)
}

export function assignTimestampsToValues(timestamps: number[], valuesArranged: number[], dropSamples?: DropSamples): Sample[] {
  const normalizedDroppedTimestamps = normalizeTimestamps(dropSamples?.timestamps || [])
  const unfurledIndices = dropSamples?.indices ? unfurlIndices(dropSamples.indices) : []
  let samples: Sample[] = []

  for (let i = 0; i < timestamps.length; i++) {
    if (unfurledIndices.includes(i)) {
      continue
    }

    const timestamp = timestamps[i]

    if (isInRange(timestamp, normalizedDroppedTimestamps)) {
      continue
    }

    if (dropSamples?.randomChance && Math.random() < dropSamples.randomChance) {
      continue
    }

    samples.push({
      timestamp,
      value: valuesArranged[i],
    })
  }

  return samples
}
