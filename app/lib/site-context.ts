export const siteIdentity = {
  name: "PDF Myanmar Relief",
  shortName: "PDF",
  tagline: "Civilian humanitarian community",
  description:
    "Verified stories, events and community notices for civilians in and from Myanmar.",
};

export function publicOrigin(request?: Request) {
  const configured = process.env.APP_ORIGIN?.trim();
  if (configured && configured !== "https://example.org") {
    try {
      return new URL(configured).origin;
    } catch {
      /* fall through */
    }
  }
  if (request) {
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      new URL(request.url).host;
    const proto =
      request.headers.get("x-forwarded-proto") ||
      (host.includes("localhost") ? "http" : "https");
    return `${proto}://${host}`;
  }
  return "http://localhost:3000";
}

export function siteLinks(origin: string) {
  return {
    home: `${origin}/`,
    about: `${origin}/about`,
    ourWork: `${origin}/our-work`,
    giving: `${origin}/giving`,
    stories: `${origin}/stories`,
    events: `${origin}/events`,
    gallery: `${origin}/gallery`,
    getInvolved: `${origin}/get-involved`,
  };
}

export function subscribeAutomationContext(request: Request, extra: Record<string, unknown> = {}) {
  const origin = publicOrigin(request);
  const links = siteLinks(origin);
  return {
    organisation: siteIdentity.name,
    organisationShort: siteIdentity.shortName,
    tagline: siteIdentity.tagline,
    origin,
    links,
    welcome: {
      subject: `Welcome to ${siteIdentity.shortName} community updates`,
      intro: `You asked ${siteIdentity.name} to email approved event notices.`,
      footer: siteIdentity.tagline,
    },
    ...extra,
  };
}
