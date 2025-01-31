export type Ran<T extends number> = number extends T ? number : _Range<T, []>
type _Range<T extends number, R extends unknown[]> = R["length"] extends T
  ? R[number] | T
  : _Range<T, [R["length"], ...R]>

type Distribution = `shared_random` | `overlap` | `no_overlap` | `random`

export type Scenario = {
  probes: number
  expectedUptime: Ran<100>
  distribution?: Distribution
  configurations?: number
}

