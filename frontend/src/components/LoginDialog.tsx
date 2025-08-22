import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Snackbar,
    Alert,
    LinearProgress,
} from "@mui/material";
import { authApi } from "../services/api";
import { useNavigate } from "react-router-dom";

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        open: boolean;
        type: "success" | "error";
        message: string;
    }>({ open: false, type: "success", message: "" });
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setAlert({
                open: true,
                type: "error",
                message: "please fill login form properly!"
            })
            return;
        }

        let reqBody: any = {
            username,
            password
        }

        try {
            setLoading(true);
            const resp = await authApi.loginUser(reqBody);
            const token = resp.data.token;
            localStorage.setItem("auth_token", token);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", resp.data.userId);
            localStorage.setItem("username", resp.data.username);

            setAlert({
                open: true,
                type: "success",
                message: "User login successful!"
            })

            setTimeout(() => {
                onClose();
                navigate("/feed");
            }, 1500)
        } catch (error) {
            console.log('Error login user : ', error)
            setAlert({ open: true, type: "error", message: "User login failed. Try again." })
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                {loading && <LinearProgress />}
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField
                            label="Username"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleLogin} disabled={loading || alert.open}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => {
                    setAlert({ ...alert, open: false })
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity={alert.type}
                    onClose={() => setAlert({ ...alert, open: false })}
                    sx={{ width: "100%" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginDialog;
