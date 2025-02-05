import { createSamples } from "../../helpers/samples/createSamples.ts"
import { ONE_DAY_IN_MINUTES, ONE_MINUTE_IN_MS, ONE_MONTH_IN_MINUTES, ONE_MONTH_IN_MS } from "../../helpers/time/time.constants.ts"
import { writeProbeSuccess } from "../../metrics/probe_success.ts"

const labels = {
  job: "test_job",
  instance: "https://testinstance.com",
  isolate: "six",
}

for (let i = 0; i < 2; i++) {
  writeProbeSuccess({
    samples: createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 1],
        },
      ],
      time: {
        start: new Date(`2024-01-20T12:00:00`).getTime(),
        interval: ONE_MINUTE_IN_MS,
        end: new Date(`2024-07-20T12:00:00`).getTime(),
      },
    }),
    labels: {
      ...labels,
      probe: `probe${i + 1}`,
    },
  }, {
    filename: `2p_90pc_overlap_1_p${i}`,
  })

  writeProbeSuccess({
    samples: createSamples({
      shapes: [
        {
          type: `line`,
          range: [1, 1],
          entries: ONE_MONTH_IN_MINUTES * 5,
        },
        {
          type: `line`,
          range: [0, 0],
          entries: ONE_DAY_IN_MINUTES * 15,
        },
        {
          type: `line`,
          range: [1, 1],
          entries: ONE_DAY_IN_MINUTES * 7,
        },
        {
          type: `line`,
          range: [0, 0],
          entries: ONE_DAY_IN_MINUTES * 8,
        }
      ],
      time: {
        start: new Date(`2024-07-20T12:00:00`).getTime() + ONE_MINUTE_IN_MS,
        interval: ONE_MINUTE_IN_MS,
      },
    }),
    labels: {
      ...labels,
      probe: `probe${i + 1}`,
    },
  }, {
    filename: `2p_90pc_overlap_2_p${i}`,
  })
}