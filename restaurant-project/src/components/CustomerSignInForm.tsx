import { Link } from "react-router-dom";
function CustomerSignInForm() {
  return (
    <>
      <form className="form">
        <p id="form-head">Register Account</p>
        <label htmlFor="first-name">
          First Name
          <input id="first-name" type="text"></input>
        </label>
        <label htmlFor="surname">
          Surname
          <input id="surname" type="text"></input>
        </label>
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
        <Link id="form-link" to="">
          Already have an an Account? Click here to sign in
        </Link>
      </form>
    </>
  );
}

export default CustomerSignInForm;
