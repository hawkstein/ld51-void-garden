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
        variant: "gradient",
        gradient: { from: "blue.7", to: "blue.5", deg: 35 },
        uppercase: true,
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
        <MantineProvider
          theme={theme}
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
        >
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  )
}
