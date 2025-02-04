type Time = string | number

export type Indices = Array<number | number[]>
export type TimeRanges = Array<Time | Time[]>

export type DropSamples = {
  indices?: Indices
  randomChance?: number
  timestamps?: TimeRanges
}

export type AssignValuesOptions = {
  randomize?: boolean
  dropSamples?: DropSamples
}
