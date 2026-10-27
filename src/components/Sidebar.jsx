
import { NavLink } from "react-router-dom";

const menuItems = [
    { label: "Exam", path: "/exam", icon: "▦" },
    { label: "Accounts", path: "/", icon: "▦" },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-menu">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

        </aside>
    );
}

export default Sidebar;
