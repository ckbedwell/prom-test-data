export function calculateSplits(totalLength: number, splits: number): number[] {
  const baseSplitSize = Math.floor(totalLength / splits)
  const remainder = totalLength % splits

  return Array(splits).fill(baseSplitSize).map((size, index) =>
    index < remainder ? size + 1 : size
  ).filter(Boolean)
}
