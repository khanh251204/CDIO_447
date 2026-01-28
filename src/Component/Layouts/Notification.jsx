import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { toast } from "react-toastify";
import axios from "axios";

export default function Notification({ userId }) {
    const [notifications, setNotifications] = useState([]);

    /* ========= 1. FETCH BAN ĐẦU ========= */
    useEffect(() => {
        if (!userId) return;

        const fetchNotifications = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/notifications",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                setNotifications(res.data.data || []);
            } catch (err) {
                console.error("❌ Lỗi lấy thông báo", err);
            }
        };

        fetchNotifications();
    }, [userId]);

    /* ========= 2. REALTIME SOCKET ========= */
    useEffect(() => {
        if (!userId) return;

        if (!socket.connected) {
            socket.connect();
        }

        // đăng ký socket theo userId
        socket.emit("register", userId);

        const handleNotification = (data) => {
            setNotifications((prev) => [data, ...prev]);

            toast.info(
                <div>
                    <strong>{data.title}</strong>
                    <div>{data.message}</div>
                </div>,
                { autoClose: 3000 }
            );
        };

        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
        };
    }, [userId]);

    /* ========= 3. ĐÁNH DẤU ĐÃ ĐỌC ========= */
    const markAsRead = async (id) => {
        try {
            await axios.put(
                `http://localhost:3000/api/notifications/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === id ? { ...n, read: true } : n
                )
            );
        } catch (err) {
            console.error("❌ Lỗi đọc thông báo", err);
        }
    };

    /* ========= 4. BADGE ========= */
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div style={{ width: 320 }}>
            <h3>
                🔔 Thông báo {unreadCount > 0 && `(${unreadCount})`}
            </h3>

            {notifications.length === 0 && <p>Chưa có thông báo</p>}

            {notifications.map((noti) => (
                <div
                    key={noti._id}
                    onClick={() => markAsRead(noti._id)}
                    style={{
                        padding: "10px",
                        marginBottom: "8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        background: noti.read ? "#f5f5f5" : "#e6f0ff",
                        border: noti.read
                            ? "1px solid #ddd"
                            : "1px solid #1677ff",
                    }}
                >
                    {/* TITLE */}
                    <div
                        style={{
                            fontWeight: noti.read ? 400 : 600,
                            marginBottom: 4,
                        }}
                    >
                        {noti.title}
                    </div>

                    {/* MESSAGE */}
                    <div
                        style={{
                            fontSize: 14,
                            color: "#555",
                            marginBottom: 4,
                        }}
                    >
                        {noti.message}
                    </div>

                    {/* TIME */}
                    <small style={{ color: "#888" }}>
                        {new Date(noti.createdAt).toLocaleString("vi-VN")}
                    </small>
                </div>
            ))}
        </div>
    );
}
