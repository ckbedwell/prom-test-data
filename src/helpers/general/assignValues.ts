export type AssignValuesOptions = {
  randomize?: boolean
}

export function assignValues(
  values: number[],
  timestamps: number[],
  options?: AssignValuesOptions
) {
  if (values.length !== timestamps.length) {
    throw new Error(`Values and timestamps must have the same length`)
  }

  const valuesArranged = arrangeValues(values, options)

  return timestamps.map((timestamp, i) => {
    return {
      timestamp,
      value: valuesArranged[i],
    }
  })
}


// this seems to have a bias when randomly shuffling 200,000+ values
// return [...values].sort(() => Math.random() - 0.5)

// using Fisher-Yates shuffle instead
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function arrangeValues(values: number[], options?: AssignValuesOptions) {
  if (options?.randomize) {
    const array = [...values]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return values
}
