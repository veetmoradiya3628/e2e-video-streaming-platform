import Grid from "@mui/material/Grid";
import type { GridProps } from "@mui/material/Grid";
import VideoCard from "./VideoCard";

interface VideoListProps {
  videos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    uploader: string;
    views: number;
    onClick?: () => void;
  }>;
}


const VideoList = ({ videos }: VideoListProps) => (
  <Grid container spacing={3 as GridProps['spacing']}>
    {videos.map((video) => (
      <div key={video.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <VideoCard {...video} />
      </div>
    ))}
  </Grid>
);

export default VideoList;
