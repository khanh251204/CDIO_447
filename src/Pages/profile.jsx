import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { Loading } from "../Component/UI/Loading";
import { useProfile } from "../Component/Hooks/useProfile";

export function Profile() {

    const { profile, loading, handleChange, updateProfile } = useProfile();

    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {

        if (profile.height && profile.weight) {

            const h = profile.height / 100;
            const value = (profile.weight / (h * h)).toFixed(1);

            setBmi(value);

            if (value < 18.5) setStatus("Gầy");
            else if (value < 25) setStatus("Bình thường");
            else if (value < 30) setStatus("Thừa cân");
            else setStatus("Béo phì");

        } else {

            setBmi(null);

        }

    }, [profile.height, profile.weight]);

    if (loading) return <Loading />;
    return (

        <div className={styles.page}>

            <div className={styles.container}>

                <h2>Thông tin cá nhân</h2>
                <p>Quản lý và cập nhật thông tin của bạn</p>

                {/* ACCOUNT */}
                <div className={styles.card}>

                    <h2>Thông Tin Tài Khoản</h2>

                    <div className={styles.row}>

                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone || ""}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                </div>

                {/* ================= PATIENT ================= */}
                {profile.role === "patient" && (

                    <>
                        <div className={styles.card}>

                            <h2>Hồ Sơ Sức Khỏe</h2>

                            <div className={styles.formGroup}>
                                <label>Họ và tên</label>
                                <input
                                    name="fullName"
                                    value={profile.fullName || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.row}>

                                <div className={styles.formGroup}>
                                    <label>Ngày sinh</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={profile.dateOfBirth || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Chiều cao (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={profile.height || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Cân nặng (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={profile.weight || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <button
                                className={styles.btn}
                                onClick={updateProfile}
                            >
                                Lưu thay đổi
                            </button>

                        </div>

                        {/* BMI */}
                        <div className={styles.card}>

                            <h2>Chỉ Số BMI</h2>

                            {bmi ? (

                                <>
                                    <div className={styles.bmiValue}>{bmi}</div>
                                    <div className={styles.bmiStatus}>{status}</div>
                                </>

                            ) : (

                                <p>Chưa đủ dữ liệu</p>

                            )}

                        </div>
                    </>
                )}

                {/* ================= DOCTOR ================= */}
                {profile.role === "doctor" && (

                    <div className={styles.card}>

                        <h2>Thông Tin Bác Sĩ</h2>

                        <div className={styles.formGroup}>
                            <label>Họ và tên</label>
                            <input
                                name="fullName"
                                value={profile.fullName || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Chuyên khoa</label>
                            <span className={styles.text}>
                                {profile.specialty || "Chưa cập nhật"}
                            </span>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Số năm kinh nghiệm</label>
                            <span className={styles.text}>
                                {profile.experienceYears || "0"} năm
                            </span>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Bệnh viện</label>
                            <span className={styles.text}>
                                {profile.hospital || "Chưa cập nhật"}
                            </span>
                        </div>

                        <button
                            className={styles.btn}
                            onClick={updateProfile}
                        >
                            Lưu thay đổi
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}