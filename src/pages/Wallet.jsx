
import AccountsTabs from "../components/AccountsTabs";
import "./Wallet.css";

function Wallet() {
    return (
        <div className="wallet-page">
            {/* Shared Accounts navigation */}
            <AccountsTabs />

            {/* Wallet balance */}
            <section className="wallet-panel">
                <div className="wallet-panel-heading">
                    <span className="panel-menu-icon">▤</span>
                    <span>240374 - FARSEEN AHAMAD K P</span>
                </div>

                <div className="wallet-balance-area">
                    <div className="wallet-balance-card">
                        <strong>Balance</strong>
                        <div className="wallet-amount">₹0.00</div>
                    </div>

                    <button
                        type="button"
                        className="wallet-add-button"
                        title="Add money"
                        aria-label="Add money"
                    >
                        ₹
                    </button>
                </div>
            </section>

            {/* Transactions */}
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
                                        aria-label="Filter by date"
                                    />
                                </td>

                                <td>
                                    <select
                                        defaultValue=""
                                        aria-label="Filter by method"
                                    >
                                        <option value=""></option>
                                        <option value="ONLINE">ONLINE</option>
                                        <option value="SWIPE">SWIPE</option>
                                        <option value="CASH">CASH</option>
                                    </select>
                                </td>

                                <td>
                                    <select
                                        defaultValue=""
                                        aria-label="Filter by status"
                                    >
                                        <option value=""></option>
                                        <option value="Success">Success</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                </td>

                                <td>
                                    <input
                                        type="date"
                                        aria-label="Filter by create date"
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        aria-label="Filter by amount"
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="6" className="no-transactions">
                                    No transactions found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Wallet;
