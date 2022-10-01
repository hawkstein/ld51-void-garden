import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import AppProviders from "./AppProviders"
import "./global.scss"

const dsn = import.meta.env.VITE_SENTRY_DSN
const environment = import.meta.env.MODE

Sentry.init({
  dsn,
  environment,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
