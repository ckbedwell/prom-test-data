import { Sample } from "prometheus-remote-write/types.js"
import { writeLogFile } from "../log/writeLogFile.ts"
import {
  FitTimeToShapeOptions,
  sampleFromShapes,
} from "../samples/sampleFromShapes.ts"
import { write } from "./write.ts"

type MetricWritten = {
  metricName: string
  samples: Sample[]
}

export async function writeWithLog({
  inputs,
  labels,
  metricName,
  callback,
}: {
  inputs: FitTimeToShapeOptions[]
  labels: Record<string, string>
  metricName: string
  callback?: (
    samples: Sample[],
    labels: Record<string, string>
  ) => Promise<{ metricsWritten: MetricWritten[] }>
}) {
  const samples = generateSamples(inputs)

  const result = await write({
    samples,
    labels: {
      ...labels,
      __name__: metricName,
    },
  })

  const callbackRes = (await callback?.(samples, labels)) ?? {
    metricsWritten: [],
  }
  const metricsWritten = generateMetricsWritten([
    {
      metricName,
      samples,
    },
    ...callbackRes.metricsWritten,
  ])

  writeLogFile({
    inputs,
    ...metricsWritten,
    labels,
    result,
  })
}

function generateSamples(inputs: FitTimeToShapeOptions[]): Sample[] {
  return inputs
    .map((input) => {
      return sampleFromShapes(input)
    })
    .flat()
}

function generateMetricsWritten(metricsWritten: MetricWritten[]) {
  return metricsWritten.reduce((acc, { metricName, samples }) => {
    return {
      ...acc,
      [metricName]: readableTimeStamps(samples),
    }
  }, {})
}

function readableTimeStamps(samples: Sample[]) {
  return samples.map(({ timestamp, value }) => ({
    timestamp: new Date(timestamp!).toISOString(),
    value,
  }))
}
