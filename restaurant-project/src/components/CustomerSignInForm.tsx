import { Link } from "react-router-dom";
function CustomerSignInForm() {
  return (
    <>
      <form className="form">
        <p id="form-head">Sign In</p>
        <label htmlFor="email-address">
          Email Address
          <input id="email-address" type="email"></input>
        </label>
        <label htmlFor="password">
          Password
          <input id="password" type="password"></input>
        </label>
        <button className="btn btn-three">
          <span>Sign Up</span>
        </button>
        <Link id="form-link" to="/customerSignUp">
          Dont have an account? Click here to sign up
        </Link>
      </form>
    </>
  );
}

export default CustomerSignInForm;