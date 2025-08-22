import { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import VideoList from "../components/VideoList";
import { feedVideosApi } from "../services/api"; 

const VideoFeedPage = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const resp = await feedVideosApi.list();
        setVideos(resp.data.data || []);
        setAlert({ open: true, type: "success", message: "Videos loaded!" });
      } catch (err: any) {
        console.error(err);
        setAlert({ open: true, type: "error", message: "Failed to load videos" });
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Trending Videos
      </Typography>
      {alert.open && (
        <Box mb={2}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Box>
      )}
      <Box mt={4}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <VideoList videos={videos} />
        )}
      </Box>
    </Container>
  );
};

export default VideoFeedPage;
