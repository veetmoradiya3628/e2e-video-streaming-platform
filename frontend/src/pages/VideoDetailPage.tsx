import { useState } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import CommentSection from "../components/CommentSection";

const mockVideo = {
  id: "1",
  title: "Amazing Nature Documentary",
  src: "https://e2e-video-transcoding-dev.s3.ap-south-1.amazonaws.com/videos/hls/0ec3207c-d86f-47b8-8df3-5f26df032d80-4k_Thetestdata/480p/index.m3u8",
  poster: "https://i3.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
  uploader: "Alice",
  views: 1200,
  description: "A breathtaking journey through the wonders of nature.",
};

const mockComments = [
  { id: "c1", user: "Bob", text: "Awesome video!" },
  { id: "c2", user: "Charlie", text: "Loved the cinematography." },
];

const VideoDetailPage = () => {
  const [comments, setComments] = useState(mockComments);

  const handleAddComment = (text: string) => {
    setComments([
      ...comments,
      { id: Date.now().toString(), user: "You", text },
    ]);
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Box sx={{ mt: 3 }}>
        <VideoPlayer srcUrl={mockVideo.src} />
      </Box>
      <Typography variant="h5" fontWeight={700} mt={3} gutterBottom>
        {mockVideo.title}
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Typography variant="subtitle2">{mockVideo.uploader}</Typography>
        <Typography variant="body2" color="text.secondary">
          {mockVideo.views} views
        </Typography>
      </Box>
      <Typography variant="body1" mb={2}>
        {mockVideo.description}
      </Typography>
      <Divider />
      <CommentSection comments={comments} onAddComment={handleAddComment} />
    </Container>
  );
};

export default VideoDetailPage;
