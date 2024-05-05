import "server-only";

import { PostHog } from "posthog-node";

import { env } from "~/env";

function serverSideAnalytics() {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });

  return posthogClient;
}

export const analyticsServerClient = serverSideAnalytics();
