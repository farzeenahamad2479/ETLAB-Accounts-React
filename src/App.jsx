
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import SelectFees from "./pages/SelectFees";
import Dues from "./pages/Dues";
import Transport from "./pages/Transport";
import Hostel from "./pages/Hostel";
import Wallet from "./pages/Wallet";
import Receipts from "./pages/Receipts";
import BankDetails from "./pages/BankDetails";
import ExamPage from "./pages/ExamPage";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Topbar />

                <div className="app-body">
                    <Sidebar />

                    <main className="main-content">
                        <Breadcrumb />

                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/accounts/fees" replace />}
                            />

                            <Route path="/accounts" element={<Navigate to="/accounts/fees" replace />} />
                            <Route path="/accounts/fees" element={<SelectFees />} />
                            <Route path="/accounts/dues" element={<Dues />} />
                            <Route path="/accounts/transport" element={<Transport />} />
                            <Route path="/accounts/hostel" element={<Hostel />} />
                            <Route path="/accounts/wallet" element={<Wallet />} />
                            <Route path="/accounts/receipts" element={<Receipts />} />
                            <Route path="/accounts/bank-details" element={<BankDetails />} />
                            <Route path="/exam" element={<ExamPage />} />

                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
