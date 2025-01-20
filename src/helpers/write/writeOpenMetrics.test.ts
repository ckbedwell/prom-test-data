import { expect, describe, test } from 'vitest'
import { formatLabels, writeMetric, writeOutput, writeSampleLine } from './writeOpenMetrics.ts'

describe(`writeOpenMetrics`, () => {
  describe(`formatLabels`, () => {
    test(`1 label`, () => {
      expect(formatLabels({
        foo: 'bar',
      })).toBe('{foo="bar"}')
    })

    test(`2 labels`, () => {
      expect(formatLabels({
        foo: 'bar',
        baz: 'qux',
      })).toBe('{foo="bar",baz="qux"}')
    })


    test(`5 labels`, () => {
      expect(formatLabels({
        foo: 'bar',
        baz: 'qux',
        quux: 'corge',
        grault: 'garply',
        waldo: 'fred',
      })).toBe('{foo="bar",baz="qux",quux="corge",grault="garply",waldo="fred"}')
    })
  })

  describe(`writeSampleLine`, () => {
    test(`sample with timestamp`, () => {
      expect(writeSampleLine({
        name: 'probe_success',
        labels: '{foo="bar"}',
        sample: {
          value: 1,
          timestamp: new Date('2025-01-17T13:54:39.833Z').getTime(),
        },
      })).toBe('probe_success{foo="bar"} 1 1737122079')
    })
  })

  describe(`writeMetric`, () => {
    test(`1 sample`, () => {
      expect(writeMetric({
        labels: {
          __name__: 'probe_success',
          foo: 'bar',
        },
        samples: [{
          value: 1,
          timestamp: new Date('2025-01-17T13:55:00.000Z').getTime(),
        }],
        meta: {
          type: 'gauge',
        },
      })).toBe(`# TYPE probe_success gauge\nprobe_success{foo="bar"} 1 1737122100`)
    })

    test(`2 samples`, () => {
      expect(writeMetric({
        labels: {
          __name__: 'probe_success',
          foo: 'bar',
        },
        samples: [{
          value: 1,
          timestamp: new Date('2025-01-17T13:55:00.000Z').getTime(),
        },
        {
          value: 2,
          timestamp: new Date('2025-01-17T14:00:00.000Z').getTime(),
        }],
        meta: {
          type: 'gauge',
        },
      })).toBe(`# TYPE probe_success gauge\nprobe_success{foo="bar"} 1 1737122100\nprobe_success{foo="bar"} 2 1737122400`)
    })
  })

  describe(`writeOutput`, () => {
    test(`1 metric`, () => {
      expect(writeOutput([{
        labels: {
          __name__: 'probe_success',
          foo: 'bar',
        },
        samples: [{
          value: 1,
          timestamp: new Date('2025-01-17T13:54:39.833Z').getTime(),
        }],
        meta: {
          type: 'gauge',
        },
      }])).toBe(`# TYPE probe_success gauge\nprobe_success{foo="bar"} 1 1737122079\n# EOF\n`)
    })

    test(`2 metrics`, () => {
      expect(writeOutput([{
        labels: {
          __name__: 'probe_success',
          foo: 'bar',
        },
        samples: [{
          value: 1,
          timestamp: new Date('2025-01-17T13:54:39.833Z').getTime(),
        }],
        meta: {
          type: 'gauge',
        },
      },
      {
        labels: {
          __name__: 'probe_all_success_count',
          foo: 'bar',
        },
        samples: [{
          value: 1,
          timestamp: new Date('2025-01-17T13:54:39.833Z').getTime(),
        }],
        meta: {
          type: 'counter',
        },
      }])).toBe(`# TYPE probe_success gauge\nprobe_success{foo="bar"} 1 1737122079\n# TYPE probe_all_success_count counter\nprobe_all_success_count{foo="bar"} 1 1737122079
# EOF\n`)
    })
  })
})
