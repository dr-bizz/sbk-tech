import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { PAGES, pageMetadata, webPageGraph } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(PAGES.contact, 'article');

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={webPageGraph(PAGES.contact)} />
    </>
  );
}
