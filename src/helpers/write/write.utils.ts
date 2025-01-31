import { WriteOptions } from "./write.types.ts"

export function getFileName(options?: WriteOptions) {
  if (options?.filename) {
    return options.filename
  }

  const timestamp = new Date().toISOString()
  const sanitizedTimestamp = sanitizeFileName(timestamp)

  return sanitizedTimestamp
}

function sanitizeFileName(fileName: string): string {
  // Replace invalid Windows filename characters with underscore
  return fileName.replace(/[<>:"/\\|?*]/g, '_')
}
