import styles from './SideBar.module.css';
import {jwtDecode} from "jwt-decode";



export const SideBar = () => {
    const SIDEBAR_MENU = [
        {
            label: "Dashboard",
            path: "/dashboard",
            roles: ["admin", "doctor", "Patient"],
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
            roles: ["doctor", "Patient"],
        },
        {
            label: "Hồ sơ cá nhân",
            path: "/profile",
            roles: ["doctor", "Patient"],
        },
    ];
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;
    console.log("Decoded user from token:", user);
    const userRole = user ? user.role : null;
    const filteredMenu = SIDEBAR_MENU.filter(item => item.roles.includes(userRole));
    return (
        <div className={styles.sideBar}>
            <ul>
                {filteredMenu.map((item, index) => (
                    <li key={index}>
                        <a href={item.path}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}