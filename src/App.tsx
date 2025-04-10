import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { BoothProvider } from "./lib/context/booth";
import Loading from "./components/ui/loading.tsx";
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const PhotoBoothLayout = lazy(() => import("./layout/photobooth.tsx"));
const UserLayout = lazy(() => import("./layout/user.tsx"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Social = lazy(() => import("./pages/social"));
const PhotoBooth = lazy(() => import("./pages/photo-booth/index.tsx"));
const PhotoUser = lazy(() => import("./pages/photo-booth/photo-user.tsx"));
const Account = lazy(() => import("./pages/account"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <BoothProvider>
              <Suspense fallback={<Loading />}>
                <PhotoBoothLayout />
              </Suspense>
            </BoothProvider>
          }
        >
          <Route path="/photo-booth" element={<PhotoBooth />} />
          <Route path="/photo-booth/:id" element={<PhotoUser />} />
        </Route>

        <Route
          element={
            <BoothProvider>
              <UserLayout />
            </BoothProvider>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />

          <Route
            path="/social"
            element={
              <Suspense fallback={<Loading />}>
                <Social />
              </Suspense>
            }
          />

          <Route 
            path="/social/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Social />
              </Suspense>
            }
          />
          
          <Route
            path="/account"
            element={
              <Suspense fallback={<Loading />}>
                <Account />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer className={"z-50"} />
    </Router>
  );
}

export default App;
