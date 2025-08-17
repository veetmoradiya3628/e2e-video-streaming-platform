import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    LinearProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { authApi } from "../services/api";

interface RegisterDialogProps {
    open: boolean;
    onClose: () => void;
}

const RegisterDialog = ({ open, onClose }: RegisterDialogProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        open: boolean;
        type: "success" | "error";
        message: string;
    }>({ open: false, type: "success", message: "" });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setAlert({
                open: true,
                type: "error",
                message: "please fill registration form properly!"
            })
            return;
        }

        let reqBody: any = {
            username,
            email,
            password
        }

        try {
            setLoading(true);
            await authApi.registerUser(reqBody);
            setAlert({ open: true, type: "success", message: "User registration successfully!" });
            onClose();
        } catch (error) {
            console.log("Error registering user : ", error);
            setAlert({ open: true, type: "error", message: "User Registration failed. Try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                {loading && <LinearProgress />}
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField
                            label="Username"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <Button variant="contained" onClick={handleRegister}>
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => setAlert({ ...alert, open: false })}
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

export default RegisterDialog;
