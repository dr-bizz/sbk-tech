import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGES).map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: p.dateModified,
  }));
}
