
import AccountsTabs from "../components/AccountsTabs";
import "./BankDetails.css";

const bankDetails = [
    ["Admission No.", "240374"],
    ["Name", "FARSEEN AHAMAD K P"],
    ["Department", "COMPUTER SCIENCE & ENGINEERING"],
    ["Bank Account No.", "110123831904"],
    ["Account Holder Name", "Farzeen Ahamad KP"],
    ["Mobile Number", "8648909090"],
    ["Bank Name", "Canara Bank"],
    ["Branch Name", "Taliparamba Canara Bank"],
    ["IFSC Code", "CNRB0014205"],
];

function BankDetails() {
    const handlePrint = () => window.print();

    const handleGeneratePDF = () => {
        window.print();
    };

    const handleRequestUpdate = () => {
        window.alert("Your bank details update request has been noted.");
    };

    return (
        <div className="bank-details-page">
            <AccountsTabs />

            <section className="bank-details-panel">
                <div className="bank-details-heading">
                    <span>Bank Details</span>

                    <div className="bank-details-actions">
                        <button
                            className="bank-btn print-btn"
                            onClick={handlePrint}
                        >
                            ▣ Print
                        </button>

                        <button
                            className="bank-btn pdf-btn"
                            onClick={handleGeneratePDF}
                        >
                            ⬇ Generate PDF
                        </button>

                        <button
                            className="bank-btn update-btn"
                            onClick={handleRequestUpdate}
                        >
                            ✎ Request Update
                        </button>
                    </div>
                </div>

                <div className="bank-details-content">
                    <table className="bank-details-table">
                        <tbody>
                            {bankDetails.map(([label, value]) => (
                                <tr key={label}>
                                    <th>{label}</th>
                                    <td>{value}</td>
                                </tr>
                            ))}

                            <tr>
                                <th>Application Status</th>
                                <td>
                                    <span className="bank-status">
                                        Pending Approval
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default BankDetails;
