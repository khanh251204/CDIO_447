import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <ul className={styles.column}>
                    <li>
                        <a href="/">
                            <img
                                className={styles.logo}
                                src={logo}
                            />
                        </a>
                        <p>
                            Nền tảng tư vấn y tế thông minh, giúp bạn chăm sóc
                            sức khỏe tốt hơn mỗi ngày.
                        </p>
                    </li>
                    <li>
                        <h4>Liên hệ</h4>
                        <p>Email: support@healthcareai.com</p>
                        <p>Hotline: 1900 xxxx</p>
                    </li>
                    <li>
                        <h4>Pháp lý</h4>
                        <p>Chính sách bảo mật</p>
                        <p>Điều khoản sử dụng</p>
                    </li>
                </ul>
            </div>
            <hr></hr>
            <div className={styles.copy}>
                © 2026 Healthcare AI. All rights reserved.
            </div>
        </footer>
    );
};


