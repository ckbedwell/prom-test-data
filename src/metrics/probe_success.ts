import { Sample } from "prometheus-remote-write/types.js"
import { writeWithLog } from "../helpers/write/writeWithLog.ts"
import { summary } from "../helpers/types/summary.ts"
import { MetricToWrite, WriteOptions } from "../helpers/write/write.types.ts"

export function writeProbeSuccess({
  samples,
  labels,
  writeToLog,
  options,
}: {
  samples: Sample[]
  labels: Record<string, string>
  writeToLog?: Record<string, unknown>
  options?: WriteOptions
}) {
  const { sum, count } = summary(samples,)

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
