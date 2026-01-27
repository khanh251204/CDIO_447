import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        if (!email || !password) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);

            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // gửi cookie cùng request
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Đăng nhập thất bại');
                setLoading(false);
            }

            if (data.success) {
                // Lưu token
                localStorage.setItem('token', data.token);

                // Lưu thông tin user (nếu có)
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                toast.success('Đăng nhập thành công');
                // Điều hướng về trang chủ
                setLoading(false);
                navigate('/dashboard');
            }
        } catch (err) {
            const errorMessage = err.message || 'Lỗi khi đăng nhập';
            toast.error(errorMessage);
            setLoading(false);
            console.error('Login API failed', err);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};
