import { Home } from "../Pages/Home";
import { PrivateRoute } from "./Private";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/dashboard";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

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
                path="/db"
                element={
                    <Dashboard />
                }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <div>Dashboard Page - Protected</div>
                    </PrivateRoute>
                }
            />


        </Routes>
    );
}

