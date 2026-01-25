import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.css";
import Input from "../Component/UI/Input";
import Button from "../Component/UI/Button";
import { useLogin } from "../Component/Hooks/useLogin";

function login() {
    const navigate = useNavigate()
    const { login: loginAPI, loading, error: apiError, setError } = useLogin()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setLocalError] = useState("")

    const handleChange = (e) => {
        setFormData({
            // giu lai dl cu
            ...formData,
            // cap nhat dung field theo name 
            [e.target.name]: e.target.value

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLocalError("")
        setError("")

        if (!formData.email || !formData.password) {
            setLocalError("Vui lòng nhập đầy đủ thông tin")
            return
        }

        // Gọi API login
        const result = await loginAPI(formData.email, formData.password)
        
        if (!result.success) {
            setLocalError(result.error)
        }
    }
    return (
        <>
            <div className={styles.loginPage}>

                <div className={styles.formLogin}>
                    <h1>Đăng nhập</h1>
                    <h5>Chào mừng bạn trở lại</h5>
                    {(error || apiError) && <p className={styles.error}>{error || apiError}</p>}
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                            disabled={loading}
                        />
                        <Input
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập password"
                            disabled={loading}
                        />
                        <Button 
                            type="submit" 
                            text={loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            disabled={loading}
                        />
                        <Button type="submit" text="Đăng nhập" className={styles.btnLogin}/>
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