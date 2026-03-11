import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./History.module.css";

export const History = () => {

  const navigate = useNavigate();

  const [tab, setTab] = useState("upcoming");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const pageSize = 5;

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }

      } catch (error) {
        console.log(error);
      }

    };

    fetchAppointments();

  }, []);

  // map trạng thái
  const statusMap = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    completed: "Đã khám",
    cancelled: "Đã hủy"
  };

  // format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // lọc tab
  const filteredData = data.filter((item) => {

    if (tab === "upcoming") {
      return item.status === "pending" || item.status === "confirmed";
    }

    if (tab === "history") {
      return item.status === "completed" || item.status === "cancelled";
    }

    return true;

  });

  // pagination
  const start = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (

    <div className={styles.historyPage}>

      {/* header */}

      <div className={styles.historyHeader}>

        <div>
          <h2>Lịch khám của tôi</h2>
          <p>Quản lý và theo dõi lịch khám bệnh</p>
        </div>

        <button
          className={styles.btnBook}
          onClick={() => navigate("/appointments")}
        >
          Đặt lịch mới
        </button>

      </div>

      {/* tabs */}

      <div className={styles.tabs}>

        <button
          className={`${styles.tab} ${tab === "upcoming" ? styles.active : ""}`}
          onClick={() => {
            setTab("upcoming");
            setPage(1);
          }}
        >
          Sắp tới
        </button>

        <button
          className={`${styles.tab} ${tab === "history" ? styles.active : ""}`}
          onClick={() => {
            setTab("history");
            setPage(1);
          }}
        >
          Lịch sử
        </button>

      </div>

      {/* table */}

      <div className={styles.historyTable}>

        <div className={styles.tableWrapper}>

          <table>

            <thead>
              <tr>
                <th>Bệnh nhân</th>
                <th>Bác sĩ</th>
                <th>Ngày khám</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>

              {paginatedData.length === 0 ? (

                <tr>
                  <td colSpan="4" className={styles.empty}>
                    Chưa có dữ liệu
                  </td>
                </tr>

              ) : (

                paginatedData.map((item) => (

                  <tr key={item._id}>

                    <td>
                      {item.patientId?.fullName ?? "N/A"}
                    </td>

                    <td>
                      {item.doctorId?.fullName ?? "N/A"}
                    </td>

                    <td>
                      {formatDate(item.date)} - {item.time}
                    </td>

                    <td>

                      <span
                        className={`${styles.status} ${styles[item.status]}`}
                      >
                        {statusMap[item.status]}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* pagination */}

        <div className={styles.pagination}>

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => (

            <button
              key={i}
              className={page === i + 1 ? styles.activePage : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>

          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            {">"}
          </button>

        </div>

      </div>

    </div>

  );

};