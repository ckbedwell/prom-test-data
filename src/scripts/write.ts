import { Sample } from "prometheus-remote-write/types.js"
import { writeLogFile } from "../helpers/log/writeLogFile.ts"
import {
  FitTimeToShapeOptions,
  sampleFromShapes,
} from "../helpers/samples/sampleFromShapes.ts"
import {
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from "../helpers/time/time.constants.ts"
import { writeWithLog } from "../helpers/write/writeWithLog.ts"

const samplesInput: FitTimeToShapeOptions = {
  shapes: [
    {
      entries: 600,
      range: [0, 0],
    },
    {
      entries: 600,
      range: [600, 1],
    },
  ],
  time: {
    end: new Date().getTime() - ONE_HOUR * 48,
    interval: ONE_MINUTE / 2,
  },
}

const labels = {
  __name__: "probe_success",
  job: "test_job",
  instance: "test_instance",
  random: "grain",
}

writeWithLog({
  input: samplesInput,
  labels,
})
