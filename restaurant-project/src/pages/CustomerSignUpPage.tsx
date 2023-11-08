import { Link } from "react-router-dom";
function CustomerSignUpPage() {
  return (
    <>
    <h1 className="text-4xl m-2" id="head">Customer Sign Up Page</h1>
    <div className="flex flex-col justify-center items-center w-3/4">
    <form className="form mb-10">
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
          Email
          <input id="email-address" type="email"></input>
        </label>
        <label htmlFor="password">
          Password
          <input id="password" type="password"></input>
        </label>
        <button className="btn btn-three">
          <span>Sign Up</span>
        </button>
        <Link id="form-link" to="/customerSignIn">
          Already have an Account? Click here to sign in
        </Link>
      </form>
    </div>
    </>
  );
}

export default CustomerSignUpPage;
