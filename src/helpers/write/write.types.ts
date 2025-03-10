import { Sample } from "../samples/samples.types.ts"

export type Labels = Record<string, string> & {
  __name__: string
}

export type MetricMeta = {
  type: 'gauge' | 'counter' | 'histogram'
  help?: string
}

export interface MetricToWrite {
  labels: Labels
  samples: Sample[]
  meta: MetricMeta
}

export interface WriteOptions {
  method?: `backfill` | `remote`
  filename?: string
}
