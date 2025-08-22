import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp?: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom fontWeight="600">
        💬 Comments
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: "grey.50" }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>
        <TextField
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <IconButton color="primary" onClick={handleAdd} disabled={!comment.trim()}>
          <SendIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" gap={2}>
        {comments.map((c) => (
          <Paper
            key={c.id}
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              "&:hover": { boxShadow: 3 },
            }}
          >
            <Box display="flex" gap={2}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>{c.user[0]}</Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="500">
                  {c.user}{" "}
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {c.timestamp || "Just now"}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.text}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default CommentSection;
