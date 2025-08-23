import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import CommentSection from "../components/CommentSection";
import { useLocation } from "react-router-dom";
import { videoApi } from "../services/api";

const VideoDetailPage = () => {
  const location = useLocation();
  const video = location.state;

  const [comments, setComments] = useState(video.comments || []);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] =
    useState<"success" | "error">("success");

  const handleCloseAlert = () => setAlertOpen(false);

  const handleAddComment = async (text: string) => {
    const newCommentBody = {
      userId: localStorage.getItem("userId"),
      commentText: text,
      username: localStorage.getItem("username") || "You",
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await videoApi.postComment(video.videoId, newCommentBody);
      const savedComment = response?.data.comment || newCommentBody;
      setComments((prev: any) => [...prev, savedComment]);
      setAlertMessage("Comment added successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error adding comment:", error);
      setAlertMessage("Failed to add comment. Please try again.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await videoApi.deleteComment(video.videoId, commentId);
      setComments((prev: any) =>
        prev.filter((c: any) => c.commentId !== commentId)
      );
      setAlertMessage("Comment deleted successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setAlertMessage("Failed to delete comment. Please try again.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
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
      <CommentSection comments={comments} onAddComment={handleAddComment} onDeleteComment={handleDeleteComment} />
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VideoDetailPage;
