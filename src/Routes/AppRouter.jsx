import { Home } from "../Pages/Home";
import { PrivateRoute } from "./Private";
import { GuestRoute } from "./GuestRoute";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateLayout from "./PrivateLayout";

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
                <Route path="/dashboard" element={<div>Dashboard Page</div>} />
                {/* sau này thêm */}
                {/* <Route path="/profile" element={<Profile />} /> */}
                {/* <Route path="/orders" element={<Orders />} /> */}
            </Route>


        </Routes>
    );
}

