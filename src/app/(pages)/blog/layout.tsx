import { Metadata } from 'next';
import { generatePageMetadata } from '@/helper';
import { PAGE_METADATA_KEY } from '@/models';

export const metadata: Metadata = generatePageMetadata(PAGE_METADATA_KEY.BLOG);

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
