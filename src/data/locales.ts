// Existing English URLs remain stable. Indonesian pages use the same paths under /id.
export const pagePaths = ['/', '/dolphin-tour-lovina/', '/transportasi/', '/transportasi/sewa-mobil-singaraja/', '/transportasi/rombongan/', '/tur-bali-utara/', '/sewa-kendaraan-jangka-panjang/', '/gallery', '/blog', '/blog/best-time-to-see-dolphins-in-lovina', '/blog/a-slow-day-in-north-bali', '/blog/sharing-or-private-boat'] as const;
export function languagePair(pathname: string) {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const isIndonesian = normalized === '/id' || normalized.startsWith('/id/');
  const bare = isIndonesian ? normalized.slice(3) || '/' : normalized;
  const english = pagePaths.find(path => (path.replace(/\/$/, '') || '/') === bare);
  return english ? { en: english, id: english === '/' ? '/id/' : `/id${english}`, isIndonesian } : undefined;
}
