import { Home } from "../Pages/Home";
import { PrivateRoute } from "./Private";
import { GuestRoute } from "./GuestRoute";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateLayout from "./PrivateLayout";
import {Dashboard} from "../Pages/Dashboard"
import {Profile} from "../Pages/profile"
import {Patients} from "../Pages/Patients"
import { BookAppointment } from "../Pages/BookAppoiment";
import {Doctor} from "../Pages/Doctor";
import {History} from "../Pages/History";

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home />
                }
            />
            <Route
                path="/register"
                element={
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />
            <Route
                path="/doctor"
                element={
                    <GuestRoute>
                        <Doctor />
                    </GuestRoute>
                }
            />

            {/* <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <PrivateLayout />
                        <div>Dashboard Page - Protected</div>
                    </PrivateRoute>
                }
            /> */}
            <Route
                element={
                    <PrivateRoute>
                        <PrivateLayout />
                    </PrivateRoute>
                }
            >
                {/* 👇 TẤT CẢ NẰM TRONG OUTLET */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/appointments" element={<BookAppointment />} />
                <Route path="/history" element={<History />} />


                {/* sau này thêm */}
                {/* <Route path="/profile" element={<Profile />} /> */}
                {/* <Route path="/orders" element={<Orders />} /> */}
            </Route>


        </Routes>
    );
}

