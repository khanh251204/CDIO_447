import { useState, useEffect } from "react";
import styles from "./profile.module.css";

export function Profile() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (height && weight) {
            const h = height / 100;
            const value = (weight / (h * h)).toFixed(1);
            setBmi(value);

            if (value < 18.5) setStatus("Gầy");
            else if (value < 25) setStatus("Bình thường");
            else if (value < 30) setStatus("Thừa cân");
            else setStatus("Béo phì");
        } else {
            setBmi(null);
        }
    }, [height, weight]);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2>Thông tin cá nhân</h2>
                <p>Quản lý và cập nhật thông tin sức khoẻ của bạn</p>
                <div className={styles.card}>
                    <h2>Thông Tin Tài Khoản</h2>
                    <p className={styles.sub}>
                        Cập nhật thông tin liên hệ của bạn
                    </p>

                    <div className={styles.row}>
                        {/* Email */}
                        <div className={styles.formGroup}>
                            <label>
                                <i className="fa-regular fa-envelope"></i> Email
                            </label>
                            <input
                                type="email"
                                placeholder="Nhập email"
                            />
                        </div>

                        {/* Số điện thoại */}
                        <div className={styles.formGroup}>
                            <label>
                                <i className="fa-solid fa-phone"></i> Số điện thoại
                            </label>
                            <input
                                type="tel"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2>Hồ Sơ Sức Khỏe</h2>
                    <p>Cập nhật thông tin sức khỏe của bạn</p>

                    {/* Họ và tên */}
                    <div className={styles.formGroup}>
                        <label>Họ và tên</label>
                        <input className={styles.full} />
                    </div>

                    {/* Tuổi + Chiều cao + Cân nặng */}
                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label>Tuổi</label>
                            <input type="number" />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Chiều cao (cm)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Cân nặng (kg)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className={styles.btn}>Lưu thay đổi</button>
                </div>
                {/* BMI */}
                <div className={styles.page}>
                    <div className={styles.layout}>

                        {/* CỘT TRÁI – CHỈ SỐ */}
                        <div className={styles.left}>
                            <div className={`${styles.card} ${styles.bmiCard}`}>
                                <h2>Chỉ Số BMI</h2>
                                <p>Body Mass Index - Chỉ số khối cơ thể</p>

                                {bmi ? (
                                    <>
                                        <div className={styles.bmiValue}>{bmi}</div>
                                        <div className={styles.bmiStatus}>{status}</div>
                                        <p className={styles.note}>
                                            Dựa trên chiều cao và cân nặng
                                        </p>
                                    </>
                                ) : (
                                    <p className={styles.note}>
                                        Chưa đủ dữ liệu
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}