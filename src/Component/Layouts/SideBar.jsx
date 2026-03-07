import styles from "./SideBar.module.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export const SideBar = () => {

    const SIDEBAR_MENU = [
        {
            label: "Dashboard",
            path: "/dashboard",
            roles: ["admin", "doctor", "patient"],
        },
        {
            label: "Quản lý người dùng",
            path: "/users",
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
                    <Link to="/logout">
                        Đăng xuất
                    </Link>
                </li>

            </ul>

        </div>
    );
};