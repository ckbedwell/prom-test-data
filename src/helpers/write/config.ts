import dotenv from "dotenv"

dotenv.config()

const { PROM_WRITE_ENDPOINT, PROM_USERNAME, PROM_PASSWORD } = process.env

const MISSING_VARS: string[] = []
;["PROM_WRITE_ENDPOINT", "PROM_USERNAME", "PROM_PASSWORD"].forEach((envVar) => {
  if (!process.env[envVar]) {
    MISSING_VARS.push(envVar)
  }
})

if (MISSING_VARS.length) {
  throw new Error(
    `Missing required environment variables: ${MISSING_VARS.join(
      ", "
    )}. Please add them to your .env file in the root of the project.`
  )
}

export const config = {
  url: PROM_WRITE_ENDPOINT,
  auth: {
    username: PROM_USERNAME,
    password: PROM_PASSWORD,
  },
}
