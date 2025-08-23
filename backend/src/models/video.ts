export interface Video {
  videoId: string; // UUID
  userId: string;
  title: string;
  description?: string;
  s3KeyOriginal: string; // S3 path of uploaded original file
  s3KeyHLS?: string; // S3 path of transcoded HLS output
  resolutions?: string[]; // e.g., ["240p", "480p", "720p"],
  comments: VideoComment[];
  videoKey?: string;
  status: "UPLOADING" | "PROCESSING" | "READY" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

export interface VideoComment {
  commentId?: string;
  commentText: string;
  userId: string;
  createdAt: string;
  username?: string;
}
