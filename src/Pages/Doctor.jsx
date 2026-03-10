import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./Doctor.module.css";
// import Input from "../Component/UI/Input";
// import Button from "../Component/UI/Button";
// import SideBar from "../Component/Layouts/SideBar" 


export const Doctor = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const doctors = [
        { id: "D001", name: "Trần Thị Bích", department: "Da Liễu" },
        { id: "D002", name: "Lê Văn Tuấn", department: "Chỉnh hình" },
        { id: "D003", name: "Nguyễn Minh Anh", department: "Ngoại tổng hợp" },
        { id: "D004", name: "Phạm Quốc Bảo", department: "Nội tổng hợp" },
        { id: "D005", name: "Đoàn Thị Huệ", department: "Tai, mũi, họng" },
    ];

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        alert("Xóa bác sĩ ID: " + id);
    };

    const handleView = (id) => {
        navigate(`/doctor/${id}`);
        // alert("Xem hồ sơ bác sĩ ID: " + id);
    };

    return (



        <div className={styles.container}>
            {/* Main Content */}
            <div className={styles.content}>

                <div className={styles.top}>
                    <div className={styles.topleft}>
                        <h2>Danh sách bác sĩ</h2>
                        <p>Quản lý thông tin bác sĩ</p>

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên hoặc ID"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.search}
                        />
                    </div>
                    <div className={styles.topright}>
                        <button className={styles.addbtn}>
                            + Thêm
                        </button>
                    </div>
                </div>

                {/* Table */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên bác sĩ</th>
                            <th>Khoa</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredDoctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.id}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.department}</td>
                                <td>
                                    <button
                                        className={styles.view}
                                        onClick={() => handleView(doctor.id)}
                                    >
                                        Xem hồ sơ
                                    </button>

                                    <button
                                        className={styles.delete}
                                        onClick={() => handleDelete(doctor.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className={styles.pagination}>
                    <button>{"<"}</button>
                    <span className={styles.active}>1</span>
                    <span>2</span>
                    <button>{">"}</button>
                </div>

            </div>
        </div>
    );
};

