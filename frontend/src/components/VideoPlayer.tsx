import { Box } from "@mui/material";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer = ({ src, poster }: VideoPlayerProps) => (
  <Box className="w-full flex justify-center">
    <video
      className="rounded-lg w-full max-w-3xl bg-black"
      src={src}
      poster={poster}
      controls
    />
  </Box>
);

export default VideoPlayer;
