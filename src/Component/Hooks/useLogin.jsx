import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError('');

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
      }

      if (data.success) {
        // Lưu token
        localStorage.setItem('token', data.token);
        
        // Lưu thông tin user (nếu có)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        // Điều hướng về trang chủ
        navigate('/');
        return { success: true, data };
      }
    } catch (err) {
      const errorMessage = err.message || 'Lỗi khi đăng nhập';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
};
