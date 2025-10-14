import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AttendanceList from "./pages/AttendanceList";
import AttendanceCreate from "./pages/AttendanceCreate";
import AttendanceEdit from "./pages/AttendanceEdit";
import Layout from "./layout/Layout";

function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/asistencias"
        element={
          <PrivateRoute>
            <AttendanceList />
          </PrivateRoute>
        }
              />
      <Route
        path="/asistencias/nueva"
        element={
          <PrivateRoute role="user">
            <AttendanceCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/asistencias/:id/editar"
        element={
          <PrivateRoute role="user">
            <AttendanceEdit />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
