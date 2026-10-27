
import { NavLink, Link } from "react-router-dom";

const tabs = [
    { label: "Accounts", path: "/accounts/fees", isHome: true },
    { label: "Fees", path: "/accounts/fees" },
    { label: "Dues", path: "/accounts/dues" },
    { label: "Transport", path: "/accounts/transport" },
    { label: "Hostel", path: "/accounts/hostel" },
    { label: "Wallet", path: "/accounts/wallet" },
    { label: "Receipts", path: "/accounts/receipts" },
    { label: "Bank Details", path: "/accounts/bank-details" },
];

function AccountsTabs() {
    return (
        <nav className="accounts-tabs">
            {tabs.map((tab) =>
                tab.isHome ? (
                    <Link
                        key={tab.label}
                        to={tab.path}
                        className="accounts-tab accounts-home"
                    >
                        {tab.label}
                    </Link>
                ) : (
                    <NavLink
                        key={tab.label}
                        to={tab.path}
                        className={({ isActive }) =>
                            `accounts-tab ${isActive ? "selected" : ""}`
                        }
                    >
                        {tab.label}
                    </NavLink>
                )
            )}
        </nav>
    );
}

export default AccountsTabs;
