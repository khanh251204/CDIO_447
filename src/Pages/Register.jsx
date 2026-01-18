import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./Register.module.css";
import Input from "../Component/UI/Input";
import Button from "../Component/UI/Button";

function Register() {
    // khoi tao ham dieu huong
    const navigate = useNavigate()



    // sate luu du lieu form dky
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    // sate luu tb loi
    const [error, setError] = useState("")

    // dinh dang email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // dinh dang sdt
    const phoneRegex = /^[0-9]{10}$/

    // dinh dang password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

    // ham xu ly khi nhap input
    const handleChange = (e) => {
        setFormData({
            // giu lai dl cu
            ...formData,
            // cap nhat dung field theo name 
            [e.target.name]: e.target.value

        })
    }

    // ham xu ly khi submit form 
    const handleSubmit = (e) => {
        e.preventDefault()//Ngăn trình duyệt reload trang
        setError("")//xoa loi

        //lay dl tu formData
        const { fullname, email, phone, password, confirmPassword } = formData

        //ktra da dien du tt ch
        if (!fullname) {
            setError("Vui lòng nhập họ và tên")
            return
        }
        if (!email) {
            setError("Vui lòng nhập email")
            return
        }
        if (!phone) {
            setError("Vui lòng nhập số điện thoại")
            return
        }
        if (!password) {
            setError("Vui lòng nhập password")
            return
        }
        if (!confirmPassword) {
            setError("Vui lòng nhập họ và tên")
            return
        }

        // ktra dung dinh dang ko 
        if (!emailRegex.test(email)) {
            setError("Email không hợp lệ")
            return
        }
        if (!phoneRegex.test(phone)) {
            setError("Số điện thoại không hợp lệ ")
            return
        }
        if (!passwordRegex.test(password)) {
            setError("Mật khẩu phải ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt không hợp lệ ")
            return
        }

        //ktra conf pw co trung ko 
        if (password != confirmPassword) {
            setError("Mật khẩu không khớp")
            return
        }

        //dung het dky thanh cong
        alert("Đăng ký thành công")
        //chuyen sang trang login
        navigate("/login")
    }

    //giao dien
    return (
        <>
            <div className={styles.registerPage}>
                <h2>Đăng ký</h2>
                <h5>Tạo tài khoản để bắt đầu</h5>
                <div className={styles.formRegis}>
                    <h2>Thông tin cá nhân</h2>
                    <h5>Vui lòng điền đầy đủ thông tin để đăng ký</h5>
                    {error && <p className={styles.error}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Họ tên"
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Nhập họ tên"
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                        />
                        <Input
                            label="Số điện thoại"
                            type="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                        />
                        <Input
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập password"
                        />
                        <Input
                            label="Xác nhận mật khẩu"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại password"
                        />
                        <Button type="submit" text="Đăng ký" />

                    </form>
                    <p className={styles.loginlink}>
                        Đã có tài khoản?{" "}
                        <span onClick={() => navigate("/login")}>Đăng nhập</span>
                    </p>
                </div>

            </div>
        </>

    )



}
export default Register


