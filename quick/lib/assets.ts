export const papersFolder =
  "https://mailmissouri-my.sharepoint.com/:f:/g/personal/snvb8_umsystem_edu/EkPJqOYjRJVPgLMnKJLLRDoBbRASCxuFMz4qprB1e2KC_g?e=kfQpbN";

export function assetUrl(
  path: string | null | undefined,
): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return path.startsWith("/") ? path : `/${path}`;
}
