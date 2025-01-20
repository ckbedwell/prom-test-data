import { Sample } from "prometheus-remote-write/types.js";
import path from 'path'
import { MetricToWrite } from "./write.types.ts";
import { mkdir, writeFileSync, existsSync } from "node:fs"
import { sanitizeFileName } from "./write.utils.ts";
import { runBackfill } from "./runBackfill.ts";

export async function writeOpenMetrics(input: MetricToWrite[]) {
  const openMetricsDir = path.resolve(`./open_metrics`)

  if (!existsSync(openMetricsDir)) {
    mkdir(openMetricsDir, {}, (err) => {
      if (err) {
        console.error(`Error creating directory ${openMetricsDir}:  ${err}`)
      }
    })
  }

  const timestamp = new Date().toISOString()
  const sanitizedTimestamp = sanitizeFileName(timestamp)
  const fileName = `${sanitizedTimestamp}.txt`
  const filePath = path.resolve(`./open_metrics/${fileName}`)


  try {
    writeFileSync(filePath, writeOutput(input))
    console.log(`Wrote OpenMetrics to ${filePath}`)
    await runBackfill(filePath)
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