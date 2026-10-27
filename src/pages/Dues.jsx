
import { useState } from "react";
import AccountsTabs from "../components/AccountsTabs";

const leftDetails = [
  ["Name", "FARSEEN AHAMAD K P"],
  ["Admission No", "240374"],
  ["University Reg No", "TKM24CS056"],
  ["Department", "COMPUTER SCIENCE & ENGINEERING"],
  ["Batch", "CSE 2K24A"],
  ["Semester", "VIth Semester"],
];

const rightDetails = [
  ["Gender", "Male"],
  ["Date of Birth", "09/04/2005"],
  ["Fee Concession Eligibility", "General"],
  ["Eligible Reservation Category", "General"],
  ["Admission Category", "General"],
];

function DetailsTable({ details }) {
  return (
    <table className="details-table">
      <tbody>
        {details.map(([label, value]) => (
          <tr key={label}>
            <th>{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Dues() {
  const [activeTab, setActiveTab] = useState("Collection");
  const [selectedDue, setSelectedDue] = useState(false);

  return (
    <div className="dues-page">
      <AccountsTabs />

      <section className="dues-panel">
        <div className="dues-panel-heading">
          <span className="panel-menu-icon">▤</span>
          <span>FARSEEN AHAMAD K P</span>
        </div>

        <div className="student-details-grid">
          <DetailsTable details={leftDetails} />
          <DetailsTable details={rightDetails} />

          <div className="dues-student-photo">
            <img src="/student-photo.jpeg" alt="Student" />
          </div>
        </div>

        <div className="wallet-balance">
          Wallet Balance : 0.00
        </div>

        <div className="dues-tabs">
          {["Collection", "History"].map((tab) => (
            <button
              key={tab}
              className={`dues-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Collection" ? (
          <>
            <section className="fee-collection">
              <h2>Fee Collection</h2>

              <div className="dues-table-wrap">
                <table className="dues-table collection-table">
                  <thead>
                    <tr>
                      <th>Installment</th>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th>Balance</th>
                      <th>
                        <input
                          type="checkbox"
                          aria-label="Select all dues"
                          checked={selectedDue}
                          onChange={(e) => setSelectedDue(e.target.checked)}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="3" className="total-label">Total</td>
                      <td>0</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="applicable-fees">
              <h2>Applicable Fees</h2>

              <table className="dues-table">
                <thead>
                  <tr>
                    <th>Due</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Balance</th>
                    <th>Payable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="empty-message">
                      No due selected
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="due-receipts">
              <h3>Due Fee Receipts</h3>

              <table className="dues-table">
                <thead>
                  <tr>
                    <th>Sl.No.</th>
                    <th>Receipt No</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Processed By</th>
                    <th>View/Print</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="8" className="empty-message">
                      No results found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <section className="dues-history">
            <h2>Fee History</h2>
            <p>No history found.</p>
          </section>
        )}
      </section>

      <footer className="dues-footer">
        <span>Page Generated in 0.79503 seconds</span>
        <span>© 2026 Etuwa Concepts. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Dues;
