import { createSamples } from "../../helpers/samples/createSamples.ts";
import { ONE_SECOND_IN_MS } from "../../helpers/time/time.constants.ts";
import { writeWithLog } from "../../helpers/write/writeWithLog.ts";

writeWithLog({
  metrics: [{
    samples: createSamples({
      shapes: [
        {
          type: `bellCurve`,
          range: [1, 100],
          entries: 100,
          attrs: {
            curvePeakAt: 50,
            normalizeAt: 90,
          }
        },
      ],
      time: {
        end: new Date().getTime(),
        interval: ONE_SECOND_IN_MS,
      },
    }),
    labels: {
      __name__: `fake_bellcurve_metric`,
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
