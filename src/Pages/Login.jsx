import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.css";
import Input from "../Component/UI/Input";
import Button from "../Component/UI/Button";

function login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setFormData({
            // giu lai dl cu
            ...formData,
            // cap nhat dung field theo name 
            [e.target.name]: e.target.value

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (!formData.emailOrPhone || !formData.password) {
            setError("Vui lòng nhập đầy đủ thong tin")
            return 
        }

        if (
            formData.emailOrPhone === "patient@gmail.com" &&
            formData.password === "123456"
        ) {
            // Giả lập JWT Token
            const fakeToken = "jwt-token-demo";

            // Lưu token
            localStorage.setItem("token", fakeToken);

            // Điều hướng
            navigate("/");
        } else {
            setError("EmailOrPhone or Password khong hop le");
        }
    }
    return (
        <>
            <div className={styles.loginPage}>
                <h2>Đăng nhập</h2>
                <h5>Chào mừng bạn trở lại</h5>
                <div className={styles.formLogin}>
                    <h2>Thông tin đăng nhập</h2>
                    <h5>vui lòng điền đủ thông tin để đăng nhập</h5>
                    {error && <p className={styles.error}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email hoặc số điện thoại"
                            type="text"
                            name="emailOrPhone"
                            value={formData.emailOrPhone}
                            onChange={handleChange}
                            placeholder="Nhập email hoặc số điện thoại"
                        />
                        <Input
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập password"
                        />
                        <Button type="submit" text="Đăng nhập" />
                    </form>
                    <p className={styles.registerlink}>
                        Chưa có tài khoản?{" "}
                        <span onClick={() => navigate("/Register")}>Đăng ký</span>
                    </p>

                </div>


            </div>
        </>
    )


}
export default login