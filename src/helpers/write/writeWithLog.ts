import { Sample } from "prometheus-remote-write/types.js"
import { writeLogFile } from "../log/writeLogFile.ts"
import { write } from "./write.ts"

type MetricWritten = {
  metricName: string
  samples: Sample[]
}

interface WriteWithLog {
  samples: Sample[]
  labels: Record<string, string>
  metricName: string
  writeToLog?: Record<string, unknown>
  callback?: (
    samples: Sample[],
    labels: Record<string, string>
  ) => Promise<{ metricsWritten: MetricWritten[] }>
}

export async function writeWithLog({
  samples,
  labels,
  metricName,
  writeToLog = {},
  callback,
}: WriteWithLog) {
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
    result,
    labels,
    ...writeToLog,
    ...metricsWritten,
  })
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
