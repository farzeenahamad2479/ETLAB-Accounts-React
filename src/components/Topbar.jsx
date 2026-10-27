
function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">etlab</div>

      <div className="college-name">TKM College of Engineering</div>

      <div className="topbar-actions">
        <button className="top-action">
          ♟ FARSEEN AHAMAD K P
        </button>

        <button className="top-action messages">
          ✉ Messages <span className="message-count">4</span>⌄
        </button>

        <button className="top-action logout">➜ Logout</button>
      </div>
    </header>
  );
}

export default Topbar;
