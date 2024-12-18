import { pushTimeseries } from "prometheus-remote-write"
import { ONE_MINUTE } from "../helpers/time/time.constants.ts"

// Full config - only url is required
const config = {
  // Remote url
  url: "https://prometheus-dev-01-dev-us-central-0.grafana-dev.net/api/prom/push",
  // Auth settings
  auth: {
    username: "15629",
    password:
      "glc_dev_eyJvIjoiNDQyIiwibiI6InN0YWNrLTI0ODQtaG0td3JpdGUtbm9kZS13cml0ZSIsImsiOiJxcjM5T1Y4ckY4VGM5NGdTMVkwYVUxRjEiLCJtIjp7InIiOiJkZXYtdXMtY2VudHJhbCJ9fQ==",
  },
}

await pushTimeseries(
  {
    labels: {
      __name__: "probe_success",
      job: "CHRIS_TEST",
      instance: "chris.example.com",
    },
    samples: generateMetric({
      metric: "probe_success",
      distribution: 0.9,
      placement: "start",
      entries: 10,
      interval: ONE_MINUTE,
    }),
  },
  config
)
