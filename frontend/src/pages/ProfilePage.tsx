import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, CircularProgress } from "@mui/material";
import { userApi } from "../services/api";

interface User {
    lastActiveAt: string;
    userId: string;
    updatedAt: string;
    createdAt: string;
    username: string;
    email: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userApi.getUserInfo(localStorage.getItem("userId") || "");
                const data = await response.data;
                setUser(data.user);
            } catch (err) {
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (!user) {
        return <Typography variant="h6" align="center">No user data found</Typography>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="max-w-md w-full p-4 rounded-2xl shadow-lg">
                <CardContent className="flex flex-col items-center space-y-4">
                    <Avatar sx={{ width: 80, height: 80 }}>
                        {user.username[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="h5">{user.username}</Typography>
                    <Typography color="text.secondary">{user.email}</Typography>

                    <div className="w-full mt-4 space-y-2">
                        <Typography variant="body2"><b>User ID:</b> {user.userId}</Typography>
                        <Typography variant="body2"><b>Created At:</b> {new Date(user.createdAt).toLocaleString()}</Typography>
                        <Typography variant="body2"><b>Updated At:</b> {new Date(user.updatedAt).toLocaleString()}</Typography>
                        <Typography variant="body2">
                            <b>Last Active:</b> {user.lastActiveAt ? new Date(user.lastActiveAt).toLocaleString() : "N/A"}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
