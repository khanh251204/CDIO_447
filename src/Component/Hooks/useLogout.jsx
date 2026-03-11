import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const useLogout = () => {
    const navigate = useNavigate();

    const fetchLogout = async () => {

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            toast.success("Đăng xuất thành công");
        } catch (err) {
            console.error("Logout API failed", err);
        } finally {
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
        }
    };

    return { fetchLogout };
};
