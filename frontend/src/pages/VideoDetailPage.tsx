import { useState } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import CommentSection from "../components/CommentSection";
import { useLocation } from "react-router-dom";

const VideoDetailPage = () => {
  const location = useLocation();
  const video = location.state;
  console.log("Video from state:", video);

  const [comments, setComments] = useState(video.comments || []);

  const handleAddComment = (text: string) => {
    setComments([
      ...comments,
      { id: Date.now().toString(), user: "You", text },
    ]);
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Box sx={{ mt: 3 }}>
        <VideoPlayer srcUrl={video.src} />
      </Box>
      <Typography variant="h5" fontWeight={700} mt={3} gutterBottom>
        {video.title}
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Typography variant="subtitle2">{video.username}</Typography>
        <Typography variant="body2" color="text.secondary">
          {Math.floor(Math.random() * 100)} views
        </Typography>
      </Box>
      <Typography variant="body1" mb={2}>
        {video.description}
      </Typography>
      <Divider />
      <CommentSection comments={comments} onAddComment={handleAddComment} />
    </Container>
  );
};

export default VideoDetailPage;
