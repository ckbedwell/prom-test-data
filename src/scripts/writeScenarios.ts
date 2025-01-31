import { Sample } from 'prometheus-remote-write/types.js'
import { calculateTimestamps, EntryLessTime, FitTimeToShapeOptions, sampleFromShapes } from '../helpers/samples/sampleFromShapes.ts'
import { percentSuccess } from '../helpers/scenarios/percentSuccess.ts'
import { Scenario } from '../helpers/scenarios/scenarios.types.ts'
import { writeProbeSuccess, WriteProbeSuccess } from '../metrics/probe_success.ts'
import { TimeRange } from './timeRanges.ts'
import { calculateSplits } from './scenarios.utils.ts'
import { assignValues } from '../helpers/general/assignValues.ts'

export async function writeScenarios(scenarios: Scenario[], timeRanges: TimeRange[], labels: Record<string, string>) {
  let queue = [...scenarios]

  while (queue.length > 0) {
    const current = queue.shift()

    if (!current) {
      break
    }

    const generated = generateScenario(current, timeRanges, labels)

    while (generated.length > 0) {
      const scenario = generated.shift()

      if (!scenario) {
        break
      }

      const { isolate, probe, config } = scenario.labels
      const filename = [isolate, probe, config].filter(Boolean).join("_")

      await writeProbeSuccess(scenario, {
        filename
      })
    }
  }
}

function generateScenario(scenario: Scenario, timeRanges: TimeRange[], labels: Record<string, string>) {
  let toWrite: WriteProbeSuccess[] = [];

  timeRanges.forEach(({ time, entries, ref }) => {
    const { probes, expectedUptime, distribution = `overlap`, configurations = 1 } = scenario
    const shapes = percentSuccess({ percentage: expectedUptime, entries })

    let inputs: FitTimeToShapeOptions = {
      shapes,
      time,
    }

    let samples: Sample[] = []

    if (distribution === "overlap") {
      samples = sampleFromShapes({
        shapes,
        time,
      })
    }

    if (distribution === "shared_random") {
      samples = sampleFromShapes({
        shapes,
        time,
        options: {
          randomize: true
        }
      })
    }

    let isolate = `${ref}_${probes}p_${distribution}`

    if (configurations > 1) {
      isolate += `_${configurations}c`
    }

    for (let i = 0; i < probes; i++) {
      if (distribution === "no_overlap") {
        let shapesTouse = shapes
        // alternate between start and end for now
        if (i % 2 !== 0) {
          shapesTouse = shapes.slice().reverse()
        }

        samples = sampleFromShapes({
          shapes: shapesTouse,
          time,
        })
      }

      if (distribution === "random") {
        samples = sampleFromShapes({
          ...inputs,
          options: {
            randomize: true
          }
        })
      }

      if (!samples) {
        throw new Error(`Unknown distribution ${distribution} for scenario ${scenario}`)
      }

      const output: WriteProbeSuccess = {
        samples: reassignTimeValuesPerProbe(samples, time),
        labels: {
          ...labels,
          probe: `probe${i + 1}`,
          isolate,
        },
        writeToLog: {
          inputs,
        },
      }

      splitAcrossConfigs(output, configurations).forEach((config) => {
        toWrite.push(config)
      })
    }
  })

  return toWrite
}

function splitAcrossConfigs(input: WriteProbeSuccess, configs: number) {
  const { samples, labels } = input
  const configSizes = calculateSplits(samples.length, configs)


  return configSizes.map((size, i) => {
    return {
      ...input,
      samples: samples.slice(i * size, (i + 1) * size),
      labels: {
        ...labels,
        config: String(i + 1),
      },
    }
  })
}

// not very performant to re-do this but whatevs
function reassignTimeValuesPerProbe(samples: Sample[], time: EntryLessTime) {
  const values = samples.map(({ value }) => value)
  const timestamps = calculateTimestamps(
    time,
    samples.length,
  )

  return assignValues(values, timestamps)
}
