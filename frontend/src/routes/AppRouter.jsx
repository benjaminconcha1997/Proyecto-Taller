import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import WorkshopsPage from "../pages/WorkshopsPage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/talleres" element={<WorkshopsPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default AppRouter;