import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { ToastContainer } from "react-toastify";
import { BoothProvider } from "./lib/context/booth";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const PhotoBoothLayout = lazy(() => import("./layout/photobooth.tsx"));
const UserLayout = lazy(() => import("./layout/user.tsx"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const PhotoBooth = lazy(() => import("./pages/photo-booth"));
const Account = lazy(() => import("./pages/account"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <BoothProvider>
              <PhotoBoothLayout />
            </BoothProvider>
          }
        >
          <Route path="/photo-booth" element={<PhotoBooth />} />
        </Route>

        <Route
          element={
            <BoothProvider>
              <UserLayout />
            </BoothProvider>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer className={"z-50"} />
    </Router>
  );
}

export default App;
