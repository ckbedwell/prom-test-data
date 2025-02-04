import { createSamples } from "../../helpers/samples/createSamples.ts";
import { ONE_SECOND_IN_MS } from "../../helpers/time/time.constants.ts";
import { writeWithLog } from "../../helpers/write/writeWithLog.ts";

const labels = {
  __name__: `fake_line_metric`,
  job: `prom_test_data`,
  instance: `https://testinstance.com`,
}

writeWithLog({
  metrics: [{
    samples: createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 100],
          entries: 100,
        }
      ],
      time: {
        end: new Date().getTime(),
        interval: ONE_SECOND_IN_MS,
      },
    }),
    labels: {
      ...labels,
      direction: `up`,
    },
    meta: {
      type: `gauge`,
    },
  },
  {
    samples: createSamples({
      shapes: [
        {
          type: `line`,
          range: [100, 1],
          entries: 100,
        }
      ],
      time: {
        end: new Date().getTime(),
        interval: ONE_SECOND_IN_MS,
      },
    }),
    labels: {
      ...labels,
      direction: `down`,
    },
    meta: {
      type: `gauge`,
    },
  }
  ],
  options: {
    method: `backfill`
  }
})
