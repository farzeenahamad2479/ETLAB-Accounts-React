
import { useEffect, useState } from "react";
import AccountsTabs from "../components/AccountsTabs";
import "./Wallet.css";

function Wallet() {
    // Restore saved demo data when the page opens
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem("etlabWalletBalance");
        return saved === null ? 0 : Number(saved);
    });

    const [transactions, setTransactions] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("etlabWalletTransactions") || "[]"
            );
        } catch {
            return [];
        }
    });

    const [showAddMoney, setShowAddMoney] = useState(false);
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("ONLINE");
    const [error, setError] = useState("");

    // Transaction filters
    const [dateFilter, setDateFilter] = useState("");
    const [methodFilter, setMethodFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [createdDateFilter, setCreatedDateFilter] = useState("");
    const [amountFilter, setAmountFilter] = useState("");

    // Save changes to browser storage
    useEffect(() => {
        localStorage.setItem("etlabWalletBalance", String(balance));
        localStorage.setItem(
            "etlabWalletTransactions",
            JSON.stringify(transactions)
        );
    }, [balance, transactions]);

    // Demo top-up only — no real payment is processed
    function handleAddMoney(event) {
        event.preventDefault();

        const value = Number(amount);

        if (!amount || !Number.isFinite(value) || value <= 0) {
            setError("Enter an amount greater than ₹0.");
            return;
        }

        if (value > 100000) {
            setError("For this demo, the maximum top-up is ₹1,00,000.");
            return;
        }

        const now = new Date();

        const transaction = {
            id: `${Date.now()}-${Math.random()}`,
            date: now.toISOString().slice(0, 10),
            createdDate: now.toISOString().slice(0, 10),
            method,
            status: "Success",
            amount: value,
        };

        setBalance((previousBalance) => previousBalance + value);
        setTransactions((previous) => [transaction, ...previous]);

        setAmount("");
        setError("");
        setShowAddMoney(false);
    }

    // Filter the displayed transactions
    const filteredTransactions = transactions.filter((transaction) => {
        return (
            (!dateFilter || transaction.date === dateFilter) &&
            (!methodFilter || transaction.method === methodFilter) &&
            (!statusFilter || transaction.status === statusFilter) &&
            (!createdDateFilter ||
                transaction.createdDate === createdDateFilter) &&
            (!amountFilter ||
                transaction.amount === Number(amountFilter))
        );
    });

    function clearFilters() {
        setDateFilter("");
        setMethodFilter("");
        setStatusFilter("");
        setCreatedDateFilter("");
        setAmountFilter("");
    }

    return (
        <div className="wallet-page">
            <AccountsTabs />

            {/* Wallet balance panel */}
            <section className="wallet-panel">
                <div className="wallet-panel-heading">
                    <span className="panel-menu-icon">▤</span>
                    <span>240374 - FARSEEN AHAMAD K P</span>
                </div>

                <div className="wallet-balance-area">
                    <div className="wallet-balance-card">
                        <strong>Balance</strong>
                        <div className="wallet-amount">
                            ₹{balance.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="wallet-add-button"
                        title="Add money"
                        aria-label="Add money"
                        onClick={() => {
                            setError("");
                            setShowAddMoney(true);
                        }}
                    >
                        ₹
                    </button>

                    <p className="wallet-demo-note">
                        Demo wallet · No real payment is processed
                    </p>
                </div>
            </section>

            {/* Transactions panel */}
            <section className="wallet-panel transactions-panel">
                <div className="wallet-panel-heading">
                    <span className="panel-menu-icon">▤</span>
                    <span>Transactions</span>
                </div>

                <div className="transactions-table-wrapper">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Sl.No.</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Create Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="transaction-filters">
                                <td></td>
                                <td>
                                    <input
                                        type="date"
                                        value={dateFilter}
                                        onChange={(e) =>
                                            setDateFilter(e.target.value)
                                        }
                                        aria-label="Filter by date"
                                    />
                                </td>
                                <td>
                                    <select
                                        value={methodFilter}
                                        onChange={(e) =>
                                            setMethodFilter(e.target.value)
                                        }
                                        aria-label="Filter by method"
                                    >
                                        <option value="">All</option>
                                        <option value="ONLINE">ONLINE</option>
                                        <option value="SWIPE">SWIPE</option>
                                        <option value="CASH">CASH</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        aria-label="Filter by status"
                                    >
                                        <option value="">All</option>
                                        <option value="Success">Success</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={createdDateFilter}
                                        onChange={(e) =>
                                            setCreatedDateFilter(
                                                e.target.value
                                            )
                                        }
                                        aria-label="Filter by create date"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Amount"
                                        value={amountFilter}
                                        onChange={(e) =>
                                            setAmountFilter(e.target.value)
                                        }
                                        aria-label="Filter by amount"
                                    />
                                </td>
                            </tr>

                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="no-transactions"
                                    >
                                        {transactions.length === 0
                                            ? "No transactions found."
                                            : "No matching transactions."}
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map(
                                    (transaction, index) => (
                                        <tr key={transaction.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {new Date(
                                                    transaction.date +
                                                        "T00:00:00"
                                                ).toLocaleDateString("en-GB")}
                                            </td>
                                            <td>{transaction.method}</td>
                                            <td>
                                                <span className="wallet-status-success">
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td>
                                                {new Date(
                                                    transaction.createdDate +
                                                        "T00:00:00"
                                                ).toLocaleDateString("en-GB")}
                                            </td>
                                            <td>
                                                ₹
                                                {transaction.amount.toLocaleString(
                                                    "en-IN",
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="wallet-table-footer">
                    <span>
                        Showing {filteredTransactions.length} of{" "}
                        {transactions.length} transactions
                    </span>

                    <button
                        type="button"
                        className="wallet-clear-filters"
                        onClick={clearFilters}
                    >
                        Clear filters
                    </button>
                </div>
            </section>

            {/* Add Money dialog */}
            {showAddMoney && (
                <div
                    className="wallet-modal-backdrop"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowAddMoney(false);
                        }
                    }}
                >
                    <section
                        className="wallet-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="wallet-modal-title"
                    >
                        <div className="wallet-modal-heading">
                            <h2 id="wallet-modal-title">Add Money</h2>

                            <button
                                type="button"
                                className="wallet-modal-close"
                                onClick={() => setShowAddMoney(false)}
                                aria-label="Close dialog"
                            >
                                ×
                            </button>
                        </div>

                        <p className="wallet-modal-description">
                            Add demo funds to your ETLAB wallet.
                        </p>

                        <form onSubmit={handleAddMoney}>
                            <label htmlFor="wallet-amount">
                                Amount (₹)
                            </label>

                            <input
                                id="wallet-amount"
                                type="number"
                                min="0.01"
                                max="100000"
                                step="0.01"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setError("");
                                }}
                                required
                                autoFocus
                            />

                            <label htmlFor="wallet-method">
                                Payment Method
                            </label>

                            <select
                                id="wallet-method"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                            >
                                <option value="ONLINE">
                                    Online Payment (Demo)
                                </option>
                                <option value="SWIPE">Swipe (Demo)</option>
                                <option value="CASH">Cash (Demo)</option>
                            </select>

                            {error && (
                                <p className="wallet-form-error" role="alert">
                                    {error}
                                </p>
                            )}

                            <div className="wallet-modal-actions">
                                <button
                                    type="button"
                                    className="wallet-cancel-button"
                                    onClick={() => {
                                        setShowAddMoney(false);
                                        setError("");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="wallet-proceed-button"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </form>

                        <p className="wallet-demo-warning">
                            This is a UI demonstration only. No bank account
                            or payment gateway is connected.
                        </p>
                    </section>
                </div>
            )}
        </div>
    );
}

export default Wallet;
