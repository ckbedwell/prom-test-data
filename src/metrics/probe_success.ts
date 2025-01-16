import { Sample } from "prometheus-remote-write/types.js"
import { FitTimeToShapeOptions } from "../helpers/samples/sampleFromShapes.ts"
import { writeSummary } from "../helpers/write/writeSummary.ts"
import { writeWithLog } from "../helpers/write/writeWithLog.ts"

export function writeProbeSuccess({
  samples,
  labels,
  writeToLog,
}: {
  samples: Sample[]
  labels: Record<string, string>
  writeToLog?: Record<string, unknown>
}) {
  return writeWithLog({
    samples,
    metricName: "probe_success",
    labels,
    writeToLog,
    callback: (samples, labels) => {
      return writeSummary("probe_all_success", labels, samples)
    },
  })
}
