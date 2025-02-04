import { createSamples } from "../../helpers/samples/createSamples.ts";
import { ONE_SECOND_IN_MS } from "../../helpers/time/time.constants.ts";
import { writeWithLog } from "../../helpers/write/writeWithLog.ts";

writeWithLog({
  metrics: [{
    samples: createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 12528],
          entries: 100
        },
        {
          type: `curve`,
          range: [12528, 1],
          entries: 100,
          attrs: {
            rate: 0.1,
          }
        },
        {
          type: `bellCurve`,
          range: [1, 12528],
          entries: 100,
          attrs: {
            curvePeakAt: 50,
            normalizeAt: 90,
            stdDevFactor: 6
          }
        },
        {
          type: `random`,
          range: [1, 12528],
          entries: 100
        },
      ],
      time: {
        end: new Date().getTime(),
        interval: ONE_SECOND_IN_MS,
      },
    }),
    labels: {
      __name__: `fake_multi_metric`,
      job: `prom_test_data`,
      instance: `https://testinstance.co.uk`,
    },
    meta: {
      type: `gauge`,
    },
  }],
  options: {
    method: `backfill`
  }
})
