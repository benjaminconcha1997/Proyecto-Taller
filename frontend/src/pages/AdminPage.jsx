import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import InventoryPanel from "../components/admin/InventoryPanel.jsx";
import InvoicesPanel from "../components/admin/InvoicesPanel.jsx";
import ExpensesPanel from "../components/admin/ExpensesPanel.jsx";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <AdminLayout activeTab={activeTab} onChangeTab={setActiveTab}>
      {activeTab === "inventory" && <InventoryPanel />}
      {activeTab === "invoices" && <InvoicesPanel />}
      {activeTab === "expenses" && <ExpensesPanel />}
    </AdminLayout>
  );
}

export default AdminPage;