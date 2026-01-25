import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import Button from "../UI/Button"

export const Header = () => {
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
            text="Đăng Nhập"
            className={styles.btnLogin}
          />
          <Button
            text="Đăng Ký"
            className={styles.btnRegister}
          />
        </div>





      </div>
    </nav>
  );
};
