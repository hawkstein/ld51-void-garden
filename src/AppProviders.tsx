import * as Sentry from "@sentry/react"
import React, { ReactNode } from "react"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const theme = {
  components: {
    Button: {
      defaultProps: {
        size: "lg",
        uppercase: true,
      },
      styles: {
        root: {
          color: "#e93cac",
          backgroundColor: "#000",
          border: "2px solid #e93cac",
          "&:hover": {
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={
        <p>
          An error has occurred. Please let me know any details in the comments.
          Thanks!
        </p>
      }
    >
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} withNormalizeCSS withCSSVariables>
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  )
}
