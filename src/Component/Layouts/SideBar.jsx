import styles from "./SideBar.module.css";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export const SideBar = () => {
    const navigate = useNavigate();
    const SIDEBAR_MENU = [
        {
            label: "Dashboard",
            path: "/dashboard",
            roles: ["admin", "doctor", "patient"],
        },
        {
            label: "Quản lý bệnh nhân",
            path: "/patients",
            roles: ["admin"],
        },
        {
            label: "Quản lý bác sĩ",
            path: "/doctors",
            roles: ["admin"],
        },
        {
            label: "Bệnh nhân của tôi",
            path: "/my-patients",
            roles: ["doctor"],
        },
        {
            label: "Lịch khám",
            path: "/appointments",
            roles: ["doctor", "patient"],
        },
        {
            label: "Hồ sơ cá nhân",
            path: "/profile",
            roles: ["doctor", "patient"],
        },
    ];
    const fetchLogout =  async() => {
        try {
            const response = await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                localStorage.removeItem("token");
                navigate("/login");
                toast.success(data.message);
            }
        } catch (err) {
            console.error("Logout API failed", err);
            toast.error("Đăng xuất thất bại");
        }
    };

    const token = localStorage.getItem("token");

    const user = token ? jwtDecode(token) : null;

    const userRole = user?.role;

    const filteredMenu = SIDEBAR_MENU.filter(item =>
        item.roles.includes(userRole)
    );

    return (
        <div className={styles.sideBar}>

            <ul>

                {filteredMenu.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            {item.label}
                        </Link>
                    </li>
                ))}

                <li>
                    <Link  onClick={fetchLogout}>
                        Đăng xuất
                    </Link>
                </li>

            </ul>

        </div>
    );
};