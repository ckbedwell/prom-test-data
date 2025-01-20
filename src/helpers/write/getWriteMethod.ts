import { log } from "../log/log.ts"
import { MetricToWrite, WriteOptions } from "./write.types.ts"

export function getWriteMethod(metrics: MetricToWrite[], options?: WriteOptions): WriteOptions[`method`] {
  if (options?.method === `backfill`) {
    return `backfill`
  }

  const { result, range, limit } = metricRangeTooLarge(metrics)

  if (metricsTooOld(metrics)) {
    log(`Metrics too old, writing to backfill`)
    return `backfill`
  }

  if (result) {
    const formatRangeInMins = (range / 1000 / 60).toFixed(2)
    log(`Metric range too large (${formatRangeInMins}m), writing to backfill`)
    return `backfill`
  }

  return `remote`
}

function metricsTooOld(metrics: MetricToWrite[]) {
  const TWO_HOURS_AGO = new Date().getTime() - 2 * 60 * 60 * 1000

  return metrics.some(({ samples }) => samples.some(({ timestamp }) => timestamp! < TWO_HOURS_AGO))
}

function metricRangeTooLarge(metrics: MetricToWrite[]) {
  const TEN_MINUTES = 10 * 60 * 1000
  const RANGE = TEN_MINUTES

  const oldest = getOldestMetric(metrics)
  const mostRecent = getMostRecentMetric(metrics)

  const range = mostRecent.timestamp! - oldest.timestamp!
  const result = range > RANGE

  return {
    result,
    range,
    limit: `10m`,
  }
}

function getOldestMetric(metrics: MetricToWrite[]) {
  const oldestMetric = metrics.reduce((oldest, metric) => {
    const metricOldestSample = metric.samples.reduce((oldestSample, sample) => {
      return oldestSample.timestamp! < oldestSample.timestamp! ? oldestSample : sample
    })

    return oldest.timestamp! < metricOldestSample.timestamp! ? oldest : metricOldestSample
  }, metrics[0].samples[0])

  return oldestMetric
}

function getMostRecentMetric(metrics: MetricToWrite[]) {
  const mostRecentMetric = metrics.reduce((mostRecent, metric) => {
    const metricMostRecentSample = metric.samples.reduce((mostRecentSample, sample) => {
      return mostRecentSample.timestamp! > mostRecentSample.timestamp! ? mostRecentSample : sample
    })

    return mostRecent.timestamp! > metricMostRecentSample.timestamp! ? mostRecent : metricMostRecentSample
  }, metrics[0].samples[0])

  return mostRecentMetric
}