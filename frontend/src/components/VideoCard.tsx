import { Card, CardMedia, CardContent, Typography, Box, Avatar, Chip } from "@mui/material";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  username: string;
  status: "UPLOADING" | "PROCESSING" | "UNPUBLISHED" | "PUBLISHED" | "FAILED";
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
const VideoCard = ({ title, thumbnail, username, status, onClick }: VideoCardProps) => (
  <Card
    className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
    sx={{ maxWidth: 320, borderRadius: 3 }}
    onClick={onClick}
  >
    {/* Thumbnail */}
    <CardMedia
      component="img"
      height="180"
      image={thumbnail}
      alt={title}
      sx={{ objectFit: "cover" }}
    />

    {/* Card Content */}
    <CardContent>
      {/* Title + Status */}
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

      {/* User Info */}
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: 24, height: 24 }}>{username[0]}</Avatar>
        <Typography variant="body2" color="text.secondary" noWrap>
          {username === localStorage.getItem("username") ? "You" : username}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default VideoCard;