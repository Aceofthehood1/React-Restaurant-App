import { Link } from "react-router-dom";
function HeaderBar() {

  return (
    <>
  <div className="navbar header-bar">
      <Link to="/" className="header-bar-link">Go to Homepage</Link>
        </div>
      </>
  );
}

export default HeaderBar;
