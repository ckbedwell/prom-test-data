import { onTestFailed, test, TestOptions } from "vitest"

const DEFAULT_TEST_RUNS = 1000

type TestFn = () => void

export function testRandom(
  description: string,
  configOrFn: TestOptions | TestFn,
  testFn?: TestFn
) {
  const config = typeof configOrFn === 'function' ? {} : configOrFn
  const fn = typeof configOrFn === 'function' ? configOrFn : testFn

  test(description, { retry: config?.retry || 0, repeats: config?.repeats || DEFAULT_TEST_RUNS }, () => {
    fn?.()
  })
}