import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import dotenv from "dotenv"

dotenv.config()

const { PROM_BACKFILL_FOLDER } = process.env

export function runBackfill(filepath: string) {
  if (!PROM_BACKFILL_FOLDER) {
    console.error('Please provide a PROM_BACKFILL_FOLDER in your .env file')
    process.exit(1)
  }

  if (!filepath) {
    console.error('Please provide a filepath')
    process.exit(1)
  }

  // Check if input file exists
  if (!existsSync(filepath)) {
    console.error(`File not found: ${filepath}`)
    process.exit(1)
  }

  const absolutePath = path.resolve(filepath)
  const backfillPath = path.resolve(PROM_BACKFILL_FOLDER)
  const command = `promtool tsdb create-blocks-from openmetrics "${absolutePath}" "${backfillPath}" --max-block-duration 24h`

  try {
    execSync(command, { stdio: 'inherit' })
    console.log(`Successfully created blocks to ${backfillPath} from ${filepath}`)
  } catch (error) {
    console.error('Error executing command:', error)
    process.exit(1)
  }
}