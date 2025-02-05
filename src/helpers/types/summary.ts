import { Sample } from "../samples/samples.types.ts"

export function summary(shape: Sample[]) {
  let count: Sample[] = []
  let sum: Sample[] = []

  shape.forEach(({ timestamp, value }, index) => {
    count.push({
      timestamp: timestamp,
      value: index + 1,
    })

    const lastValue = index > 0 ? sum[index - 1].value : 0

    sum.push({
      timestamp: timestamp,
      value: lastValue + value,
    })
  })

  return {
    count,
    sum,
  }
}
