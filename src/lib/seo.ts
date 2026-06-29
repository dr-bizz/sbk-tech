import type { Metadata } from 'next';

/**
 * Central SEO config — ported from the original Southbrook Technologies
 * WordPress/Yoast output so the Next.js site reproduces the same per-page
 * titles, descriptions, Open Graph / Twitter tags and JSON-LD schema graph.
 *
 * The canonical domain is configurable via NEXT_PUBLIC_SITE_URL and defaults
 * to the production domain.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://southbrook-tech.com';
export const SITE_NAME = 'SOUTHBROOK TECHNOLOGIES';

/** Social share image (1200×630 is ideal; original Yoast image is 662×347). */
export const SOCIAL_IMAGE = { url: '/images/social.png', width: 662, height: 347 };

export interface PageSeo {
  title: string;
  description?: string;
  /** Site-relative path, with trailing slash to match the original URLs. */
  path: string;
  datePublished: string;
  dateModified: string;
}

/** Exact values lifted from the live site's Yoast tags. */
export const PAGES = {
  home: {
    title: 'Southbrook Technologies - Composite Manufacturing Tooling And Materials Specialist',
    description:
      "Southbrook Technologies is a manufacturer's representative specializing in production and repair tooling and materials for the advanced composites industry. We have been providing sales and technical support since 1991 for companies who want to stay very close to their customers, without the significant overhead and expense of a full-time factory sales staff. Think of us as your best employee, who isn't even an employee.",
    path: '/',
    datePublished: '2019-10-05T22:06:54+00:00',
    dateModified: '2025-04-20T18:51:53+00:00',
  },
  about: {
    title: 'About Southbrook Technologies | Southbrook Technologies',
    description:
      'Southbrook Technologies was founded by Steven D. Zeller, bringing over 25 years of "hands on" aerospace manufacturing engineering experience.',
    path: '/about/',
    datePublished: '2019-10-10T22:38:31+00:00',
    dateModified: '2025-04-20T18:56:04+00:00',
  },
  consultancy: {
    title: 'Consultancy | Southbrook Technologies',
    description:
      'Although Southbrook Technologies is most often called upon to provide technical support for products sold by the companies we represent, we also do composite process development and tooling consulting work upon request.',
    path: '/consultancy/',
    datePublished: '2019-10-10T22:38:31+00:00',
    dateModified: '2025-04-20T19:39:33+00:00',
  },
  // Note: the original lives at /3d-printing/business-development/ and has no
  // meta description. Canonical here points at this site's actual /business-development/ path.
  businessDevelopment: {
    title: 'Business Development - SOUTHBROOK TECHNOLOGIES',
    path: '/business-development/',
    datePublished: '2021-11-13T17:44:31+00:00',
    dateModified: '2025-04-16T21:40:08+00:00',
  },
  contact: {
    title: 'Contact - SOUTHBROOK TECHNOLOGIES',
    path: '/contact/',
    datePublished: '2019-10-10T22:38:31+00:00',
    dateModified: '2019-10-24T23:25:44+00:00',
  },
} satisfies Record<string, PageSeo>;

/** Build a Next.js Metadata object for a page, mirroring the Yoast tag set. */
export function pageMetadata(p: PageSeo, ogType: 'website' | 'article'): Metadata {
  // The original only emits og:image / twitter:image on pages that have a
  // description (plus the homepage); the two description-less pages omit them.
  const hasImage = ogType === 'website' || Boolean(p.description);
  return {
    title: p.title,
    // Explicit null prevents description-less pages from inheriting the
    // homepage description from the root layout.
    description: p.description ?? null,
    alternates: { canonical: p.path },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      siteName: SITE_NAME,
      title: p.title,
      url: p.path,
      ...(p.description ? { description: p.description } : {}),
      ...(hasImage ? { images: [SOCIAL_IMAGE] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      ...(p.description ? { description: p.description } : {}),
      ...(hasImage && p.description ? { images: [SOCIAL_IMAGE.url] } : {}),
    },
  };
}

const websiteNode = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

/** Yoast-style schema graph (WebSite + WebPage) for a given page. */
export function webPageGraph(p: PageSeo) {
  const url = `${SITE_URL}${p.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode,
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        inLanguage: 'en-US',
        name: p.title,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        ...(p.description ? { description: p.description } : {}),
      },
    ],
  };
}
