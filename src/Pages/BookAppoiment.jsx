import { useState, useEffect } from "react";
import styles from "./BookAppoiment.module.css";
import { toast } from "react-toastify";

export function BookAppointment() {

    const today = new Date();
    today.setHours(0,0,0,0);

    const [doctors, setDoctors] = useState([]);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [reason, setReason] = useState("");

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const monthNames = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const token = localStorage.getItem("token");

    // ===== FETCH DOCTORS =====
    useEffect(()=>{
        fetchDoctors();
    },[])

    const fetchDoctors = async () => {

        if(!token){
            toast.error("Bạn cần đăng nhập");
            return;
        }

        try{

            const response = await fetch("http://localhost:3000/api/doctors",{
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            })

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }

            setDoctors(data.data);

        }catch(err){
            console.error(err);
            toast.error("Lỗi khi tải danh sách bác sĩ.");
        }
    }

    // ===== GET DEPARTMENTS =====
    const departments = [...new Set(doctors.map(d => d.department))];

    // ===== FILTER DOCTORS =====
    const filteredDoctors = doctors.filter(
        d => d.department === selectedDept
    );

    // ===== CALENDAR =====
    const firstDay = new Date(year,month,1).getDay();
    const daysInMonth = new Date(year,month+1,0).getDate();

    const isPastDate = (day)=>{
        const date = new Date(year,month,day);
        return date < today;
    }

    // ===== CREATE APPOINTMENT =====
    const createAppointment = async () => {

        if(!token){
            toast.error("Bạn cần đăng nhập.");
            return;
        }

        try{

            const date = `${year}-${String(month+1).padStart(2,'0')}-${String(selectedDay).padStart(2,'0')}`;

            const response = await fetch("http://localhost:3000/api/appointment",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    doctorId:selectedDoctor,
                    date,
                    time:selectedTime,
                    reason
                })
            })

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Đặt lịch thất bại");
            }

            toast.success("Đặt lịch thành công!");

            // reset form
            setSelectedDept("");
            setSelectedDoctor(null);
            setSelectedDay(null);
            setSelectedTime("");
            setReason("");

        }catch(err){
            console.error(err);
            toast.error(err.message || "Đặt lịch thất bại");
        }
    }

    // ===== SUBMIT =====
    const handleSubmit = ()=>{

        if(!selectedDept || !selectedDoctor || !selectedDay || !selectedTime){
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        createAppointment();
    }

    return (

        <div className={styles.page}>
            <div className={styles.card}>

                <h2>Đặt Lịch Khám</h2>

                {/* ===== CHỌN KHOA ===== */}
                <div className={styles.section}>
                    <h4>Chọn khoa *</h4>

                    <select
                        className={styles.select}
                        value={selectedDept}
                        onChange={(e)=>{
                            setSelectedDept(e.target.value);
                            setSelectedDoctor(null);
                        }}
                    >

                        <option value="">-- Chọn khoa --</option>

                        {departments.map((d,i)=>(
                            <option key={i} value={d}>{d}</option>
                        ))}

                    </select>
                </div>


                {/* ===== CHỌN BÁC SĨ ===== */}
                {selectedDept &&(

                    <div className={styles.section}>

                        <h4>Chọn bác sĩ *</h4>

                        <div className={styles.doctors}>

                            {filteredDoctors.map(d=>(

                                <div
                                    key={d._id}
                                    className={`${styles.doctor} ${
                                        selectedDoctor === d._id ? styles.active : ""
                                    }`}
                                    onClick={()=>setSelectedDoctor(d._id)}
                                >

                                    <div className={styles.avatar}>👨‍⚕️</div>

                                    <div>
                                        <p className={styles.name}>{d.fullName}</p>
                                        <p className={styles.dept}>{d.department}</p>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}


                {/* ===== CALENDAR + TIME ===== */}
                <div className={styles.grid}>

                    {/* ===== CALENDAR ===== */}
                    <div>

                        <h4>Chọn ngày *</h4>

                        <div className={styles.calendar}>

                            <div className={styles.calHeader}>

                                <button onClick={()=>{
                                    if(month===0){
                                        setMonth(11)
                                        setYear(y=>y-1)
                                    }else{
                                        setMonth(m=>m-1)
                                    }
                                }}>{"<"}</button>

                                <span>{monthNames[month]} {year}</span>

                                <button onClick={()=>{
                                    if(month===11){
                                        setMonth(0)
                                        setYear(y=>y+1)
                                    }else{
                                        setMonth(m=>m+1)
                                    }
                                }}>{">"}</button>

                            </div>


                            <div className={styles.calGrid}>

                                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>(
                                    <span key={d}>{d}</span>
                                ))}

                                {Array(firstDay).fill(null).map((_,i)=>(
                                    <span key={i}></span>
                                ))}a

                                {Array.from({length:daysInMonth},(_,i)=>{

                                    const day = i+1
                                    const past = isPastDate(day)

                                    return(

                                        <span
                                            key={day}
                                            className={`${styles.day}
                                            ${past ? styles.disabled : ""}
                                            ${selectedDay===day ? styles.dayActive : ""}`}

                                            onClick={()=>{

                                                if(past){
                                                    toast.error("Bạn không thể chọn ngày đã qua.");
                                                    return;
                                                }

                                                setSelectedDay(day);
                                                setSelectedTime("");

                                            }}
                                        >

                                            {day}

                                        </span>

                                    )

                                })}

                            </div>

                        </div>

                    </div>


                    {/* ===== TIME ===== */}
                    <div>

                        <h4>Chọn giờ *</h4>

                        <div className={styles.times}>

                            {["8:00","9:00","10:00","14:00","15:00","16:00"].map(t=>(

                                <button
                                    key={t}
                                    disabled={!selectedDay}
                                    className={`${styles.timeBtn}
                                    ${selectedTime===t ? styles.timeActive : ""}`}

                                    onClick={()=>{

                                        setSelectedTime(t);

                                    }}
                                >

                                    {t}

                                </button>

                            ))}

                        </div>

                    </div>

                </div>


                {/* ===== REASON ===== */}
                <div className={styles.section}>

                    <h4>Lý do khám</h4>

                    <textarea
                        className={styles.textarea}
                        value={reason}
                        onChange={(e)=>setReason(e.target.value)}
                    />

                </div>


                {/* ===== SUBMIT ===== */}
                <div className={styles.footer}>

                    <button
                        className={styles.submit}
                        onClick={handleSubmit}
                    >
                        Đặt Lịch Ngay
                    </button>

                </div>

            </div>
        </div>

    )
}