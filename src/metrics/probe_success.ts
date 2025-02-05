import { writeWithLog } from "../helpers/write/writeWithLog.ts"
import { summary } from "../helpers/types/summary.ts"
import { MetricToWrite, WriteOptions } from "../helpers/write/write.types.ts"
import { DropSamples } from "../helpers/general/assignValues.types.ts"
import { assignTimestampsToValues } from "../helpers/general/assignValues.ts"
import { Sample } from "../helpers/samples/samples.types.ts"

export type WriteProbeSuccess = {
  samples: Sample[]
  labels: Record<string, string>
  writeToLog?: Record<string, unknown>
  dropSamples?: DropSamples
}


export function writeProbeSuccess({
  samples: __samples,
  labels,
  writeToLog,
  dropSamples,
}: WriteProbeSuccess, options?: WriteOptions) {
  const samples = dropMetrics(__samples, dropSamples)
  const { sum: __sum, count: __count } = summary(__samples)
  const sum = dropMetrics(__sum, dropSamples)
  const count = dropMetrics(__count, dropSamples)

  const metrics: MetricToWrite[] = [
    {
      samples,
      labels: {
        ...labels,
        __name__: `probe_success`,
      },
      meta: {
        type: `gauge`,
      }
    },
    ...generateSummary({ count, sum, labels }),
  ]

  return writeWithLog({
    metrics: metrics,
    writeToLog,
    options,
  })
}

function generateSummary({ count, sum, labels }: { count: Sample[], sum: Sample[], labels: Record<string, string> }) {
  const summary: MetricToWrite[] = [
    {
      samples: count,
      labels: {
        ...labels,
        __name__: `probe_all_success_count`,
      },
      meta: {
        type: `counter`,
      }
    },
    {
      samples: sum,
      labels: {
        ...labels,
        __name__: `probe_all_success_sum`,
      },
      meta: {
        type: `counter`,
      }
    }
  ]

  return summary
}

function dropMetrics(__samples: Sample[], dropSamples?: DropSamples) {
  if (!dropSamples) {
    return __samples
  }

  const values = __samples.map(({ value }) => value)
  const timestamps = __samples.map(({ timestamp }) => timestamp)

  return assignTimestampsToValues(timestamps, values, dropSamples)
}
