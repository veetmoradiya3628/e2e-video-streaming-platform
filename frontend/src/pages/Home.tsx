import { useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import LoginDialog from "../components/LoginDialog";
import RegisterDialog from "../components/RegisterDialog";

const HomePage = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

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
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} mt={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => setOpenRegister(true)}
          >
            Register
          </Button>
        </Box>
      </Paper>

      <LoginDialog open={openLogin} onClose={() => setOpenLogin(false)} />
      <RegisterDialog open={openRegister} onClose={() => setOpenRegister(false)} />
    </div>
  );
};

export default HomePage;
