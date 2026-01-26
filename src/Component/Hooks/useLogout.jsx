import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {

        try {
            await fetch("http://localhost:3000/api/logout", {
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
            localStorage.removeItem("user");
            navigate("/login", { replace: true });
        }
    };

    return { logout };
};
