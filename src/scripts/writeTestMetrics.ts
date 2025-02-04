import { sampleFromTime } from "../helpers/samples/sampleFromTime.ts";
import { ONE_DAY_IN_MS, ONE_SECOND_IN_MS } from "../helpers/time/time.constants.ts";
import { summary } from "../helpers/types/summary.ts";
import { writeWithLog } from "../helpers/write/writeWithLog.ts";

const labels = {
  job: "prom_test_data",
  instance: "https://testinstance.com",
  variation: `persecond`
}

const samples = sampleFromTime({
  shapes: [
    {
      type: `line`,
      range: [0, 86400],
    }
  ],
  time: {
    end: new Date().getTime(),
    start: new Date().getTime() - ONE_DAY_IN_MS,
    interval: ONE_SECOND_IN_MS,
  },
})

const { count, sum } = summary(samples)

await writeWithLog({
  metrics: [
    {
      samples: count,
      labels: {
        ...labels,
        __name__: `fake_metric_all_count`,
      },
      meta: {
        type: `counter`,
      }
    },
    {
      samples: sum,
      labels: {
        ...labels,
        __name__: `fake_metric_all_sum`,
      },
      meta: {
        type: `counter`,
      }
    },
    {
      samples,
      labels: {
        ...labels,
        __name__: `fake_metric`,
      },
      meta: {
        type: `gauge`,
      }
    }
  ],
  options: {
    filename: `fake_metric`,
  }
})