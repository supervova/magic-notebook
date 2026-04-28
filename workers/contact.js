import { EmailMessage } from 'cloudflare:email';

/* global Response, console, fetch */

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

const MAX_LENGTH = {
  category: 20,
  email: 255,
  message: 10000,
  name: 120,
  subject: 250,
};

const ISSUE_CATEGORIES = {
  bug: {
    label: 'bug',
    titlePrefix: '[Bug]',
    type: 'Bug report',
  },
  feature: {
    label: 'enhancement',
    titlePrefix: '[Feature]',
    type: 'Feature request',
  },
  question: {
    label: 'question',
    titlePrefix: '[Question]',
    type: 'Question',
  },
};

const DEFAULT_ALLOWED_ORIGINS = [
  'https://magic-notebook.com',
  'https://www.magic-notebook.com',
];

const buildCorsHeaders = ({ env, origin }) => {
  const allowedOrigins = (env.CONTACT_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    Vary: 'Origin',
  };
};

const jsonResponse = (data, init = {}, corsHeaders = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...corsHeaders,
      ...init.headers,
    },
  });

const isOriginAllowed = ({ env, origin }) => {
  if (!origin) {
    return true;
  }

  const allowedOrigins = (env.CONTACT_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

  return allowedOrigins.includes(origin);
};

const isStringInRange = (value, maxLength) =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;

const isValidEmail = value =>
  isStringInRange(value, MAX_LENGTH.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizePayload = payload => ({
  category: typeof payload.category === 'string' ? payload.category.trim() : '',
  company: typeof payload.company === 'string' ? payload.company.trim() : '',
  email: typeof payload.email === 'string' ? payload.email.trim() : '',
  message: typeof payload.message === 'string' ? payload.message.trim() : '',
  name: typeof payload.name === 'string' ? payload.name.trim() : '',
  page: typeof payload.page === 'string' ? payload.page.trim() : '',
  subject: typeof payload.subject === 'string' ? payload.subject.trim() : '',
  userAgent: typeof payload.userAgent === 'string' ? payload.userAgent.trim() : '',
});

const validatePayload = payload =>
  Object.hasOwn(ISSUE_CATEGORIES, payload.category) &&
  isStringInRange(payload.name, MAX_LENGTH.name) &&
  isStringInRange(payload.subject, MAX_LENGTH.subject) &&
  isValidEmail(payload.email) &&
  isStringInRange(payload.message, MAX_LENGTH.message);

const countLinks = value => {
  const matches = value.match(/https?:\/\/|www\./gi);

  return matches ? matches.length : 0;
};

const isLikelySpam = payload => {
  const combinedText = `${payload.subject}\n${payload.message}`;

  return countLinks(combinedText) > 3 || /<a\s+href=|<\/a>/i.test(combinedText);
};

const checkRateLimit = async ({ env, ip }) => {
  if (!env.CONTACT_RATE_LIMIT || !ip) {
    return true;
  }

  const key = `contact:${ip}`;
  const currentValue = await env.CONTACT_RATE_LIMIT.get(key);
  const currentCount = Number.parseInt(currentValue ?? '0', 10);

  if (currentCount >= 10) {
    return false;
  }

  await env.CONTACT_RATE_LIMIT.put(key, String(currentCount + 1), {
    expirationTtl: 60 * 60,
  });

  return true;
};

const buildFeedbackBody = payload =>
  [
    'Submitted from the Magic Notebook website contact form.',
    '',
    `Type: ${ISSUE_CATEGORIES[payload.category].type}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Page: ${payload.page || 'unknown'}`,
    '',
    'Message:',
    payload.message,
    '',
    '<details>',
    '<summary>Technical context</summary>',
    '',
    `User agent: ${payload.userAgent || 'unknown'}`,
    '',
    '</details>',
  ].join('\n');

const createGitHubIssue = async ({ env, payload }) => {
  if (!env.GITHUB_ISSUES_TOKEN) {
    throw new Error('GITHUB_ISSUES_TOKEN is not configured.');
  }

  const owner = env.CONTACT_GITHUB_OWNER || 'supervova';
  const repo = env.CONTACT_GITHUB_REPO || 'magic-notebook';
  const labels = buildIssueLabels(env, payload);

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    body: JSON.stringify({
      body: buildFeedbackBody(payload),
      labels,
      title: `${ISSUE_CATEGORIES[payload.category].titlePrefix}: ${payload.subject}`,
    }),
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${env.GITHUB_ISSUES_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'magic-notebook-contact-form',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`GitHub issue creation failed: ${response.status}`);
  }

  const issue = await response.json();

  try {
    await addGitHubIssueLabels({
      env,
      issueNumber: issue.number,
      labels,
      owner,
      repo,
    });
  } catch (error) {
    console.warn(error);
  }

  return issue;
};

const buildIssueLabels = (env, payload) => {
  const baseLabels = (env.CONTACT_GITHUB_LABELS || 'feedback,website')
    .split(',')
    .map(label => label.trim())
    .filter(Boolean);

  return [...new Set([...baseLabels, ISSUE_CATEGORIES[payload.category].label])];
};

const addGitHubIssueLabels = async ({ env, issueNumber, labels, owner, repo }) => {
  if (labels.length === 0) {
    return;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
    {
    body: JSON.stringify({
      labels,
    }),
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${env.GITHUB_ISSUES_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'magic-notebook-contact-form',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    method: 'POST',
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub issue label assignment failed: ${response.status}`);
  }
};

const escapeHeader = value => value.replace(/[\r\n]/g, ' ').trim();

const sendFallbackEmail = async ({ env, payload }) => {
  if (!env.CONTACT_EMAIL || !env.CONTACT_EMAIL_FROM || !env.CONTACT_EMAIL_TO) {
    throw new Error('Email fallback is not configured.');
  }

  const subject = escapeHeader(`Magic Notebook feedback: ${payload.subject}`);
  const body = buildFeedbackBody(payload);
  const rawMessage = [
    `From: ${env.CONTACT_EMAIL_FROM}`,
    `To: ${env.CONTACT_EMAIL_TO}`,
    `Reply-To: ${payload.email}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    body,
  ].join('\r\n');
  const message = new EmailMessage(
    env.CONTACT_EMAIL_FROM,
    env.CONTACT_EMAIL_TO,
    rawMessage
  );

  await env.CONTACT_EMAIL.send(message);
};

const handleContactRequest = async ({ request, env, corsHeaders }) => {
  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  let payload;

  try {
    payload = normalizePayload(await request.json());
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, { status: 400 }, corsHeaders);
  }

  if (payload.company) {
    return jsonResponse({ ok: true, delivery: 'accepted' }, {}, corsHeaders);
  }

  if (!validatePayload(payload)) {
    return jsonResponse({ ok: false, error: 'invalid_payload' }, { status: 400 }, corsHeaders);
  }

  if (isLikelySpam(payload)) {
    return jsonResponse({ ok: false, error: 'spam_detected' }, { status: 400 }, corsHeaders);
  }

  const isAllowed = await checkRateLimit({ env, ip });

  if (!isAllowed) {
    return jsonResponse({ ok: false, error: 'rate_limited' }, { status: 429 }, corsHeaders);
  }

  try {
    const issue = await createGitHubIssue({ env, payload });

    return jsonResponse(
      {
        ok: true,
        delivery: 'github',
        issueUrl: issue.html_url,
      },
      {},
      corsHeaders
    );
  } catch {
    try {
      await sendFallbackEmail({ env, payload });

      return jsonResponse({ ok: true, delivery: 'email' }, {}, corsHeaders);
    } catch {
      return jsonResponse(
        { ok: false, error: 'delivery_failed' },
        { status: 502 },
        corsHeaders
      );
    }
  }
};

export default {
  fetch(request, env) {
    const origin = request.headers.get('Origin');
    const corsHeaders = buildCorsHeaders({ env, origin });

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
        status: 204,
      });
    }

    if (!isOriginAllowed({ env, origin })) {
      return jsonResponse({ ok: false, error: 'origin_not_allowed' }, { status: 403 }, corsHeaders);
    }

    if (request.method !== 'POST') {
      return jsonResponse(
        { ok: false, error: 'method_not_allowed' },
        { status: 405 },
        corsHeaders
      );
    }

    return handleContactRequest({ request, env, corsHeaders });
  },
};
