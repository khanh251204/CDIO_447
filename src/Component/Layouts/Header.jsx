import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import Button from "../UI/Button"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()
    return (
        <nav>
            <div className={styles.container}>
                <a href="/">
                    <img
                        className={styles.logo}
                        src={logo}
                    />
                </a>
                <div className={styles.btn}>
                    <Button
                        onClick={() => navigate("/Login")}
                        text="Đăng Nhập"
                        className={styles.btnLogin}
                    />
                    <Button
                        onClick={() => navigate("/Register")}
                        text="Đăng Ký"
                        className={styles.btnRegister}
                    />
                </div>
            </div>
        </nav>
    );
};
