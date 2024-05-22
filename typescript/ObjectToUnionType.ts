// Q1 - Convert below object to union of it's key's values like 'image/jpeg' | 'image/gif' | 'image/png',

const FILE_TYPE = {
    JPEG: 'image/jpeg',
    GIF: 'image/gif',
    PNG: 'image/png',
    PDF: 'application/pdf',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    PPT: 'application/vnd.ms-powerpoint',
    TXT: 'text/plain',
    XLS: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    MP3: 'audio/mpeg',
    MP4: 'video/mp4',
} as const;


type fileType = typeof FILE_TYPE[keyof typeof FILE_TYPE];