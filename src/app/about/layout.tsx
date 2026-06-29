import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { PAGES, pageMetadata, webPageGraph } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(PAGES.about, 'article');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={webPageGraph(PAGES.about)} />
    </>
  );
}
