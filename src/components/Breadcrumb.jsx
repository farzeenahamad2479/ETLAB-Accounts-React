
import { useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  const page =
    location.pathname === "/accounts/dues"
      ? "Dues"
      : location.pathname === "/accounts"
      ? "Dashboard"
      : "Select Fees";

  return (
    <div className="breadcrumb">
      <span className="breadcrumb-home">◆</span>
      <span>Home</span>
      <span className="separator">›</span>
      <span>Accounts Fee</span>
      <span className="separator">›</span>
      <span>Pay Fees</span>
      <span className="separator">›</span>
      <strong>{page}</strong>
    </div>
  );
}

export default Breadcrumb;
