import { generatePageMetadata } from '@/helper';
import { Metadata } from 'next';
import { PAGE_METADATA_KEY } from '@/models';

export const metadata: Metadata = generatePageMetadata(PAGE_METADATA_KEY.PNG_TO_SVG);

export default function PngToSvgLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
