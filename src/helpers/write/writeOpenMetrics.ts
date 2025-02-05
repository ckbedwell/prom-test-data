import path from 'path'
import { MetricToWrite, WriteOptions } from "./write.types.ts";
import { mkdir, writeFileSync, existsSync } from "node:fs"
import { getFileName } from "./write.utils.ts";
import { runBackfill } from "./runBackfill.ts";
import { Sample } from '../samples/samples.types.ts';

export async function writeOpenMetrics(input: MetricToWrite[], options?: WriteOptions) {
  const openMetricsDir = path.resolve(`./src/docker/input`)

  if (!existsSync(openMetricsDir)) {
    mkdir(openMetricsDir, {}, (err) => {
      if (err) {
        console.error(`Error creating directory ${openMetricsDir}:  ${err}`)
      }
    })
  }

  const fileName = `${getFileName(options)}.txt`
  const filePath = path.resolve(`./src/docker/input/${fileName}`)

  try {
    writeFileSync(filePath, writeOutput(input))
    console.log(`Wrote OpenMetrics to ${filePath}`)

    // occasionally it errors out and the backfill says it can't find the file
    // despite the the file being there.
    await new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        clearTimeout(timeout)
        clearInterval(interval)
        reject(`couldn't find file ${filePath}`)
      }, 1000)

      let interval = setInterval(() => {
        if (existsSync(filePath)) {
          clearTimeout(timeout)
          clearInterval(interval)
          resolve(true)
        }
      }, 5)
    })

    await runBackfill(fileName)
    return filePath
  } catch (err) {
    console.error(`Error writing file ${filePath}:  ${err}`)
    throw err
  }
}


export function writeOutput(input: MetricToWrite[]) {
  const metricsInput = input.map(writeMetric)
  const metricsString = metricsInput.join('\n')
  const withEOF = `${metricsString}\n# EOF\n`

  return withEOF
}

export function writeMetric({ labels, samples, meta }: MetricToWrite) {
  const header = `# TYPE ${labels.__name__} ${meta.type}`
  const { __name__, ...restLabels } = labels
  const labelsString = formatLabels(restLabels)
  const lines = samples.map((sample) => writeSampleLine({ name: __name__, labels: labelsString, sample }))

  return [header, ...lines].join('\n')
}

export function writeSampleLine({ labels, name, sample }: { name: string, labels: string, sample: Sample }) {
  const timestamp = Math.floor(new Date(sample.timestamp!).getTime() / 1000)
  return `${name}${labels} ${sample.value} ${timestamp}`
}


export function formatLabels(labels: Record<string, string>): string {
  const labelPairs = Object.entries(labels)
    .map(([key, value]) => `${key}="${value}"`)
    .join(',')
  return labelPairs.length ? `{${labelPairs}}` : ''
}