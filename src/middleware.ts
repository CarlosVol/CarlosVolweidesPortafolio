import { defineMiddleware } from 'astro:middleware';
import { LOCALES, DEFAULT_LANG, type Lang } from './i18n/ui';

/**
 * Sends first-time visitors to the language they most likely read.
 *
 * Runs as Vercel Edge Middleware (see `edgeMiddleware` in astro.config.mjs), so
 * it executes ahead of the prerendered pages. Spanish lives at the root, English
 * under /en — only unprefixed paths are candidates for a redirect.
 */

/** Countries where Spanish is the majority language. */
const ES_COUNTRIES = new Set([
  'VE', 'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'EC', 'BO', 'PY', 'UY',
  'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'DO', 'CU', 'PR', 'GQ',
]);

const BOT_RE = /bot|crawl|spider|slurp|gptbot|claude|anthropic|facebookexternalhit|embedly|quora|pinterest|bingpreview/i;

const COOKIE = 'lang';

function parseAcceptLanguage(header: string | null): Lang | null {
  if (!header) return null;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      const quality = q ? Number.parseFloat(q.split('=')[1]) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (LOCALES.includes(base as Lang)) return base as Lang;
  }
  return null;
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return null;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Prerendered routes are served straight off the Vercel filesystem, ahead of
  // this middleware — reaching for request headers here only happens during the
  // build's static pass, where there are none. `/` is `prerender = false` for
  // exactly this reason.
  if (context.isPrerendered) return next();

  // API routes, Astro internals and static assets must pass through untouched —
  // redirecting /api/contact would break the contact form's POST.
  const isAppRoute =
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_') &&
    !/\.[a-z0-9]+$/i.test(pathname);

  // Already on an explicit locale path: nothing to detect.
  const isPrefixed = LOCALES.some(
    (l) => l !== DEFAULT_LANG && (pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  );

  if (!isAppRoute || isPrefixed) return next();

  // Crawlers must see the Spanish page at `/` and find English via hreflang,
  // otherwise the default locale never gets indexed.
  const ua = context.request.headers.get('user-agent') ?? '';
  if (BOT_RE.test(ua)) return next();

  // Geo is only a fallback: Accept-Language states what the visitor reads,
  // the IP country merely suggests it. Absent both, keep the default locale.
  const country = context.request.headers.get('x-vercel-ip-country');
  const geoLang: Lang | null = country ? (ES_COUNTRIES.has(country) ? 'es' : 'en') : null;

  const cookieLang = readCookie(context.request.headers.get('cookie'), COOKIE);
  const preferred: Lang | null =
    (LOCALES.includes(cookieLang as Lang) ? (cookieLang as Lang) : null) ??
    parseAcceptLanguage(context.request.headers.get('accept-language')) ??
    geoLang;

  if (!preferred || preferred === DEFAULT_LANG) return next();

  const target = new URL(context.url);
  target.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`;

  return new Response(null, {
    // 302, never 301: the visitor can change their mind with the toggle.
    status: 302,
    headers: {
      Location: target.pathname + target.search,
      Vary: 'Accept-Language, Cookie',
    },
  });
});
