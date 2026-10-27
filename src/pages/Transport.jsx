
import { useState } from "react";
import AccountsTabs from "../components/AccountsTabs";

function Transport() {
  const [activeTab, setActiveTab] = useState("Registration");
  const [academicYear, setAcademicYear] = useState("2026-27");

  return (
    <div className="transport-page">
      <AccountsTabs />

      <div className="transport-subtabs">
        {["Registration", "Transport Cancellation"].map((tab) => (
          <button
            key={tab}
            className={`transport-subtab ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="transport-panel">
        <div className="transport-panel-heading">
          <span className="transport-menu-icon">▤</span>
          <span>Transport Fees</span>
        </div>

        <div className="transport-form">
          <label htmlFor="academic-year">Academic year</label>

          <select
            id="academic-year"
            value={academicYear}
            onChange={(event) => setAcademicYear(event.target.value)}
          >
            <option value="2026-27">2026-27</option>
            <option value="2025-26">2025-26</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
          </select>
        </div>
      </section>
    </div>
  );
}

export default Transport;
