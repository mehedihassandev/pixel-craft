import { Metadata } from 'next';
import { generatePageMetadata } from '@/helper';
import { PAGE_METADATA_KEY } from '@/models';

export const metadata: Metadata = generatePageMetadata(PAGE_METADATA_KEY.OCR);

export default function OcrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
