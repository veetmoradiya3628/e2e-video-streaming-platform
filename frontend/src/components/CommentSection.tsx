import { useState } from "react";
import { Box, Typography, TextField, Button, Avatar, Paper } from "@mui/material";

interface Comment {
  id: string;
  user: string;
  text: string;
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
    <Paper className="p-4 mt-6" elevation={2}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <Avatar>A</Avatar>
        <TextField
          fullWidth
          size="small"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd} disabled={!comment.trim()}>
          Post
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {comments.map((c) => (
          <Box key={c.id} display="flex" alignItems="center" gap={2}>
            <Avatar>{c.user[0]}</Avatar>
            <Box>
              <Typography variant="subtitle2">{c.user}</Typography>
              <Typography variant="body2">{c.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default CommentSection;
