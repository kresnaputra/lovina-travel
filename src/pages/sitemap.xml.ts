import type { APIRoute } from 'astro';
import { posts } from '../data/posts';
import { languagePair } from '../data/locales';
import { indonesianPages, idPath } from '../data/indonesian';

export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/dolphin-tour-lovina/', '/transportasi/', '/transportasi/sewa-mobil-singaraja/', '/transportasi/rombongan/', '/tur-bali-utara/', '/sewa-kendaraan-jangka-panjang/', '/gallery', '/blog', ...posts.map((post) => `/blog/${post.slug}`)];
  const allPaths = [...paths, ...indonesianPages.map(page => idPath(page.path))];
  const urls = allPaths.map((path) => {
    const pair = languagePair(path)!;
    const absolute = (value: string) => new URL(value.replace(/\/$/, '') || '/', site).href;
    return `<url><loc>${absolute(path)}</loc><xhtml:link rel="alternate" hreflang="en" href="${absolute(pair.en)}"/><xhtml:link rel="alternate" hreflang="id" href="${absolute(pair.id)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${absolute(pair.en)}"/></url>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
