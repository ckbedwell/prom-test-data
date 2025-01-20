import { mkdir, writeFile, existsSync } from "node:fs"
import path from "path"
import { sanitizeFileName } from "../write/write.utils.ts"

export function writeLogFile(input: Object) {
  const logsDir = path.resolve(`./logs`)

  if (!existsSync(logsDir)) {
    mkdir(logsDir, {}, (err) => {
      if (err) {
        console.error(`Error creating directory ${logsDir}:  ${err}`)
      }
    })
  }

  const timestamp = new Date().toISOString()
  const sanitizedTimestamp = sanitizeFileName(timestamp)
  const fileName = `${sanitizedTimestamp}.json`
  const filePath = path.resolve(`./logs/${fileName}`)

  writeFile(filePath, JSON.stringify(input, null, 2), (err) => {
    if (err) {
      console.error(`Error writing file ${filePath}:  ${err}`)
    }
  })
}
