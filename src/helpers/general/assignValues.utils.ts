import { Indices, TimeRanges } from "./assignValues.types.ts"

// Native array.sort has a bias when randomly shuffling 200,000+ values
// e.g.  return [...values].sort(() => Math.random() - 0.5)

// using Fisher-Yates shuffle instead
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export function shuffle(values: number[]) {
  const res = [...values]

  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[res[i], res[j]] = [res[j], res[i]]
  }

  return res
}

export function unfurlIndices(indices: Indices) {
  const unfurl = indices.reduce<number[]>((acc, entry) => {
    if (Array.isArray(entry)) {
      const [from, to] = entry
      const fill = Array.from({ length: to - from + 1 }, (_, i) => i + entry[0])
      return [...acc, ...fill]
    }

    return [...acc, entry]
  }, [])

  return unfurl
}

export function normalizeTimestamps(timestamps: TimeRanges) {
  return timestamps.reduce<Array<number | number[]>>((acc, entry) => {
    if (Array.isArray(entry)) {
      return [...acc, entry.map(normalizeTime)]
    }

    return [...acc, normalizeTime(entry)]
  }, [])
}

function normalizeTime(entry: number | string) {
  if (typeof entry === 'string') {
    return new Date(entry).getTime()
  }

  return entry
}

export function isInRange(value: number, range: Array<number | number[]>) {
  return range.some((entry) => {
    if (Array.isArray(entry)) {
      return value >= entry[0] && value <= entry[1]
    }

    return value === entry
  })
}
