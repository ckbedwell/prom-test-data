import { createSamples } from "../../helpers/samples/createSamples.ts";
import { ONE_SECOND_IN_MS } from "../../helpers/time/time.constants.ts";
import { writeWithLog } from "../../helpers/write/writeWithLog.ts";

writeWithLog({
  metrics: [{
    samples: createSamples({
      shapes: [
        {
          type: `curve`,
          range: [1, Infinity],
          entries: 100,
          attrs: {
            rate: 0.1,
          }
        },
      ],
      time: {
        end: new Date().getTime(),
        interval: ONE_SECOND_IN_MS,
      },
    }),
    labels: {
      __name__: `fake_curve_metric`,
      job: `prom_test_data`,
      instance: `https://testinstance.com`,
    },
    meta: {
      type: `gauge`,
    },
  }],
  options: {
    method: `backfill`
  }
})
