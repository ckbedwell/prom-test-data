import { Scenario } from "../../helpers/scenarios/scenarios.types.ts";

/*
One probe with a 90% success rate
all failures are at the end
expected results: 90% UPTIME, 90% REACHABILITY
probe1: 90% uptime
*/

export const ONE_PROBE_90PC: Scenario = {
  probes: 1,
  expectedUptime: 90,
  distribution: `overlap`,
}

/*
One probe with a 90% success rate
expected results: 90% UPTIME, 90% REACHABILITY
probe1: 90% uptime
failures are randomly distributed
*/
export const ONE_PROBE_90PC_RANDOM: Scenario = {
  probes: 1,
  expectedUptime: 90,
  distribution: "random",
}

/*
Twenty probes with a 50% success rate
expected results: ~99% UPTIME, 90% REACHABILITY
every probe: 50% uptime
failures are randomly distributed
*/
export const TWENTY_PROBE_50PC_RANDOM: Scenario = {
  probes: 20,
  expectedUptime: 50,
  distribution: "random",
}

/*
Twenty probes with a 50% success rate
expected results: 50% UPTIME, 50% REACHABILITY
every probe: 50% uptime
failures are randomly distributed
*/
export const TWENTY_PROBE_50PC_SHARED_RANDOM: Scenario = {
  probes: 20,
  expectedUptime: 50,
  distribution: "shared_random",
}

/*
Two probes, each with a 90% success rate with overlapping results
probe1 failures are at the end
probe2 failures are at the end
expected results: 90% UPTIME, 90% REACHABILITY
probe1: 90% uptime
probe2: 90% uptime
*/
export const TWO_PROBE_90PC_OVERLAP: Scenario = {
  probes: 2,
  expectedUptime: 90,
  distribution: "overlap",
}

/*
Two probes, each with a 90% success rate with overlapping results
probe1 failures are at the start
probe2 failures are at the end
expected results: 100% UPTIME, 90% REACHABILITY
probe1: 90% uptime
probe2: 90% uptime
*/

export const TWO_PROBE_90PC_NO_OVERLAP: Scenario = {
  probes: 2,
  expectedUptime: 90,
  distribution: "no_overlap",
}

/*
Two probes, each with a 90% success rate with individual random results
probe1 failures are at the start
probe2 failures are at the end
expected results: close to 100% UPTIME, 90% REACHABILITY
probe1: 90% uptime
probe2: 90% uptime
*/

export const TWO_PROBE_90PC_RANDOM: Scenario = {
  probes: 2,
  expectedUptime: 90,
  distribution: "random",
}

/*
Two probes, each with a 90% success rate with individual random results
probe1 failures are at the start
probe2 failures are at the end
expected results: close to 100% UPTIME, 90% REACHABILITY
probe1: 90% uptime
probe2: 90% uptime
*/

export const TWO_PROBE_90PC_SHARED_RANDOM: Scenario = {
  probes: 2,
  expectedUptime: 90,
  distribution: "shared_random",
}

/*
One probe with a 90% success rate but has 4 configurations with the same frequency
all failures are at the end
expected results: 90% UPTIME, 90% REACHABILITY
probe1: 90% uptime
*/

export const ONE_PROBE_90PC_4CONFIGS: Scenario = {
  probes: 1,
  expectedUptime: 90,
  distribution: `overlap`,
  configurations: 4,
}


/*
Two probes with a 90% success rate but has 4 configurations with the same frequency
probe1 failures are at the end
probe2 failures are at the end
expected results: 90% UPTIME, 90% REACHABILITY
probe1: 90% uptime
probe2: 90% uptime
*/

export const TWO_PROBE_90PC_4CONFIGS: Scenario = {
  probes: 2,
  expectedUptime: 90,
  distribution: `overlap`,
  configurations: 4,
}
