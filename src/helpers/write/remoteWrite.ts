import { pushTimeseries, Sample } from "prometheus-remote-write"

import { config } from "./config.ts"
import { log } from "../log/log.ts"
import { Labels } from "./write.types.ts"


interface Write {
  labels: Labels
  samples: Sample[]
}

export function remoteWrite({ labels, samples }: Write) {
  return pushTimeseries(
    {
      labels,
      samples,
    },
    config
  ).then((response) => {
    log(response)
    return response
  })
}
