
import AccountsTabs from "../components/AccountsTabs";
import "./Receipts.css";

const receipts = [
    {
        number: "GU06576",
        batch: "CSE 2K24A",
        total: "590.00",
        method: "ONLINE",
        date: "25/10/2024",
        status: "Cash Received",
    },
];

function Receipts() {
    return (
        <div className="receipts-page">
            <AccountsTabs />

            <nav className="receipts-subtabs">
                <span className="receipts-subtitle">Receipts</span>
                <button className="receipt-subtab active">
                    Academic Fee Receipts
                </button>
                <button className="receipt-subtab">Due Receipts</button>
                <button className="receipt-subtab">Transport Receipts</button>
                <button className="receipt-subtab">Hostel Receipts</button>
            </nav>

            <section className="receipt-panel">
                <div className="receipt-panel-heading">
                    <span className="receipt-menu-icon">▤</span>
                    <span>View Fees of FARSEEN AHAMAD K P</span>
                </div>

                <div className="receipt-batch-select">
                    <select defaultValue="CSE 2K24A">
                        <option value="CSE 2K24A">
                            CSE 2K24A - Current Batch
                        </option>
                    </select>
                </div>

                <div className="receipt-table-wrap">
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Installment</th>
                                <th>Feehead</th>
                                <th>Fees</th>
                                <th>Scholarship</th>
                                <th>Payable</th>
                                <th>Paid</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="8" className="receipt-empty">
                                    No fees found for the selected batch.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="receipt-result-count">
                    Displaying 1-1 of 1 receipts.
                </div>

                <div className="receipt-table-wrap">
                    <table className="receipt-table receipt-list">
                        <thead>
                            <tr>
                                <th>Receipt No</th>
                                <th>Batch</th>
                                <th>Total</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receipt) => (
                                <tr key={receipt.number}>
                                    <td>{receipt.number}</td>
                                    <td>{receipt.batch}</td>
                                    <td>{receipt.total}</td>
                                    <td>{receipt.method}</td>
                                    <td>{receipt.date}</td>
                                    <td>{receipt.status}</td>
                                    <td>
                                        <button
                                            className="receipt-view"
                                            onClick={() =>
                                                window.alert(
                                                    `Receipt ${receipt.number}`
                                                )
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Receipts;
