
import AccountsTabs from "../components/AccountsTabs";

const receipts = [
    {
        id: 1,
        receipt: "GU05129",
        amount: "22750.00",
        method: "SWIPE",
        date: "22nd Aug '24 10:38 AM",
        status: "Cash Transfered",
        processedBy: "Mrs. BIJOYA N",
    },
    {
        id: 2,
        receipt: "GU06576",
        amount: "590.00",
        method: "ONLINE",
        date: "25th Oct '24 12:00 AM",
        status: "Cash Received",
        processedBy: "",
    },
];

function SelectFees() {
    return (
        <div className="accounts-page">
            <AccountsTabs />

            <div className="sub-tabs">
                <button className="sub-tab active">Student Fee</button>
                <button className="sub-tab">Dte M.Tech Fee (additional)</button>
            </div>

            <div className="fee-table-wrap">
                <table className="fee-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Installment</th>
                            <th>Feehead</th>
                            <th>Fees</th>
                            <th>Fee Adjustment</th>
                            <th>Headwise Fee Adjustment</th>
                            <th>Payable</th>
                            <th>Paid</th>
                            <th>Balance</th>
                            <th>Paying</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="student-cell">
                                <div className="student-photo-placeholder"><img
                                    className="student-photo"
                                    src="/student-photo.jpeg"
                                    alt="Student"
                                /></div>
                                <strong>
                                    240374
                                    <br />
                                    FARSEEN AHAMAD K P
                                    <br />
                                    CSE 2K24A
                                </strong>
                            </td>
                            <td colSpan="9" className="empty-fees"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <section className="receipts-section">
                <h2>Fee Receipts</h2>

                <div className="results-count">Total 2 results.</div>

                <div className="receipt-table-wrap">
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>Sl.No.</th>
                                <th>Receipt No</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Processed By</th>
                                <th>View</th>
                            </tr>
                        </thead>

                        <tbody>
                            {receipts.map((receipt) => (
                                <tr key={receipt.id}>
                                    <td>{receipt.id}</td>
                                    <td>{receipt.receipt}</td>
                                    <td>{receipt.amount}</td>
                                    <td>{receipt.method}</td>
                                    <td>{receipt.date}</td>
                                    <td>{receipt.status}</td>
                                    <td>{receipt.processedBy}</td>
                                    <td>
                                        <button
                                            className="print-button"
                                            onClick={() => window.print()}
                                            aria-label={`Print receipt ${receipt.receipt}`}
                                        >
                                            ▣
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

export default SelectFees;
