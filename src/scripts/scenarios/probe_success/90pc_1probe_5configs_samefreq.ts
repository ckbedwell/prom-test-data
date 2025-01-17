import { sampleFromShapes } from "../../../helpers/samples/sampleFromShapes.ts"
import {
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from "../../../helpers/time/time.constants.ts"
import { percentSuccess } from "../../../helpers/scenarios/percentSuccess.ts"
import { writeProbeSuccess } from "../../../metrics/probe_success.ts"
import { Sample } from "prometheus-remote-write/types.js"

// One probe with a 90% success rate but has 5 configurations with the same frequency
// expected results: 90% UPTIME, 90% REACHABILITY
// probe1: 90% uptime

const interval = ONE_SECOND * 12

const time = {
  end: new Date().getTime(),
  interval,
}

const shapes = percentSuccess({ percentage: 90, entries: 10 })

const inputs = {
  shapes,
  time,
}

const labels = {
  job: "test_job3",
  instance: "https://testinstance.com",
  config_version: "0",
}

const samples = sampleFromShapes(inputs)

const entries = generateArgs(
  {
    samples,
    labels,
  },
  4
)

while (entries.length) {
  await new Promise((resolve) => {
    setTimeout(async () => {
      resolve(writeProbeSuccess(entries.pop()!))
    }, 1)
  })
}

interface Input {
  inputs?: Record<string, unknown>
  samples: Sample[]
  labels: Record<string, string>
  writeToLog?: Record<string, unknown>
}

function generateArgs(args: Input, configVersions: number) {
  const arr = [args]

  for (let i = 0; i < configVersions; i++) {
    const end = arr[i].samples[0].timestamp! - interval

    arr.push(generateEntry(end, i))
  }

  return arr
}

function generateEntry(end: number, configVersion: number): Input {
  const inputs = {
    shapes,
    time: {
      interval: time.interval,
      end,
    },
  }

  return {
    inputs,
    samples: sampleFromShapes(inputs),
    labels: {
      ...labels,
      config_version: String(configVersion + 1),
    },
  }
}
