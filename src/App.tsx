import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import PhotoBooth from "./pages/photo-booth";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PhotoBooth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
