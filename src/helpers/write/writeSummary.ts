import { Sample } from "prometheus-remote-write/types.js"
import { summary } from "../types/summary.ts"
import { write } from "./write.ts"

export async function writeSummary(
  metricName: string,
  labels: Record<string, string>,
  samples: Sample[]
) {
  const { sum, count } = summary(samples)

  await write({
    samples: count,
    labels: {
      ...labels,
      __name__: `${metricName}_count`,
    },
  })

  await write({
    samples: sum,
    labels: {
      ...labels,
      __name__: `${metricName}_sum`,
    },
  })

  return {
    metricsWritten: [
      {
        metricName: `${metricName}_count`,
        samples: count,
      },
      {
        metricName: `${metricName}_sum`,
        samples: sum,
      },
    ],
  }
}
