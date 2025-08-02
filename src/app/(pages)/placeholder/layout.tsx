import { Metadata } from 'next';
import { generatePageMetadata } from '@/helper';
import { PAGE_METADATA_KEY } from '@/models/page-metadata';

export const metadata: Metadata = generatePageMetadata(PAGE_METADATA_KEY.PLACEHOLDER);

export default function PlaceholderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
