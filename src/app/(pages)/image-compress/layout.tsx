import { generatePageMetadata } from '@/helper';
import { Metadata } from 'next';
import { PAGE_METADATA_KEY } from '@/models';

export const metadata: Metadata = generatePageMetadata(PAGE_METADATA_KEY.IMAGE_COMPRESS);

export default function ImageCompressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
