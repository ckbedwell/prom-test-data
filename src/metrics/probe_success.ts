import { FitTimeToShapeOptions } from "../helpers/samples/sampleFromShapes.ts"
import { writeSummary } from "../helpers/write/writeSummary.ts"
import { writeWithLog } from "../helpers/write/writeWithLog.ts"

export function writeProbeSuccess({
  inputs,
  labels,
}: {
  inputs: FitTimeToShapeOptions[]
  labels: Record<string, string>
}) {
  return writeWithLog({
    inputs,
    metricName: "probe_success",
    labels,
    callback: (samples, labels) => {
      return writeSummary("probe_all_success", labels, samples)
    },
  })
}
