import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// 1. Styles
const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", outline: "none" };
const labelStyle = { display: "block", fontSize: "12px", color: "#666", marginBottom: "5px", textAlign: "left" };
const thStyle = { padding: "15px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#495057", background: "#f1f3f5" };
const tdStyle = { padding: "15px", borderTop: "1px solid #eee", fontSize: "14px", verticalAlign: "middle" };
const badgeBase = { padding: "5px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold" };
const btnPrimary = { background: "#4c6ef5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
const btnSuccess = { ...btnPrimary, background: "#2f9e44" };
const btnEdit = { ...btnPrimary, background: "#fab005", padding: "6px 12px", fontSize: "13px" };
const btnDanger = { ...btnPrimary, background: "#fa5252", padding: "6px 12px", fontSize: "13px" };
const btnOutline = { background: "none", border: "1px solid #4c6ef5", color: "#4c6ef5", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalBox = { background: "#fff", padding: "30px", borderRadius: "12px", minWidth: "350px", maxWidth: "450px", boxShadow: "0 15px 35px rgba(0,0,0,0.2)", textAlign: "center" };

export function Patient() {
    // --- DỮ LIỆU CẤU HÌNH ---
    const departments = ["Nội khoa", "Ngoại khoa", "Nhi khoa", "Sản phụ khoa"];
    const doctorsList = [
        { fullName: "BS. Nguyễn Văn A", department: "Nội khoa" },
        { fullName: "BS. Trần Thị B", department: "Nội khoa" },
        { fullName: "BS. Lê Văn C", department: "Ngoại khoa" },
        { fullName: "BS. Phạm Minh D", department: "Nhi khoa" },
    ];
    const timeSlots = ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"];

    // --- STATE ---
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tất cả");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedDept, setSelectedDept] = useState(""); // Quan trọng: Quản lý chọn khoa

    const [showFormModal, setShowFormModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        patientName: "", doctorName: "", email: "", date: "", time: "", reason: "", status: "pending"
    });

    const statusMap = { pending: "Chờ khám", completed: "Hoàn thành", cancelled: "Hủy khám" };
    const reverseStatusMap = { "Chờ khám": "pending", "Hoàn thành": "completed", "Hủy khám": "cancelled" };

    const getStatusStyle = (status) => {
        if (status === "Hoàn thành") return { bg: "#e6fcf5", text: "#0ca678" };
        if (status === "Chờ khám") return { bg: "#fff9db", text: "#f08c00" };
        return { bg: "#fff5f5", text: "#fa5252" };
    };

    // --- API CALLS ---
    const fetchAppointments = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/appointments", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await res.json();
            if (data.success) {
                const formatted = data.data.map(a => ({
                    id: a._id,
                    name: a.patientId?.fullName || "N/A",
                    doctor: a.doctorId?.fullName || "N/A",
                    email: a.patientId?.userId?.email || "N/A",
                    date: a.date ? new Date(a.date).toISOString().split('T')[0] : "",
                    time: a.time,
                    reason: a.reason,
                    status: statusMap[a.status] || a.status
                }));
                setPatients(formatted);
            }
        } catch (error) {
            console.error("Lỗi fetch:", error);
        }
    };

    useEffect(() => { fetchAppointments(); }, []);

    // --- HANDLERS ---
    const handleOpenAdd = () => {
        setIsEditMode(false);
        setSelectedDept("");
        setFormData({ patientName: "", doctorName: "", email: "", date: "", time: "", reason: "", status: "pending" });
        setShowFormModal(true);
    };

    const handleOpenEdit = (p) => {
        setIsEditMode(true);
        setCurrentId(p.id);

        // Tự động tìm khoa của bác sĩ khi mở modal sửa
        const findDoc = doctorsList.find(d => d.fullName === p.doctor);
        setSelectedDept(findDoc ? findDoc.department : "");

        setFormData({
            patientName: p.name, doctorName: p.doctor, email: p.email,
            date: p.date, time: p.time, reason: p.reason,
            status: reverseStatusMap[p.status] || "pending"
        });
        setShowFormModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditMode
            ? `http://localhost:3000/api/appointment/${currentId}`
            : "http://localhost:3000/api/appointment";

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
                toast.success(isEditMode ? "Cập nhật thành công" : "Thêm lịch thành công");
                setShowFormModal(false);
                fetchAppointments();
            } else { toast.error(data.message); }
        } catch (error) { toast.error("Lỗi hệ thống"); }
    };



    const filtered = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "Tất cả" || p.status === statusFilter)
    );

    return (
        <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Quản lý lịch khám</h2>
                <button onClick={handleOpenAdd} style={btnSuccess}>+ Thêm lịch khám</button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input placeholder="Tìm bệnh nhân..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={inputStyle}>
                    <option>Tất cả</option>
                    <option>Chờ khám</option>
                    <option>Hoàn thành</option>
                    <option>Hủy khám</option>
                </select>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Bệnh nhân</th>
                            <th style={thStyle}>Bác sĩ</th>
                            <th style={thStyle}>Thời gian</th>
                            <th style={thStyle}>Trạng thái</th>
                            <th style={thStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((p, index) => {
                            const sStyle = getStatusStyle(p.status);
                            return (
                                <tr key={p.id || index}>
                                    <td style={tdStyle}><b>{(index + 1).toString().padStart(3, '0')}</b></td>
                                    <td style={tdStyle}>{p.name}<br /><small style={{ color: '#666' }}>{p.email}</small></td>
                                    <td style={tdStyle}>{p.doctor}</td>
                                    <td style={tdStyle}>{p.date}<br />{p.time}</td>
                                    <td style={tdStyle}>
                                        <span style={{ ...badgeBase, backgroundColor: sStyle.bg, color: sStyle.text }}>{p.status}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: "flex", gap: "5px" }}>
                                            <button onClick={() => setSelectedPatient(p)} style={btnOutline}>Xem</button>
                                            <button onClick={() => handleOpenEdit(p)} style={btnEdit}>Sửa</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* MODAL CHI TIẾT */}
            {selectedPatient && (
                <div style={modalOverlay} onClick={() => setSelectedPatient(null)}>
                    <div style={modalBox} onClick={e => e.stopPropagation()}>
                        <h3>Chi tiết lịch khám</h3>
                        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                            <p><b>Bệnh nhân:</b> {selectedPatient.name}</p>
                            <p><b>Bác sĩ:</b> {selectedPatient.doctor}</p>
                            <p><b>Thời gian:</b> {selectedPatient.date} {selectedPatient.time}</p>
                            <p><b>Lý do:</b> {selectedPatient.reason}</p>
                            <p><b>Trạng thái:</b> {selectedPatient.status}</p>
                        </div>
                        <button onClick={() => setSelectedPatient(null)} style={btnPrimary}>Đóng</button>
                    </div>
                </div>
            )}

            {/* MODAL THÊM/SỬA */}
            {showFormModal && (
                <div style={modalOverlay}>
                    <div style={{ ...modalBox, width: "400px" }}>
                        <h3 style={{ marginBottom: "20px" }}>{isEditMode ? "Cập nhật lịch khám" : "Thêm lịch mới"}</h3>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {!isEditMode && (
                                <>
                                    <input placeholder="Tên bệnh nhân" value={formData.patientName} onChange={e => setFormData({ ...formData, patientName: e.target.value })} style={inputStyle} required />
                                    <input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} required />

                                    <div style={{ textAlign: "left" }}>
                                        <label style={labelStyle}>Khoa *</label>
                                        <select
                                            value={selectedDept}
                                            onChange={(e) => {
                                                setSelectedDept(e.target.value);
                                                setFormData({ ...formData, doctorName: "" });
                                            }}
                                            style={{ ...inputStyle, width: "100%" }}
                                            required
                                        >
                                            <option value="">-- Chọn khoa --</option>
                                            {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
                                        </select>
                                    </div>

                                    <div style={{ textAlign: "left" }}>
                                        <label style={labelStyle}>Bác sĩ *</label>
                                        <select
                                            value={formData.doctorName}
                                            onChange={e => setFormData({ ...formData, doctorName: e.target.value })}
                                            style={{ ...inputStyle, width: "100%", background: !selectedDept ? "#f5f5f5" : "#fff" }}
                                            disabled={!selectedDept}
                                            required
                                        >
                                            <option value="">-- {selectedDept ? "Chọn bác sĩ" : "Chọn khoa trước"} --</option>
                                            {doctorsList
                                                .filter(doc => doc.department === selectedDept)
                                                .map((doc, idx) => <option key={idx} value={doc.fullName}>{doc.fullName}</option>)
                                            }
                                        </select>
                                    </div>
                                </>
                            )}

                            <div style={{ display: "flex", gap: "10px" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Ngày khám</label>
                                    <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} style={{ ...inputStyle, width: "100%" }} required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Giờ khám</label>
                                    <select
                                        value={formData.time || ""}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        style={{ ...inputStyle, width: "100%" }}
                                        required
                                    >
                                        <option value="">-- Giờ --</option>

                                        {timeSlots.map((slot, idx) => (
                                            <option key={idx} value={slot}>
                                                {slot}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            </div>

                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                                <option value="pending">Chờ khám</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Hủy khám</option>
                            </select>

                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                <button type="submit" style={{ ...btnPrimary, flex: 1 }}>{isEditMode ? "Cập nhật" : "Lưu lịch"}</button>
                                <button type="button" onClick={() => setShowFormModal(false)} style={{ ...btnOutline, flex: 1, color: '#333', borderColor: '#ccc' }}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}