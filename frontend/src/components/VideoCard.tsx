import { Card, CardMedia, CardContent, Typography, Box, Avatar, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  videoId: string;
  title: string;
  thumbnail: string;
  username: string;
  status: "UPLOADING" | "PROCESSING" | "UNPUBLISHED" | "PUBLISHED" | "FAILED";
  src: string;
  description?: string;
  comments?: Array<{ commentId?: string, userId: string; commentText: string; createdAt: string }>;
  onClick?: () => void;
}

const statusColors: Record<string, "success" | "warning" | "default"> = {
  PUBLISHED: "success",
  UPLOADING: "warning",
  PROCESSING: "warning",
  UNPUBLISHED: "default",
  FAILED: "warning",
  Draft: "default",
};
const VideoCard = ({ videoId, title, thumbnail, username, status, src, description, comments, onClick }: VideoCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const video = { videoId, title, thumbnail, username, status, src, description, comments };
    navigate(`/video/${videoId}`, { state: video });
  };


  return (<Card
    className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
    sx={{ maxWidth: 320, borderRadius: 3 }}
    onClick={handleClick}
  >
    <CardMedia
      component="img"
      height="180"
      image={thumbnail}
      alt={title}
      sx={{ objectFit: "cover" }}
    />

    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {title}
        </Typography>
        <Chip
          label={status}
          color={statusColors[status] || "default"}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: 24, height: 24 }}>{username[0]}</Avatar>
        <Typography variant="body2" color="text.secondary" noWrap>
          {username === localStorage.getItem("username") ? "You" : username}
        </Typography>
      </Box>
    </CardContent>
  </Card>)
};

export default VideoCard;