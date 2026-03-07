import React, { useState } from "react";

const initialPatients = [
  { id: 1, name: "Trần Thị Bích", age: 45, lastVisit: "15/01/2026", status: "Hoàn thành" },
  { id: 2, name: "Lê Văn Tuấn", age: 62, lastVisit: "14/01/2026", status: "Chờ khám" },
  { id: 3, name: "Nguyễn Minh Anh", age: 28, lastVisit: "10/01/2026", status: "Cần theo dõi" },
  { id: 4, name: "Phạm Quốc Bảo", age: 53, lastVisit: "12/01/2026", status: "Hoàn thành" },
  { id: 5, name: "Đoàn Thị Huệ", age: 39, lastVisit: "09/01/2026", status: "Hủy khám" },
];

export function Patients() {
  // ===== STATE =====
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [sortAge, setSortAge] = useState("none");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newStatus, setNewStatus] = useState("Chờ khám");

  // ===== STYLE STATUS =====
  const getStatusStyle = (status) => {
    switch (status) {
      case "Hoàn thành": return { bg: "#e6fcf5", text: "#0ca678" };
      case "Chờ khám": return { bg: "#fff9db", text: "#f08c00" };
      case "Cần theo dõi": return { bg: "#fff4e6", text: "#fd7e14" };
      case "Hủy khám": return { bg: "#fff5f5", text: "#fa5252" };
      default: return { bg: "#f1f3f5", text: "#495057" };
    }
  };

  // ===== FILTER + SEARCH =====
  let filtered = patients.filter((p) => {
    const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "Tất cả" || p.status === statusFilter;
    return matchName && matchStatus;
  });

  // ===== SORT =====
  if (sortAge === "asc") {
    filtered = [...filtered].sort((a, b) => a.age - b.age);
  }
  if (sortAge === "desc") {
    filtered = [...filtered].sort((a, b) => b.age - a.age);
  }

  // ===== ADD =====
  const handleAdd = () => {
    if (!newName || !newAge) return alert("Nhập đủ thông tin!");

    const newPatient = {
      id: Date.now(),
      name: newName,
      age: Number(newAge),
      lastVisit: new Date().toLocaleDateString("vi-VN"),
      status: newStatus,
    };

    setPatients([...patients, newPatient]);
    setNewName("");
    setNewAge("");
  };

  // ===== DELETE =====
  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  // ===== THỐNG KÊ =====
  const total = patients.length;
  const completed = patients.filter(p => p.status === "Hoàn thành").length;
  const waiting = patients.filter(p => p.status === "Chờ khám").length;

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI", background: "#f8f9fa", minHeight: "100vh" }}>
      
      <h2>Quản lý bệnh nhân</h2>

      {/* ===== THỐNG KÊ ===== */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>Tổng: <b>{total}</b></div>
        <div>Hoàn thành: <b>{completed}</b></div>
        <div>Chờ khám: <b>{waiting}</b></div>
      </div>

      {/* ===== SEARCH + FILTER + SORT ===== */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
          <option>Tất cả</option>
          <option>Hoàn thành</option>
          <option>Chờ khám</option>
          <option>Cần theo dõi</option>
          <option>Hủy khám</option>
        </select>

        <select value={sortAge} onChange={(e) => setSortAge(e.target.value)} style={inputStyle}>
          <option value="none">Sắp xếp tuổi</option>
          <option value="asc">Tuổi tăng dần</option>
          <option value="desc">Tuổi giảm dần</option>
        </select>
      </div>

      {/* ===== FORM ADD ===== */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input placeholder="Tên" value={newName} onChange={(e) => setNewName(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Tuổi" value={newAge} onChange={(e) => setNewAge(e.target.value)} style={inputStyle} />
        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} style={inputStyle}>
          <option>Chờ khám</option>
          <option>Hoàn thành</option>
          <option>Cần theo dõi</option>
          <option>Hủy khám</option>
        </select>
        <button onClick={handleAdd} style={btnPrimary}>Thêm</button>
      </div>

      {/* ===== TABLE ===== */}
      <table style={{ width: "100%", background: "#fff" }}>
        <thead>
          <tr>
            <th style={thStyle}>Tên</th>
            <th style={thStyle}>Tuổi</th>
            <th style={thStyle}>Lần khám</th>
            <th style={thStyle}>Trạng thái</th>
            <th style={thStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.age}</td>
              <td style={tdStyle}>{p.lastVisit}</td>
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
                <button onClick={() => setSelectedPatient(p)} style={btnOutline}>Chi tiết</button>
                <button onClick={() => handleDelete(p.id)} style={btnDanger}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== MODAL ===== */}
      {selectedPatient && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>Thông tin chi tiết</h3>
            <p><b>Tên:</b> {selectedPatient.name}</p>
            <p><b>Tuổi:</b> {selectedPatient.age}</p>
            <p><b>Lần khám:</b> {selectedPatient.lastVisit}</p>
            <p><b>Trạng thái:</b> {selectedPatient.status}</p>
            <button onClick={() => setSelectedPatient(null)} style={btnPrimary}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== STYLE =====
const inputStyle = { padding: "8px", borderRadius: "6px", border: "1px solid #ccc" };
const thStyle = { padding: "10px", textAlign: "left" };
const tdStyle = { padding: "10px", borderTop: "1px solid #eee" };

const badgeBase = { padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" };

const btnPrimary = { background: "#4c6ef5", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" };
const btnOutline = { background: "none", border: "1px solid #4c6ef5", color: "#4c6ef5", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", marginRight: "5px" };
const btnDanger = { background: "#fa5252", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px", cursor: "pointer" };

const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" };
const modalBox = { background: "#fff", padding: "20px", borderRadius: "10px", minWidth: "300px" };