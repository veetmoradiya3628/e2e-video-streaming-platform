import { Card, CardMedia, CardContent, Typography, Box, Avatar } from "@mui/material";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  uploader: string;
  views: number;
  onClick?: () => void;
}

const VideoCard = ({ title, thumbnail, uploader, views, onClick }: VideoCardProps) => (
  <Card
    className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
    sx={{ maxWidth: 320, borderRadius: 3 }}
    onClick={onClick}
  >
    <CardMedia
      component="img"
      height="180"
      image={thumbnail}
      alt={title}
      sx={{ objectFit: "cover" }}
    />
    <CardContent>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
        {title}
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: 24, height: 24 }}>{uploader[0]}</Avatar>
        <Typography variant="body2" color="text.secondary" noWrap>
          {uploader}
        </Typography>
        <Typography variant="body2" color="text.secondary" ml={2}>
          {views} views
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default VideoCard;
