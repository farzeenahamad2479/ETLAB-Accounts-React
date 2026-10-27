
import { useState } from "react";
import AccountsTabs from "../components/AccountsTabs";

const personalDetails = [
  ["Name", "FARSEEN AHAMAD K P"],
  ["Admission No", "240374"],
  ["University Reg No", "TKM24CS056"],
  ["Department", "COMPUTER SCIENCE & ENGINEERING"],
  ["Batch", "CSE 2K24A"],
  ["Semester", "VIth Semester"],
];

const otherDetails = [
  ["Gender", "Male"],
  ["Date of Birth", "09/04/2005"],
  ["Fee Concession Eligibility", "General"],
  ["Eligible Reservation Category", "General"],
  ["Admission Category", "General"],
  ["Preferred Hostel (Last Accepted Registration)", "N/A"],
];

const hostelDetails = [
  ["Hostel", "GOLDEN JUBILEE C BLOCK"],
  ["Room No.", "C 204"],
  ["Join Date", "22/08/2024"],
];

function DetailsTable({ items }) {
  return (
    <table className="hostel-details-table">
      <tbody>
        {items.map(([label, value]) => (
          <tr key={label}>
            <th>{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Hostel() {
  const [section, setSection] = useState("Collection");
  const [receiptTab, setReceiptTab] = useState("Fee Receipt");
  const [admissionSelected, setAdmissionSelected] = useState(false);
  const [monthlySelected, setMonthlySelected] = useState(false);

  return (
    <div className="hostel-page">
      <AccountsTabs />

      <div className="hostel-subtabs">
        <button className="hostel-subtab active">Registrations</button>
        <button className="hostel-subtab">Mess Cut</button>
      </div>

      <section className="hostel-panel">
        <div className="hostel-panel-heading">
          <span className="hostel-menu-icon">▤</span>
          FARSEEN AHAMAD K P
        </div>

        <div className="hostel-profile">
          <DetailsTable items={personalDetails} />
          <DetailsTable items={otherDetails} />
          <DetailsTable items={hostelDetails} />

          <img
            className="hostel-photo"
            src="/student-photo.jpeg"
            alt="Student"
          />
        </div>

        <div className="hostel-wallet">Wallet Balance : 0.00</div>

        <div className="hostel-tabs">
          {["Collection", "History"].map((tab) => (
            <button
              key={tab}
              className={`hostel-tab ${section === tab ? "active" : ""}`}
              onClick={() => setSection(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {section === "Collection" ? (
          <>
            <h3 className="hostel-section-title">Fee Collection</h3>

            <h3 className="hostel-table-title">Hostel Admission</h3>
            <table className="hostel-data-table">
              <thead>
                <tr>
                  <th>Installment</th>
                  <th>Amount</th>
                  <th>Fee Adjustment</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>
                    <input
                      type="checkbox"
                      checked={admissionSelected}
                      onChange={(e) =>
                        setAdmissionSelected(e.target.checked)
                      }
                      aria-label="Select hostel admission"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="3" className="hostel-total">Total</td>
                  <td></td>
                  <td>0</td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <h3 className="hostel-table-title">Hostel Monthly</h3>
            <table className="hostel-data-table">
              <thead>
                <tr>
                  <th>Installment</th>
                  <th>Amount</th>
                  <th>Fee Adjustment</th>
                  <th>Mess Cut</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>
                    <input
                      type="checkbox"
                      checked={monthlySelected}
                      onChange={(e) => setMonthlySelected(e.target.checked)}
                      aria-label="Select all monthly installments"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>September 2026</td>
                  <td>2294</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>2294</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={monthlySelected}
                      onChange={(e) => setMonthlySelected(e.target.checked)}
                      aria-label="Select September 2026 installment"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="5" className="hostel-total">Total</td>
                  <td>2294</td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <h3 className="hostel-applicable-title">Applicable Fees</h3>
            <table className="hostel-data-table bordered">
              <thead>
                <tr>
                  <th>Installment</th>
                  <th>Fee Head</th>
                  <th>Amount</th>
                  <th>Fee Adjustment</th>
                  <th>Paid</th>
                  <th>Wallet</th>
                  <th>Balance</th>
                  <th>Payable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="hostel-empty">
                    No fees selected
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="hostel-tabs hostel-receipt-tabs">
              {["Fee Receipt", "Room History", "Fee Adjustment"].map((tab) => (
                <button
                  key={tab}
                  className={`hostel-tab ${
                    receiptTab === tab ? "active" : ""
                  }`}
                  onClick={() => setReceiptTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <h3 className="hostel-applicable-title">
              {receiptTab === "Fee Receipt"
                ? "Hostel Fee Receipt"
                : receiptTab}
            </h3>

            {receiptTab === "Fee Receipt" ? (
              <>
                <div className="hostel-result-count">Total 24 results.</div>
                <table className="hostel-data-table">
                  <thead>
                    <tr>
                      <th>Sl.No.</th>
                      <th>Receipt No</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Installment</th>
                      <th>Processed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="hostel-link">0010365</td>
                      <td>2292.00</td>
                      <td>ONLINE</td>
                      <td>04/10/2026</td>
                      <td>Aug 2026</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="hostel-link">0009491</td>
                      <td>2298.00</td>
                      <td>ONLINE</td>
                      <td>17/09/2026</td>
                      <td>Jul 2026</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <p className="hostel-empty hostel-history-content">
                No {receiptTab.toLowerCase()} records found.
              </p>
            )}
          </>
        ) : (
          <div className="hostel-history-content">
            <h3>Hostel Fee History</h3>
            No history found.
          </div>
        )}
      </section>

      <footer className="hostel-footer">
        <span>Page Generated in 0.79503 seconds</span>
        <span>© 2026 Etuwa Concepts. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Hostel;
