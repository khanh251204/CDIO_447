import {Link} from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
	return (
		<div className={styles.home}>
			{/* HERO SECTION */}
			<section className={styles.hero}>
				<div className={styles.heroLeft}>
					<span className={styles.tag}>
						<i className="fa-brands fa-amilia"></i>
						🚀 Công nghệ tiên tiến
					</span>
					<h1>
						Chăm sóc sức khỏe <span>thông minh</span>
					</h1>
					<p>
						Trải nghiệm tư vấn y tế hiện đại với AI, quản lý hồ sơ bệnh án điện tử và theo dõi sức khỏe toàn diện - mọi lúc, mọi nơi.
					</p>

					<div className={styles.buttons}>
						<button className={styles.primaryBtn}>Bắt đầu miễn phí <i className="fa-solid fa-angle-right"></i></button>
						<button className={styles.secondaryBtn}>
							<Link to="/login">Đăng nhập</Link>
						</button>
					</div>
				</div>

				<div className={styles.heroRight}>
					<img src="/doctor.png" alt="Doctor consulting patient" />
					<div className={styles.trustBox}> ❤️ Độ tin cậy <br></br> <b>98%</b></div>
				</div>
			</section>

			{/* FEATURES */}
			<section className={styles.features}>
				<h2>Tính Năng Nổi Bật</h2>
				<p className={styles.subTitle}>
					Trải nghiệm hệ thống chăm sóc sức khỏe toàn diện với công nghệ tiên tiến
				</p>

				<div className={styles.featureList}>
					<div className={styles.featureItem}>
						<h3>Tư Vấn AI Thông Minh</h3>
						<p>Nhận tư vấn y tế sơ bộ từ AI được đào tạo bởi các chuyên gia</p>
					</div>

					<div className={styles.featureItem}>
						<h3>Hồ Sơ Bệnh Án Điện Tử</h3>
						<p>Lưu trữ và quản lý toàn bộ lịch sử khám bệnh của bạn</p>
					</div>

					<div className={styles.featureItem}>
						<h3>Bảo Mật Tuyệt Đối</h3>
						<p>Thông tin y tế của bạn được mã hóa và bảo vệ tối đa</p>
					</div>

					<div className={styles.featureItem}>
						<h3>Theo Dõi Sức Khỏe</h3>
						<p>Cập nhật và theo dõi tình trạng sức khỏe theo thời gian</p>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className={styles.cta}>
				<h2>Sẵn Sàng Bắt Đầu Chăm Sóc Sức Khỏe?</h2>
				<p>Đăng ký ngay để trải nghiệm dịch vụ chăm sóc sức khỏe thông minh</p>
				<button className={styles.primaryBtn}>Đăng ký miễn phí</button>
			</section>
		</div>
	);
};
