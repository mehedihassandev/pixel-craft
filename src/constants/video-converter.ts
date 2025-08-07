export const VIDEO_CONVERTER_CONFIG = {
  ACCEPTED_FORMATS: ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv'],
  OUTPUT_FORMATS: [
    { value: 'mp4', label: 'MP4', extension: '.mp4' },
    { value: 'webm', label: 'WebM', extension: '.webm' },
    { value: 'mov', label: 'MOV', extension: '.mov' },
    { value: 'avi', label: 'AVI', extension: '.avi' },
    { value: 'flv', label: 'FLV', extension: '.flv' },
    { value: 'wmv', label: 'WMV', extension: '.wmv' },
    { value: 'gif', label: 'GIF', extension: '.gif' },
  ],
  RESOLUTIONS: [
    { value: '1920x1080', label: '1080p (1920x1080)' },
    { value: '1280x720', label: '720p (1280x720)' },
    { value: '854x480', label: '480p (854x480)' },
    { value: '640x360', label: '360p (640x360)' },
    { value: 'original', label: 'Original Resolution' },
  ],
  QUALITY_LEVELS: [
    { value: 'high', label: 'High Quality', crf: 18 },
    { value: 'medium', label: 'Medium Quality', crf: 23 },
    { value: 'low', label: 'Low Quality', crf: 28 },
  ],
  FRAME_RATES: [
    { value: '60', label: '60 FPS' },
    { value: '30', label: '30 FPS' },
    { value: '24', label: '24 FPS' },
    { value: '15', label: '15 FPS' },
    { value: 'original', label: 'Original Frame Rate' },
  ],
  MAX_FILE_SIZE: 500 * 1024 * 1024, // 500MB
  MAX_GIF_DURATION: 30, // 30 seconds for GIF conversion
};

export const VIDEO_CONVERTER_MESSAGES = {
  UPLOAD_SUCCESS: 'Video uploaded successfully',
  CONVERSION_START: 'Video conversion started',
  CONVERSION_SUCCESS: 'Video converted successfully',
  CONVERSION_ERROR: 'Failed to convert video',
  DOWNLOAD_READY: 'Your converted video is ready for download',
  FILE_TOO_LARGE: `File size exceeds ${VIDEO_CONVERTER_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
  INVALID_FORMAT: 'Invalid video format',
  PROCESSING: 'Processing your video...',
  GIF_DURATION_WARNING: `GIF conversion is limited to ${VIDEO_CONVERTER_CONFIG.MAX_GIF_DURATION} seconds`,
};
