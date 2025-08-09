import { generatePageMetadata } from '@/helper/metadata';
import { PAGE_METADATA_KEY } from '@/models/page-metadata';

export const metadata = generatePageMetadata(PAGE_METADATA_KEY.GIF_TO_JSON);

export default function GifToJsonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
