import dotenv from "dotenv"

dotenv.config()

export function log(message: any) {
  if (process.env.VERBOSE?.toLowerCase() === "true") {
    console.log(message)
  }
}
