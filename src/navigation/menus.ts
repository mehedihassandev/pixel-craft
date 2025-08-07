import { IMenus } from '@/models/menus';
import { ROUTER } from './router';

export const menus: IMenus[] = [
  {
    id: 'placeholder',
    label: 'Placeholder',
    href: ROUTER.PLACEHOLDER,
    icon: 'ImageIcon',
  },
  {
    id: 'resize',
    label: 'Resize',
    href: ROUTER.RESIZE,
    icon: 'Maximize',
  },
  {
    id: 'background-remove',
    label: 'Background Remove',
    href: ROUTER.BACKGROUND_REMOVE,
    icon: 'Eraser',
  },
  {
    id: 'photo-editor',
    label: 'Photo Editor',
    href: ROUTER.PHOTO_EDITOR,
    icon: 'Palette',
  },
  {
    id: 'ocr',
    label: 'OCR Text Extract',
    href: ROUTER.OCR,
    icon: 'FileText',
  },
  {
    id: 'png-to-svg',
    label: 'PNG to SVG',
    href: ROUTER.PNG_TO_SVG,
    icon: 'Layers',
  },
  {
    id: 'gif-to-json',
    label: 'GIF to JSON',
    href: ROUTER.GIF_TO_JSON,
    icon: 'FileText',
  },
  {
    id: 'video-converter',
    label: 'Video Converter',
    href: ROUTER.VIDEO_CONVERTER,
    icon: 'Video',
  },
];
