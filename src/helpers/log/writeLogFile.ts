import { mkdir, writeFile, existsSync } from "node:fs"
import path from "path"
import { getFileName } from "../write/write.utils.ts"
import { WriteOptions } from "../write/write.types.ts"

export function writeLogFile(input: Object, options?: WriteOptions) {
  const logsDir = path.resolve(`./logs`)

  if (!existsSync(logsDir)) {
    mkdir(logsDir, {}, (err) => {
      if (err) {
        console.error(`Error creating directory ${logsDir}:  ${err}`)
      }
    })
  }

  const fileName = `${getFileName(options)}.json`
  const filePath = path.resolve(`./logs/${fileName}`)

  writeFile(filePath, JSON.stringify(input, null, 2), (err) => {
    if (err) {
      console.error(`Error writing file ${filePath}:  ${err}`)
    }
  })
}
