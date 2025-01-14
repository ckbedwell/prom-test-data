import { pushTimeseries, Sample } from "prometheus-remote-write"

import { config } from "./config.ts"
import { log } from "../log/log.ts"

type Labels = Record<string, string> & {
  __name__: string
}

interface Write {
  labels: Labels
  samples: Sample[]
}

export function write({ labels, samples }: Write) {
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
