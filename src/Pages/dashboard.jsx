import styles from "./dashboard.module.css";
import {
  FaFolderOpen,
  FaRegCommentDots,
  FaHeart,
  FaRobot,
  FaUserEdit,
  FaCalendarCheck
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Xin chào, Nguyễn Văn An!</h1>
        <p>Chào mừng bạn đến với Healthcare AI hôm nay bạn thế nào?</p>
      </header>
      {/* Stats */}
      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.statBlue}`}>
          <FaFolderOpen className={styles.statIcon} />
          <div>
            <p>Hồ sơ bệnh án</p>
            <strong>2</strong>
          </div>
        </div>

        <div className={`${styles.stat} ${styles.statGreen}`}>
          <FaRegCommentDots className={styles.statIcon} />
          <div>
            <p>Tư vấn AI</p>
            <strong>1</strong>
          </div>
        </div>

        <div className={`${styles.stat} ${styles.statPurple}`}>
          <FaHeart className={styles.statIcon} />
          <div>
            <p>Tình trạng</p>
            <strong>Tốt</strong>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className={styles.card}>
        <h2>Thao tác nhanh</h2>
        <p className={styles.sub}>Truy cập nhanh các tính năng chính</p>

        <div className={styles.actions}>
          <Action
            title="Tư vấn AI"
            desc="Nhận tư vấn y tế từ AI"
            color={styles.blue}
            icon={<FaRobot />}
          />

          <Action
            title="Xem Hồ Sơ"
            desc="Lịch sử khám bệnh"
            color={styles.green}
            icon={<FaFolderOpen />}
          />

          <Action
            title="Cập Nhật Thông Tin"
            desc="Chỉnh sửa hồ sơ"
            color={styles.purple}
            icon={<FaUserEdit />}
          />

        </div>
      </section>

      {/* Recent Activity */}
      <section className={styles.card}>
        <h2 className={styles.recentTitle}>Hoạt động gần đây</h2>
        <p className={styles.sub}>Lịch sử hoạt động của bạn</p>

        <div className={styles.activityList}>
          <div className={`${styles.activity} ${styles.blueLight}`}>
            <FaCalendarCheck className={styles.activityIcon} />
            <div>
              <strong>Khám bệnh định kỳ</strong>
              <p>10/10/2023 - BS. Trần Minh Hoàng</p>
            </div>
          </div>

          <div className={`${styles.activity} ${styles.greenLight}`}>
            <FaRobot className={styles.activityIcon} />
            <div>
              <strong>Tư vấn AI</strong>
              <p>14/10/2023 - Triệu chứng đau đầu</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== Components nhỏ ===== */

function Action({ title, desc, color, icon }) {
  return (
    <div className={`${styles.action} ${color}`}>
      <div className={styles.actionIcon}>{icon}</div>

      <strong>{title}</strong>
      <span>{desc}</span>
    </div>
  );
}


function Activity({ title, desc, bg }) {
  return (
    <div className={`${styles.activity} ${bg}`}>
      <strong>{title}</strong>
      <p>{desc}</p>
    </div>
  );
}
