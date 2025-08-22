import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { videoApi } from "../services/api";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      setAlert({ open: true, type: "error", message: "Please select a video file!" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", localStorage.getItem("userId") || "test-user");
    formData.append("video", videoFile);

    try {
      setLoading(true);
      await videoApi.upload(formData);
      setAlert({ open: true, type: "success", message: "Video uploaded successfully!" });

      setTitle("");
      setDescription("");
      setVideoFile(null);
    } catch (error) {
      console.error("Error uploading video:", error);
      setAlert({ open: true, type: "error", message: "Upload failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto", borderRadius: "16px", boxShadow: 3 }}>
      {loading && <LinearProgress />}
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Upload New Video
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item size={12}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={3}
              />
            </Grid>
            <Grid item size={12}>
              <Button variant="outlined" component="label" fullWidth>
                {videoFile ? videoFile.name : "Select Video File"}
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  required
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ py: 1.2, fontWeight: 600, borderRadius: "12px" }}
              >
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      {/* Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={alert.type}
          onClose={() => setAlert({ ...alert, open: false })}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default UploadForm;
