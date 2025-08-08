import { Paper, Typography, Divider, Button, Box } from "@mui/material";

const HomePage = () => {
  const handleGoogleClick = () => {
    console.log("Google sign-in clicked — backend integration pending");
  };

  return (
    <div
      style={{
        minHeight: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #6a11cb, #2575fc)",
        padding: "1rem",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          background: "white",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          VideoStream
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{ color: "text.secondary" }}
        >
          Watch, stream, and enjoy your favorite content anytime, anywhere.
          Sign in to get started!
        </Typography>

        {/* Google Sign-in Button */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleGoogleClick}
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              borderColor: "#ccc",
              color: "black",
              px: 3,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#bbb",
              },
            }}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              style={{ width: 20, height: 20 }}
            />
            Continue with Google
          </Button>
        </Box>

        <Typography
          variant="caption"
          display="block"
          align="center"
          mt={2}
          sx={{ color: "text.secondary" }}
        >
          By continuing, you agree to our Terms & Privacy Policy.
        </Typography>
      </Paper>
    </div>
  );
};

export default HomePage;
