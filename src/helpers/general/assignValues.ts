export function assignValues(values: number[], timestamps: number[]) {
  if (values.length !== timestamps.length) {
    throw new Error(`Values and timestamps must have the same length`)
  }

  return timestamps.map((timestamp, i) => {
    return {
      timestamp,
      value: values[i],
    }
  })
}
