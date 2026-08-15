const FACEBOOK_HOSTS = ["facebook.com", "www.facebook.com", "web.facebook.com", "m.facebook.com", "fb.watch", "www.fb.watch"];
const TIKTOK_HOSTS = ["tiktok.com", "www.tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"];

export type LivePlatform = "none" | "facebook" | "tiktok";

export function detectLivePlatform(raw: string): LivePlatform {
  const url = parseHttps(raw);
  if (!url) return "none";
  const host = url.hostname.toLowerCase();
  if (FACEBOOK_HOSTS.some((item) => host === item || host.endsWith(`.${item}`))) return "facebook";
  if (TIKTOK_HOSTS.some((item) => host === item || host.endsWith(`.${item}`))) return "tiktok";
  return "none";
}

export function sanitizeLiveUrl(raw: string): string {
  const url = parseHttps(raw);
  if (!url) return "";
  if (detectLivePlatform(url.toString()) === "none") return "";
  return url.toString().slice(0, 500);
}

export function facebookEmbedSrc(liveUrl: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(liveUrl)}&show_text=false&autoplay=true`;
}

export function tiktokEmbedSrc(liveUrl: string) {
  const url = parseHttps(liveUrl);
  if (!url) return "";
  const video = url.pathname.match(/\/video\/(\d+)/);
  if (video) return `https://www.tiktok.com/embed/v2/${video[1]}`;
  return "";
}

function parseHttps(raw: string) {
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}
