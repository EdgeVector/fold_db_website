const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || '';
const SENTRY_ENVIRONMENT = import.meta.env.VITE_SENTRY_ENVIRONMENT || 'production';
const SENTRY_RELEASE = import.meta.env.VITE_SENTRY_RELEASE || undefined;
const SENTRY_SAMPLE_RATE = Number.parseFloat(import.meta.env.VITE_SENTRY_SAMPLE_RATE || '1');
const SENTRY_SMOKE = import.meta.env.VITE_SENTRY_SMOKE === '1';

let initialized = false;

function cleanUrl(value) {
  if (!value || typeof value !== 'string') return value;
  try {
    const url = new URL(value);
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return value.split('?')[0].split('#')[0];
  }
}

function scrubEvent(event) {
  if (event.user) delete event.user;
  if (event.request) {
    event.request.url = cleanUrl(event.request.url);
    delete event.request.cookies;
    delete event.request.headers;
    delete event.request.data;
    delete event.request.query_string;
  }
  if (Array.isArray(event.breadcrumbs)) {
    event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => ({
      ...breadcrumb,
      data: breadcrumb.data
        ? Object.fromEntries(
            Object.entries(breadcrumb.data).map(([key, value]) => [
              key,
              key.toLowerCase().includes('url') ? cleanUrl(value) : value,
            ])
          )
        : breadcrumb.data,
    }));
  }
  return event;
}

function runSmokeIfRequested() {
  if (!SENTRY_SMOKE || typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  if (!params.has('sentry-smoke')) return;

  window.setTimeout(() => {
    throw new Error('fold_db_website.sentry_smoke');
  }, 0);
}

export async function initSentry() {
  if (initialized) return false;
  if (typeof window === 'undefined') return false;
  if (!SENTRY_DSN) return false;

  const Sentry = await import('@sentry/browser');
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    release: SENTRY_RELEASE,
    sendDefaultPii: false,
    sampleRate: Number.isFinite(SENTRY_SAMPLE_RATE) ? SENTRY_SAMPLE_RATE : 1,
    beforeSend: scrubEvent,
  });

  initialized = true;
  runSmokeIfRequested();
  return true;
}
