export type FileType = "video" | "audio" | "image" | "";

export type FileUploadProps = {
  type: FileType;
  jpg?: boolean;
  png?: boolean;
  mp4?: boolean;
  mkv?: boolean;
  webp?: boolean;
  fileUploadSuccess?: undefined | true | false;
  uploadFile: (file: any) => void;
  deleteUploadFile: (deleteStatus: boolean) => void;
  uploadedFileName?: string;
  maximumFileSize?: string;
};
