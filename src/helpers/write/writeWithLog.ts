import { writeLogFile } from "../log/writeLogFile.ts"
import { remoteWrite } from "./remoteWrite.ts"
import { MetricToWrite, WriteOptions } from "./write.types.ts"
import { writeOpenMetrics } from "./writeOpenMetrics.ts"
import { getWriteMethod } from "./getWriteMethod.ts"
import { Sample } from "../samples/samples.types.ts"

interface WriteWithLog {
  metrics: MetricToWrite[]
  writeToLog?: Record<string, unknown>
  options?: WriteOptions,
}

export async function writeWithLog({
  metrics,
  writeToLog = {},
  options,
}: WriteWithLog) {
  const writeMethod = await write(metrics, options)

  const metricsWritten = metrics.reduce((acc, { labels, samples }) => {
    const { __name__, ...restLabels } = labels

    return {
      ...acc,
      [__name__]: {
        labels: restLabels,
        samples: readableTimeStamps(samples)
      },
    }
  }, {})

  writeLogFile({
    writeMethod: {
      requested: options?.method,
      used: writeMethod
    },
    ...writeToLog,
    ...metricsWritten,
  }, options)
}

async function write(metrics: MetricToWrite[], options?: WriteOptions) {
  const writeMethod = getWriteMethod(metrics, options)

  if (writeMethod === `backfill`) {
    await writeOpenMetrics(metrics, options)
    return `backfill`
  }

  await Promise.all(metrics.map(metrics => remoteWrite(metrics)))

  return `remoteWrite`
}


function readableTimeStamps(samples: Sample[]) {
  return samples.map(({ timestamp, value }) => ({
    timestamp: new Date(timestamp!).toISOString(),
    value,
  }))
}
