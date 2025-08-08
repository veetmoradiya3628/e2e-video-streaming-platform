import { Container, Box } from "@mui/material";
import UploadForm from "../components/UploadForm";

const UploadVideoPage = () => {
  const handleUpload = (data: any) => {
    // Backend integration for upload will go here
    alert("Video uploaded! (mock)");
  };

  return (
    <Container maxWidth="sm" className="py-8">
      <Box mt={4}>
        <UploadForm onSubmit={handleUpload} />
      </Box>
    </Container>
  );
};

export default UploadVideoPage;
