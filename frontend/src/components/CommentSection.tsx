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
import DeleteIcon from "@mui/icons-material/Delete";

interface Comment {
  commentId?: string;
  userId: string;
  commentText: string;
  createdAt?: string;
  username: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

const CommentSection = ({
  comments,
  onAddComment,
  onDeleteComment,
}: CommentSectionProps) => {
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  const loggedInUserId = localStorage.getItem("userId");

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
        <IconButton
          color="primary"
          onClick={handleAdd}
          disabled={!comment.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" gap={2}>
        {[...comments]
          .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          })
          .map((c) => (
            <Paper
              key={c.commentId || Math.random().toString(36).substr(2, 9)}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Box display="flex" gap={2}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  {c.username[0]}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="subtitle2" fontWeight="500">
                    {c.username === localStorage.getItem("username")
                      ? "You"
                      : c.username}{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString()
                        : "Just now"}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.commentText}
                  </Typography>
                </Box>
                {loggedInUserId === c.userId && onDeleteComment && c.commentId && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDeleteComment(c.commentId!)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Paper>
          ))}
      </Box>
    </Paper>
  );
};

export default CommentSection;
