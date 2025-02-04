import { createSamples } from "../../helpers/samples/createSamples.ts";
import { ONE_SECOND_IN_MS } from "../../helpers/time/time.constants.ts";
import { writeWithLog } from "../../helpers/write/writeWithLog.ts";

writeWithLog({
  metrics: [{
    samples: createSamples({
      shapes: [
        {
          type: `random`,
          range: [1, 100],
          entries: 100,
        },
      ],
      time: {
        end: new Date().getTime(),
        interval: ONE_SECOND_IN_MS,
      },
    }),
    labels: {
      __name__: `fake_random_metric`,
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
