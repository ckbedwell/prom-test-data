import { FitTimeToShapeOptions } from "../../helpers/samples/sampleFromShapes.ts"
import {
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from "../../helpers/time/time.constants.ts"
import { percentSuccess } from "../../helpers/scenarios/percentSuccess.ts"
import { writeWithLog } from "../../helpers/write/writeWithLog.ts"
import { Sample } from "prometheus-remote-write/types.js"
import { writeSummary } from "../../helpers/write/writeSummary.ts"

const end = new Date().getTime()

const samplesInput: FitTimeToShapeOptions[] = [
  {
    shapes: percentSuccess({ percentage: 90, entries: 40 }),
    time: {
      end,
      interval: ONE_SECOND * 15,
    },
  },
]

writeWithLog({
  inputs: samplesInput,
  metricName: "probe_success",
  labels: {
    job: "test_job",
    instance: "https://testinstance.com",
    probe: "probe1",
  },
  callback: (samples: Sample[], labels: Record<string, string>) =>
    writeSummary(`probe_all_success`, labels, samples),
})

writeWithLog({
  inputs: samplesInput,
  metricName: "probe_success",
  labels: {
    job: "test_job",
    instance: "https://testinstance.com",
    probe: "probe2",
  },
  callback: (samples: Sample[], labels: Record<string, string>) =>
    writeSummary(`probe_all_success`, labels, samples),
})
