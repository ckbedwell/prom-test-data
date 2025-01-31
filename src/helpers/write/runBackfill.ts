import { execSync } from 'child_process'
import dotenv from "dotenv"

dotenv.config()

export function runBackfill(fileName: string) {
  if (!fileName) {
    console.error('Please provide a filepath')
    process.exit(1)
  }

  const inputPath = `/prometheus/input/${fileName}`

  try {
    console.log('Creating blocks...')
    const createBlocksCommand = `docker exec prometheus promtool tsdb create-blocks-from openmetrics ${inputPath} /prometheus/data --max-block-duration 9600h`

    execSync(createBlocksCommand, {
      stdio: 'inherit'
    })

    console.log(`Successfully created blocks from ${fileName}`)
  } catch (error: any) {
    console.error('Error executing command:', {
      status: error.status,
      message: error.message,
      stdout: error.stdout,
      stderr: error.stderr
    })
    process.exit(1)
  }
}