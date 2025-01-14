import { mkdir, writeFile, existsSync } from "node:fs"
import path from "path"

export function writeLogFile(input: Object) {
  const logsDir = `${path.resolve()}/logs`

  if (!existsSync(logsDir)) {
    mkdir(logsDir, {}, (err) => {
      if (err) {
        console.error(`Error creating directory ${logsDir}:  ${err}`)
      }
    })
  }

  const fileName = `${new Date().toISOString()}.json`
  const filePath = `${path.resolve()}/logs/${fileName}`

  writeFile(filePath, JSON.stringify(input, null, 2), (err) => {
    if (err) {
      console.error(`Error writing file ${filePath}:  ${err}`)
    }
  })
}
