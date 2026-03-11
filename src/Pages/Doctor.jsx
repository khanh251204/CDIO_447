import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

/* ---------- STYLE ---------- */

const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px"
};

const thStyle = {
    padding: "15px",
    textAlign: "left",
    background: "#f1f3f5"
};

const tdStyle = {
    padding: "15px",
    borderTop: "1px solid #eee"
};

const btnPrimary = {
    background: "#4c6ef5",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer"
};

const btnDanger = { ...btnPrimary, background: "#fa5252" };
const btnEdit = { ...btnPrimary, background: "#fab005" };

const badge = {
    padding: "5px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold"
};

const modalOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const modalBox = {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px"
};

/* ---------- COMPONENT ---------- */

export function Doctor() {

    const [doctor, setDoctor] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [showFormModal, setShowFormModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        department: "",
        specialty: "",
        experienceYears: "",
        hospital: "",
        licenseNumber: "",
        status: "pending"
    });

    /* ---------- STATUS MAP ---------- */

    const statusMap = {
        pending: "Chờ duyệt",
        approved: "Đã duyệt",
        rejected: "Từ chối"
    };

    const getStatusStyle = (status) => {
        if (status === "approved")
            return { bg: "#e6fcf5", text: "#0ca678" };

        if (status === "pending")
            return { bg: "#fff9db", text: "#f08c00" };

        return { bg: "#fff5f5", text: "#fa5252" };
    };

    /* ---------- API ---------- */

    const fetchDoctors = async () => {

        try {

            const res = await fetch("http://localhost:3000/api/doctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();

            if (data.success) {
                setDoctor(data.data);
            }

        } catch {
            toast.error("Không lấy được danh sách bác sĩ");
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    /* ---------- ADD ---------- */

    const handleOpenAdd = () => {

        setIsEditMode(false);

        setFormData({
            fullName: "",
            email: "",
            department: "",
            specialty: "",
            experienceYears: "",
            hospital: "",
            licenseNumber: "",
            status: "",
            password: "",
            confirmPassword: ""
        });

        setShowFormModal(true);
    };

    /* ---------- EDIT ---------- */
    
    const handleOpenEdit = (doc) => {

        setIsEditMode(true);

        setCurrentId(doc.doctorId);

        setFormData(doc);

        setShowFormModal(true);
    };

    /* ---------- DELETE ---------- */

    const handleDelete = async (id) => {

        if (!window.confirm("Bạn có chắc muốn xóa?")) return;

        try {

            const res = await fetch(
                `http://localhost:3000/api/doctors/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("Xóa thành công");
                fetchDoctors();
            }

        } catch {
            toast.error("Lỗi xóa");
        }
    };

    /* ---------- SUBMIT ---------- */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Mật khẻu không khợp");
            return;
        }

        const url = isEditMode
            ? `http://localhost:3000/api/doctors/${currentId}`
            : "http://localhost:3000/api/doctors";

        try {

            const res = await fetch(url, {
                method: isEditMode ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {

                toast.success(isEditMode ? "Cập nhật thành công" : "Thêm thành công");

                setShowFormModal(false);

                fetchDoctors();
            }

        } catch {
            toast.error("Lỗi hệ thống");
        }
    };

    /* ---------- FILTER ---------- */

    const filtered = doctor.filter((d) =>
        d.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* ---------- UI ---------- */

    return (
        <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h2>Quản lý bác sĩ</h2>
                <button style={btnPrimary} onClick={handleOpenAdd}>+ Thêm bác sĩ</button>
            </div>

            <input
                placeholder="Tìm bác sĩ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ ...inputStyle, marginBottom: 20, width: "300px" }}
            />

            <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse" }}>

                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Tên</th>
                        <th style={thStyle}>Khoa</th>
                        <th style={thStyle}>Kinh nghiệm</th>
                        <th style={thStyle}>Chuyên môn</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {filtered.map((p, index) => {

                        const s = getStatusStyle(p.status);

                        return (

                            <tr key={p._id}>

                                <td style={tdStyle}>{index + 1}</td>

                                <td style={tdStyle}>{p.fullName}</td>

                                <td style={tdStyle}>{p.department}</td>

                                <td style={tdStyle}>{p.experienceYears} năm</td>

                                <td style={tdStyle}>{p.specialty}</td>

                                <td style={tdStyle}>
                                    <span
                                        style={{
                                            ...badge,
                                            background: s.bg,
                                            color: s.text
                                        }}
                                    >
                                        {statusMap[p.status]}
                                    </span>
                                </td>

                                <td style={tdStyle}>

                                    <button
                                        style={btnEdit}
                                        onClick={() => handleOpenEdit(p)}
                                    >
                                        Sửa
                                    </button>

                                    <button
                                        style={{ ...btnDanger, marginLeft: 5 }}
                                        onClick={() => handleDelete(p._id)}
                                    >
                                        Xóa
                                    </button>

                                </td>

                            </tr>

                        );
                    })}

                </tbody>

            </table>

            {/* MODAL FORM */}

            {showFormModal && (

                <div style={modalOverlay}>

                    <div style={modalBox}>

                        <h3>{isEditMode ? "Sửa bác sĩ" : "Thêm bác sĩ"}</h3>

                        <form
                            onSubmit={handleSubmit}
                            style={{ display: "flex", flexDirection: "column", gap: 10 }}
                        >

                            <input
                                placeholder="Tên"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({ ...formData, fullName: e.target.value })
                                }
                                style={inputStyle}
                                required
                            />

                            <input
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                style={inputStyle}
                                required
                            />

                            <input
                                placeholder="Khoa"
                                value={formData.department}
                                onChange={(e) =>
                                    setFormData({ ...formData, department: e.target.value })
                                }
                                style={inputStyle}
                            />

                            <input
                                placeholder="Chuyên môn"
                                value={formData.specialty}
                                onChange={(e) =>
                                    setFormData({ ...formData, specialty: e.target.value })
                                }
                                style={inputStyle}
                            />

                            <input
                                placeholder="Kinh nghiệm"
                                value={formData.experienceYears}
                                onChange={(e) =>
                                    setFormData({ ...formData, experienceYears: e.target.value })
                                }
                                style={inputStyle}
                            />

                            <input
                                placeholder="Bệnh viện"
                                value={formData.hospital}
                                onChange={(e) =>
                                    setFormData({ ...formData, hospital: e.target.value })
                                }
                                style={inputStyle}
                            />

                            <input
                                placeholder="License"
                                value={formData.licenseNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, licenseNumber: e.target.value })
                                }
                                style={inputStyle}
                            />
                            {/* PASSWORD */}
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                style={inputStyle}
                            />
                            <input 
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                style={inputStyle}
                            />  
                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value })
                                }
                                style={inputStyle}
                            >
                                <option value="pending">Chờ duyệt</option>
                                <option value="approved">Đã duyệt</option>
                                <option value="rejected">Từ chối</option>
                            </select>

                            <button type="submit" style={btnPrimary}>
                                {isEditMode ? "Cập nhật" : "Thêm"}
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}