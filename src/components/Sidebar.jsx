
import { NavLink } from "react-router-dom";

const menuItems = [
    { label: "Dashboard", path: "/", icon: "◆" },
    { label: "Attendance", path: "/attendance", icon: "▤" },
    { label: "Results", path: "/results", icon: "☑" },
    { label: "Time Table", path: "/timetable", icon: "▦" },
    { label: "Assignments", path: "/assignments", icon: "▧" },
    { label: "Materials", path: "/materials", icon: "▧" },
    { label: "User Manual", path: "/user-manual", icon: "▦" },
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

            <div className="sidebar-footer">ETLAB Student Portal</div>
        </aside>
    );
}

export default Sidebar;
