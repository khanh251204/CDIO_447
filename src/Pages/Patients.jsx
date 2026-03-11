import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function Patients() {

    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tất cả");
    const [selectedPatient, setSelectedPatient] = useState(null);

    // ===== MAP STATUS BACKEND =====
    const statusMap = {
        pending: "Chờ khám",
        completed: "Hoàn thành",
        cancelled: "Hủy khám"
    };

    // ===== FETCH API =====
    useEffect(() => { // giúng for , đổ dữ liệu nhanh k cần render lại nhiều lần

        const fetchAppointments = async () => { //bất đồng bộ 

            try {

                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await res.json();

                if (data.success) {

                    const formatted = data.data.map(a => ({
                        id: a._id,
                        name: a.patientId.fullName,
                        doctor: a.doctorId.fullName,
                        email: a.patientId.userId.email,
                        lastVisit: new Date(a.date).toLocaleDateString("vi-VN"),
                        time: a.time,
                        reason: a.reason,
                        status: statusMap[a.status] || a.status
                    }));

                    setPatients(formatted);
                }else {
                    toast.error(data.message || "Lấy lịch hẹn thất bại");
                }

            } catch (error) {
                console.error(error);
                toast.error("Đã xảy ra lỗi khi lấy danh sách lịch hẹn");
            }

        };

        fetchAppointments();

    }, []);

    // ===== FILTER =====
    const filtered = patients.filter(p => {

        const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchStatus =
            statusFilter === "Tất cả" || p.status === statusFilter;

        return matchName && matchStatus;

    });

    // ===== STYLE STATUS =====
    const getStatusStyle = (status) => {
        switch (status) {
            case "Hoàn thành": return { bg: "#e6fcf5", text: "#0ca678" };
            case "Chờ khám": return { bg: "#fff9db", text: "#f08c00" };
            case "Hủy khám": return { bg: "#fff5f5", text: "#fa5252" };
            default: return { bg: "#f1f3f5", text: "#495057" };
        }
    };

    // ===== STATS =====
    const total = patients.length;
    const completed = patients.filter(p => p.status === "Hoàn thành").length;
    const waiting = patients.filter(p => p.status === "Chờ khám").length;

    return (

        <div style={{
            padding: "30px",
            fontFamily: "Segoe UI",
            background: "#f8f9fa",
            minHeight: "100vh"
        }}>

            <h2>Quản lý lịch khám</h2>

            {/* ===== STATS ===== */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div>Tổng lịch: <b>{total}</b></div>
                <div>Hoàn thành: <b>{completed}</b></div>
                <div>Chờ khám: <b>{waiting}</b></div>
            </div>

            {/* ===== SEARCH + FILTER ===== */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

                <input
                    placeholder="Tìm bệnh nhân..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={inputStyle}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={inputStyle}
                >
                    <option>Tất cả</option>
                    <option>Chờ khám</option>
                    <option>Hoàn thành</option>
                    <option>Hủy khám</option>
                </select>

            </div>

            {/* ===== TABLE ===== */}
            <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse" }}>

                <thead>
                    <tr>
                        <th style={thStyle}>Bệnh nhân</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Bác sĩ</th>
                        <th style={thStyle}>Ngày khám</th>
                        <th style={thStyle}>Giờ</th>
                        <th style={thStyle}>Trạng thái</th>
                        <th style={thStyle}>Hành động</th>
                    </tr>
                </thead>

                <tbody>

                    {filtered.map((p) => (

                        <tr key={p.id}>

                            <td style={tdStyle}>{p.name}</td>
                            <td style={tdStyle}>{p.email}</td>
                            <td style={tdStyle}>{p.doctor}</td>
                            <td style={tdStyle}>{p.lastVisit}</td>
                            <td style={tdStyle}>{p.time}</td>

                            <td style={tdStyle}>

                                <span style={{
                                    ...badgeBase,
                                    backgroundColor: getStatusStyle(p.status).bg,
                                    color: getStatusStyle(p.status).text
                                }}>
                                    {p.status}
                                </span>

                            </td>

                            <td style={tdStyle}>

                                <button
                                    onClick={() => setSelectedPatient(p)}
                                    style={btnOutline}
                                >
                                    Chi tiết
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {/* ===== MODAL ===== */}
            {selectedPatient && (

                <div style={modalOverlay}>

                    <div style={modalBox}>

                        <h3>Chi tiết lịch khám</h3>

                        <p><b>Bệnh nhân:</b> {selectedPatient.name}</p>
                        <p><b>Email:</b> {selectedPatient.email}</p>
                        <p><b>Bác sĩ:</b> {selectedPatient.doctor}</p>
                        <p><b>Ngày khám:</b> {selectedPatient.lastVisit}</p>
                        <p><b>Giờ:</b> {selectedPatient.time}</p>
                        <p><b>Lý do:</b> {selectedPatient.reason}</p>
                        <p><b>Trạng thái:</b> {selectedPatient.status}</p>

                        <button
                            onClick={() => setSelectedPatient(null)}
                            style={btnPrimary}
                        >
                            Đóng
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}


// ===== STYLE =====

const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
};

const thStyle = {
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #eee"
};

const tdStyle = {
    padding: "10px",
    borderTop: "1px solid #eee"
};

const badgeBase = {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
};

const btnPrimary = {
    background: "#4c6ef5",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
};

const btnOutline = {
    background: "none",
    border: "1px solid #4c6ef5",
    color: "#4c6ef5",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const modalBox = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "300px"
};