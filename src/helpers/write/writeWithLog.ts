import { Sample } from "prometheus-remote-write/types.js"
import { writeLogFile } from "../log/writeLogFile.ts"
import { remoteWrite } from "./remoteWrite.ts"
import { MetricToWrite, WriteOptions } from "./write.types.ts"
import { writeOpenMetrics } from "./writeOpenMetrics.ts"

interface WriteWithLog {
  metrics: MetricToWrite[]
  writeToLog?: Record<string, unknown>
  options?: WriteOptions,
}

export async function writeWithLog({
  metrics,
  writeToLog = {},
  options = { method: `remote` },
}: WriteWithLog) {
  await write(metrics, options)

  const metricsWritten = metrics.map(({ labels, samples }, i) => {
    return {
      labels,
      metricName: labels.__name__,
      samples: readableTimeStamps(samples),
    }
  })

  writeLogFile({
    ...writeToLog,
    ...metricsWritten,
  })
}

function write(metrics: MetricToWrite[], options: WriteOptions) {
  if (options.method === `remote`) {
    return Promise.all(metrics.map(metrics => remoteWrite(metrics)))
  }

  return writeOpenMetrics(metrics)
}

function readableTimeStamps(samples: Sample[]) {
  return samples.map(({ timestamp, value }) => ({
    timestamp: new Date(timestamp!).toISOString(),
    value,
  }))
}
