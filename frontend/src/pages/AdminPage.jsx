import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import InventoryPanel from "../components/admin/InventoryPanel.jsx";
import InvoicesPanel from "../components/admin/InvoicesPanel.jsx";
import ExpensesPanel from "../components/admin/ExpensesPanel.jsx";

function AdminPage() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("inventory");

  // Si no hay sesión, redirige al login.
 if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout activeTab={activeTab} onChangeTab={setActiveTab}>
      {activeTab === "inventory" && <InventoryPanel />}
      {activeTab === "invoices" && <InvoicesPanel />}
      {activeTab === "expenses" && <ExpensesPanel />}
    </AdminLayout>
  );
}

export default AdminPage;