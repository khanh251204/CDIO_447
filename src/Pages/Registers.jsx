import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./Registers.module.css";
import Input from "../Component/UI/Input";
import Button from "../Component/UI/Button";
import { toast } from "react-toastify"

export function Registers() {
    // khoi tao ham dieu huong
    const navigate = useNavigate()



    // sate luu du lieu form dky
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        height: "",
        weight: "",
        confirmPassword: ""
    })


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
        //ktra da dien du tt ch

        if (!formData.fullName) {
            toast.error("Vui lòng nhập họ và tên")
            return
        }
        if (!formData.email) {
            toast.error("Vui lòng nhập email")
            return
        }
        if (!formData.phone) {
            toast.error("Vui lòng nhập số điện thoại")
            return
        }
        if (!formData.password) {
            toast.error("Vui lòng nhập password")
            return
        }
        if (!formData.confirmPassword) {
            toast.error("Vui lòng nhập lại mật khẩu")
            return
        }

        // ktra dung dinh dang ko 
        if (!emailRegex.test(formData.email)) {
            toast.error("Email không hợp lệ")
            return
        }
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Số điện thoại không hợp lệ ")
            return
        }
        if (!passwordRegex.test(formData.password)) {
            toast.error("Mật khẩu phải ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt không hợp lệ ")
            return
        }

        //ktra conf pw co trung ko 
        if (formData.password !== formData.confirmPassword) {
            toast.error("Mật khẩu không khớp")
            return
        }
        const fetchRegister = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();

                if (data.success) {
                    toast.success(data.message);
                    navigate("/login");
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchRegister();
    }

    //giao dien
    return (
        <>
            <div className={styles.registerPage}>
                <div className={styles.formRegis}>
                    <h1>Đăng ký</h1>
                    <h5>Vui lòng điền đầy đủ thông tin để đăng ký</h5>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.forminput}>
                            <div className={styles.formleft}>
                                <Input
                                    label="Họ tên"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
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
                                <div className={styles.gender}>
                                <label >Gioi tinh</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                                </div>
                                {/* Datebirth */}
                                <Input
                                    label="Ngày sinh"
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Height */}
                            <div className={styles.formright}>
                                <Input
                                    label="Chiều cao (cm)"
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    placeholder="Nhập chiều cao"
                                />
                                {/* Weight */}
                                <Input
                                    label="Cân nặng (kg)"
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="Nhập cân nặng"
                                />
                                {/* Password */}
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
                            </div>
                        </div>
                        <Button type="submit" text="Đăng ký" className={styles.btnRegister} />

                    </form>
                    <p className={styles.loginlink}>
                        Đã có tài khoản?{" "}
                        <span onClick={() => navigate("/Login")}>Đăng nhập</span>
                    </p>
                </div>

            </div>
        </>

    )



}


