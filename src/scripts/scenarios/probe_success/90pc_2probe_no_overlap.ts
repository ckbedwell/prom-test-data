import {
  FitTimeToShapeOptions,
  sampleFromShapes,
} from "../../../helpers/samples/sampleFromShapes.ts"
import {
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from "../../../helpers/time/time.constants.ts"
import { percentSuccess } from "../../../helpers/scenarios/percentSuccess.ts"
import { writeProbeSuccess } from "../../../metrics/probe_success.ts"

// Two probes, each with a 90% success rate but do not overlap their failure results
// probe1 failures are at the end
// probe2 failures are at the beginning
// expected results: 100% UPTIME, 90% REACHABILITY
// probe1: 90% uptime
// probe2: 90% uptime

const time = {
  end: new Date().getTime(),
  interval: ONE_SECOND * 15,
}

const shapes = percentSuccess({ percentage: 90, entries: 40 })
const labels = {
  job: "test_job",
  instance: "https://testinstance.com",
}

Promise.all([
  writeProbeSuccess({
    inputs: [
      {
        shapes,
        time,
      },
    ],
    labels: {
      ...labels,
      probe: "probe1",
    },
  }),
  writeProbeSuccess({
    inputs: [
      {
        time,
        shapes: [...shapes].reverse(),
      },
    ],
    labels: {
      ...labels,
      probe: "probe2",
    },
  }),
])

// 90pc_2probe_no_overlap.ts
