import * as Sentry from '@sentry/node';
import {nodeProfilingIntegration} from '@sentry/profiling-node';

// Ensure to call this before requiring any other modules!
Sentry.init({
  // eslint-disable-next-line no-undef
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
