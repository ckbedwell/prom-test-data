export function sanitizeFileName(fileName: string): string {
  // Replace invalid Windows filename characters with underscore
  return fileName.replace(/[<>:"/\\|?*]/g, '_')
}
