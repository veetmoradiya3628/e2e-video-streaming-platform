import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import VideoList from "../components/VideoList";

const mockVideos = [
  {
    id: "1",
    title: "Amazing Nature Documentary",
    thumbnail: "https://i3.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    uploader: "Alice",
    views: 1200,
  },
  {
    id: "2",
    title: "React Tutorial for Beginners",
    thumbnail: "https://i3.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    uploader: "Bob",
    views: 980,
  },
  // Add more mock videos as needed
];

const VideoFeedPage = () => {
  const [videos] = useState(mockVideos);

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Trending Videos
      </Typography>
      <Box mt={4}>
        <VideoList videos={videos} />
      </Box>
    </Container>
  );
};

export default VideoFeedPage;
