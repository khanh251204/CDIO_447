import { Home } from "../Pages/Home";
import { PrivateRoute } from "./Private";
import { Routes, Route } from "react-router-dom";

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
