import { Link, useNavigate } from "react-router-dom";
function HeaderBar() {

  return (
    <>
  <div className="navbar items-center justify-center h-5 pt-7">
          <Link id="form-link" to="/">
        <h2 className="text-xl btn btn-ghost text-cream sm:text-3xl mt-0 mb-0">Go to Homepage</h2>
      </Link>
        </div>
      </>
  );
}

export default HeaderBar;
