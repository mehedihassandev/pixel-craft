import { Metadata } from 'next';
import { generatePageMetadata } from '@/helper';
import { PAGE_METADATA_KEY } from '@/models/page-metadata';

export const metadata: Metadata = generatePageMetadata(PAGE_METADATA_KEY.FAQ);

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
