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

function arrangeValues(values: number[], options?: AssignValuesOptions) {
  if (options?.randomize) {
    return [...values].sort(() => Math.random() - 0.5)
  }

  return values
}
