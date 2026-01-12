import styles from "./Header.module.css";

export const Header = () => {
  return (
    <nav>
      <div className={styles.container}>
        <a href="/">
          <img
            className={styles.logo}
            src="https://static.znews.vn/images/logo-znews-light-2.svg"
            alt="Zing News"
          />
        </a>

        <ul>
          <li>Xuất bản</li>
          <li>Kinh doanh</li>
          <li>Sức khỏe</li>
          <li>Thể thao</li>
          <li>Đời sống</li>
          <li>Công nghệ</li>
          <li>Giải trí</li>
          <li>Lifestyle</li>
          <li>...</li>
        </ul>

        <i className="bi bi-search"></i>
      </div>
    </nav>
  );
};
