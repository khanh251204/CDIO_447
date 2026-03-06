import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useProfile = () => {

    const [profile, setProfile] = useState({
        email: "",
        phone: "",
        fullName: "",
        dateOfBirth: "",
        height: "",
        weight: ""
    });

    const [loading, setLoading] = useState(false);

    // lấy profile
    const fetchProfile = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (data.success) {

                const user = data.data;

                setProfile({
                    email: user.email || "",
                    phone: user.phone || "",
                    fullName: user.fullName || "",
                    dateOfBirth: user.dateOfBirth
                        ? user.dateOfBirth.split("T")[0]
                        : "",
                    height: user.height || "",
                    weight: user.weight || ""
                });

            } else {

                toast.error(data.message || "Không thể tải profile");

            }

        } catch (error) {

            console.log(error);
            toast.error("Lỗi server");

        } finally {

            setLoading(false);

        }

    };

    // update profile
    const updateProfile = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/api/profile", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(profile)

            });

            const data = await res.json();

            if (data.success) {

                toast.success("Cập nhật thành công");
                fetchProfile();

            } else {

                toast.error(data.message || "Cập nhật thất bại");

            }

        } catch (error) {

            console.log(error);
            toast.error("Lỗi server");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        profile,
        loading,
        handleChange,
        updateProfile
    };

};