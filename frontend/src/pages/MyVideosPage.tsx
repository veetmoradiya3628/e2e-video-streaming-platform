import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import VideoList from "../components/VideoList";

const mockMyVideos = [
  {
    id: "3",
    title: "My First Vlog",
    thumbnail: "https://i3.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    uploader: "You",
    views: 300,
  },
  {
    id: "4",
    title: "Travel Highlights",
    thumbnail: "https://i3.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    uploader: "You",
    views: 150,
  },
];

const MyVideosPage = () => {
  const [videos] = useState(mockMyVideos);

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" fontWeight={700} gutterBottom>
        My Uploaded Videos
      </Typography>
      <Box mt={4}>
        <VideoList videos={videos} />
      </Box>
    </Container>
  );
};

export default MyVideosPage;
