
import { useEffect, useState } from "react";
import AccountsTabs from "../components/AccountsTabs";
import "./BankDetails.css";

const bankDetails = [
    ["Admission No.", "240374"],
    ["Name", "FARSEEN AHAMAD K P"],
    ["Department", "COMPUTER SCIENCE & ENGINEERING"],
    ["Bank Account No.", "110123831904"],
    ["Account Holder Name", "Farseen Ahamad KP"],
    ["Mobile Number", "8648909090"],
    ["Bank Name", "Canara Bank"],
    ["Branch Name", "Taliparamba Canara Bank"],
    ["IFSC Code", "CNRB0014205"],
];

const initialForm = {
    accountHolder: "",
    accountNumber: "",
    confirmAccountNumber: "",
    bankName: "",
    branchName: "",
    ifsc: "",
    mobile: "",
};

const STORAGE_KEY = "etlabBankUpdateRequest";

function loadRequest() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
}

function BankDetails() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [pendingRequest, setPendingRequest] = useState(loadRequest);
    const [pageMessage, setPageMessage] = useState("");

    useEffect(() => {
        try {
            if (pendingRequest) {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(pendingRequest)
                );
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch {
            setPageMessage(
                "Could not synchronize the request with browser storage."
            );
        }
    }, [pendingRequest]);

    const handlePrint = () => window.print();
    const handleGeneratePDF = () => window.print();

    function handleRequestUpdate() {
        if (pendingRequest?.status === "Pending Approval") {
            setPageMessage(
                "You already have a pending bank details update request."
            );
            return;
        }

        setForm(initialForm);
        setErrors({});
        setPageMessage("");
        setShowForm(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: name === "ifsc" ? value.toUpperCase() : value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
            confirmAccountNumber:
                name === "accountNumber" ||
                name === "confirmAccountNumber"
                    ? ""
                    : previous.confirmAccountNumber,
        }));

        setPageMessage("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        if (!form.accountHolder.trim()) {
            newErrors.accountHolder = "Enter the account holder name.";
        }

        if (!form.accountNumber.trim()) {
            newErrors.accountNumber = "Enter the bank account number.";
        } else if (!/^\d{8,20}$/.test(form.accountNumber.trim())) {
            newErrors.accountNumber =
                "Account number must contain 8–20 digits.";
        }

        if (!form.confirmAccountNumber.trim()) {
            newErrors.confirmAccountNumber =
                "Confirm your bank account number.";
        } else if (
            form.accountNumber.trim() !==
            form.confirmAccountNumber.trim()
        ) {
            newErrors.confirmAccountNumber =
                "Account numbers do not match.";
        }

        if (!form.bankName.trim()) {
            newErrors.bankName = "Enter the bank name.";
        }

        if (!form.branchName.trim()) {
            newErrors.branchName = "Enter the branch name.";
        }

        if (!form.ifsc.trim()) {
            newErrors.ifsc = "Enter the IFSC code.";
        } else if (
            !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.trim())
        ) {
            newErrors.ifsc = "Enter a valid 11-character IFSC code.";
        }

        if (!form.mobile.trim()) {
            newErrors.mobile = "Enter your mobile number.";
        } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
            newErrors.mobile =
                "Enter a valid 10-digit Indian mobile number.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setPageMessage("Please correct the errors in the form.");
            return;
        }

        const request = {
            id: Date.now(),
            accountHolder: form.accountHolder.trim(),
            accountNumber: form.accountNumber.trim(),
            bankName: form.bankName.trim(),
            branchName: form.branchName.trim(),
            ifsc: form.ifsc.trim(),
            mobile: form.mobile.trim(),
            status: "Pending Approval",
            submittedAt: new Date().toLocaleString(),
        };

        setPendingRequest(request);
        setErrors({});
        setShowForm(false);
        setForm(initialForm);
        setPageMessage(
            "Your update request has been saved. Its current status is Pending Approval."
        );
    }

    function handleCancel() {
        setShowForm(false);
        setForm(initialForm);
        setErrors({});
        setPageMessage("");
    }

    function handleCancelRequest() {
        const confirmed = window.confirm(
            "Are you sure you want to cancel your pending update request?"
        );

        if (!confirmed) return;

        setPendingRequest(null);
        setPageMessage("The pending demo request has been cancelled.");
    }

    return (
        <div className="bank-details-page">
            <AccountsTabs />

            <section className="bank-details-panel">
                <div className="bank-details-heading">
                    <span>Bank Details</span>

                    <div className="bank-details-actions">
                        <button
                            type="button"
                            className="bank-btn print-btn"
                            onClick={handlePrint}
                        >
                            ▣ Print
                        </button>

                        <button
                            type="button"
                            className="bank-btn pdf-btn"
                            onClick={handleGeneratePDF}
                        >
                            ⬇ Generate PDF
                        </button>

                        <button
                            type="button"
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

            {pageMessage && (
                <div
                    className="bank-page-message"
                    role="status"
                >
                    {pageMessage}
                </div>
            )}

            {pendingRequest && (
                <section className="bank-update-panel">
                    <div className="bank-update-heading">
                        <span>Submitted Bank Update Request</span>
                        <span className="bank-status">
                            {pendingRequest.status}
                        </span>
                    </div>

                    <div className="bank-details-content">
                        <p className="bank-form-note">
                            Your requested changes are waiting for approval.
                            Your existing bank details above have not been changed.
                        </p>

                        <table className="bank-details-table">
                            <tbody>
                                <tr>
                                    <th>Account Holder Name</th>
                                    <td>{pendingRequest.accountHolder}</td>
                                </tr>
                                <tr>
                                    <th>Bank Account Number</th>
                                    <td>
                                        {"•".repeat(
                                            Math.max(
                                                0,
                                                pendingRequest.accountNumber.length - 4
                                            )
                                        )}
                                        {pendingRequest.accountNumber.slice(-4)}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Bank Name</th>
                                    <td>{pendingRequest.bankName}</td>
                                </tr>
                                <tr>
                                    <th>Branch Name</th>
                                    <td>{pendingRequest.branchName}</td>
                                </tr>
                                <tr>
                                    <th>IFSC Code</th>
                                    <td>{pendingRequest.ifsc}</td>
                                </tr>
                                <tr>
                                    <th>Mobile Number</th>
                                    <td>{pendingRequest.mobile}</td>
                                </tr>
                                <tr>
                                    <th>Submitted At</th>
                                    <td>{pendingRequest.submittedAt}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="bank-form-actions">
                            <button
                                type="button"
                                className="bank-cancel-button"
                                onClick={handleCancelRequest}
                            >
                                Cancel Request
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {showForm && (
                <section className="bank-update-panel">
                    <div className="bank-update-heading">
                        <span>Request Bank Details Update</span>
                        <button
                            type="button"
                            className="bank-close-button"
                            onClick={handleCancel}
                            aria-label="Close form"
                        >
                            ×
                        </button>
                    </div>

                    <form
                        className="bank-update-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <p className="bank-form-note">
                            Enter the bank details you want to update.
                            This frontend demo saves the request in this browser only.
                        </p>

                        <div className="bank-form-grid">
                            <div className="bank-form-field">
                                <label htmlFor="accountHolder">
                                    Account Holder Name *
                                </label>
                                <input
                                    id="accountHolder"
                                    name="accountHolder"
                                    value={form.accountHolder}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.accountHolder && (
                                    <span className="bank-field-error">
                                        {errors.accountHolder}
                                    </span>
                                )}
                            </div>

                            <div className="bank-form-field">
                                <label htmlFor="accountNumber">
                                    Bank Account Number *
                                </label>
                                <input
                                    id="accountNumber"
                                    name="accountNumber"
                                    type="password"
                                    inputMode="numeric"
                                    value={form.accountNumber}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.accountNumber && (
                                    <span className="bank-field-error">
                                        {errors.accountNumber}
                                    </span>
                                )}
                            </div>

                            <div className="bank-form-field">
                                <label htmlFor="confirmAccountNumber">
                                    Confirm Account Number *
                                </label>
                                <input
                                    id="confirmAccountNumber"
                                    name="confirmAccountNumber"
                                    type="password"
                                    inputMode="numeric"
                                    value={form.confirmAccountNumber}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.confirmAccountNumber && (
                                    <span className="bank-field-error">
                                        {errors.confirmAccountNumber}
                                    </span>
                                )}
                            </div>

                            <div className="bank-form-field">
                                <label htmlFor="bankName">Bank Name *</label>
                                <input
                                    id="bankName"
                                    name="bankName"
                                    value={form.bankName}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.bankName && (
                                    <span className="bank-field-error">
                                        {errors.bankName}
                                    </span>
                                )}
                            </div>

                            <div className="bank-form-field">
                                <label htmlFor="branchName">Branch Name *</label>
                                <input
                                    id="branchName"
                                    name="branchName"
                                    value={form.branchName}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.branchName && (
                                    <span className="bank-field-error">
                                        {errors.branchName}
                                    </span>
                                )}
                            </div>

                            <div className="bank-form-field">
                                <label htmlFor="ifsc">IFSC Code *</label>
                                <input
                                    id="ifsc"
                                    name="ifsc"
                                    value={form.ifsc}
                                    onChange={handleChange}
                                    maxLength={11}
                                    autoCapitalize="characters"
                                    autoComplete="off"
                                />
                                {errors.ifsc && (
                                    <span className="bank-field-error">
                                        {errors.ifsc}
                                    </span>
                                )}
                            </div>

                            <div className="bank-form-field">
                                <label htmlFor="mobile">Mobile Number *</label>
                                <input
                                    id="mobile"
                                    name="mobile"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={form.mobile}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.mobile && (
                                    <span className="bank-field-error">
                                        {errors.mobile}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="bank-form-actions">
                            <button
                                type="button"
                                className="bank-cancel-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bank-submit-button"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
}

export default BankDetails;
