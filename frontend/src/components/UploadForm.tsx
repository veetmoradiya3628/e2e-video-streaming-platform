import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

interface UploadFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    videoFile: File | null;
    thumbnailFile: File | null;
  }) => void;
}

const UploadForm = ({ onSubmit }: UploadFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, videoFile, thumbnailFile });
  };

  return (
    <Paper className="p-6" elevation={3}>
      <Typography variant="h5" gutterBottom>
        Upload New Video
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
        />
        <Button variant="outlined" component="label">
          Select Video File
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            required
          />
        </Button>
        <Button variant="outlined" component="label">
          Select Thumbnail Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          />
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadForm;
