import Grid from "@mui/material/Grid";
import type { GridProps } from "@mui/material/Grid";
import VideoCard from "./VideoCard";

interface VideoListProps {
  videos: Array<{
    videoId: string;
    videoKey: string;
    userId: string;
    updatedAt: string;
    title: string;
    thumbnailUrl: string;
    s3KeyOriginal: string;
    description: string;
    createdAt: string;
    username: string;
    src: string;
    comments: Array<{ commentId?: string, userId: string; commentText: string; createdAt: string }>;
    status: "UPLOADING" | "PROCESSING" | "UNPUBLISHED" | "PUBLISHED" | "FAILED";
    onClick?: () => void;
  }>;
}


const VideoList = ({ videos }: VideoListProps) => (
  <Grid container spacing={3 as GridProps['spacing']}>
    {videos.map((video) => (
      <div key={video.videoId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <VideoCard src={video.src} videoId={video.videoId} title={video.title} thumbnail={video.thumbnailUrl} username={video.username} status={video.status} description={video.description} comments={video.comments} />
      </div>
    ))}
  </Grid>
);

export default VideoList;
