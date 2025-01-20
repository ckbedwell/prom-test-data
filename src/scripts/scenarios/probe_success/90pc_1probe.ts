import { sampleFromShapes } from "../../../helpers/samples/sampleFromShapes.ts"
import {
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from "../../../helpers/time/time.constants.ts"
import { percentSuccess } from "../../../helpers/scenarios/percentSuccess.ts"
import { writeProbeSuccess } from "../../../metrics/probe_success.ts"

// One probe with a 90% success rate
// expected results: 90% UPTIME, 90% REACHABILITY
// probe1: 90% uptime

const time = {
  end: new Date().getTime(),
  interval: ONE_MINUTE,
}

const shapes = percentSuccess({ percentage: 90, entries: 120 })

const inputs = {
  shapes,
  time,
}

const labels = {
  job: "whereevs",
  instance: "https://testinstance.com",
}

const samples = sampleFromShapes(inputs)

Promise.all([
  writeProbeSuccess({
    samples,
    labels: {
      ...labels,
      probe: "probe1",
    },
    writeToLog: {
      inputs,
    },
  }),
])
