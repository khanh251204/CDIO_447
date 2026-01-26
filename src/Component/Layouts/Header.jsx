import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import Button from "../UI/Button";
import { useAuth } from "../Hooks/useAuth";
import { useLogout } from "../Hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "../UI/Loading";

export const Header = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { logout } = useLogout();

  return (
    <nav>

      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>

        {token ? (
          <div className={styles.btn}>
            <Button
              type="button"             
              onClick={logout}
              text={"Đăng Xuất"}
              className={styles.btnLogout}
            />
          </div>
        ) : (
          <div className={styles.btn}>
            <Button
              type="button"
              onClick={() => navigate("/login")}
              text="Đăng Nhập"
              className={styles.btnLogin}
            />
            <Button
              type="button"
              onClick={() => navigate("/register")}
              text="Đăng Ký"
              className={styles.btnRegister}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
