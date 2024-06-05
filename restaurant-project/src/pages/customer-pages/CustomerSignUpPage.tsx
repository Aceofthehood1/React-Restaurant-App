import { Link } from "react-router-dom";
function CustomerSignUpPage() {
  return (
    <>
      <h1 className="text-5xl text-center">Customer Sign Up Page</h1>
      
      <Link id="form-link" to="/">
        <h2 className="text-3xl text-center">Go to Homepage</h2>
      </Link>

      <div className="flex flex-col justify-center items-center mt-10">
        <form className="form mb-10">
          <p id="form-head">Register Account</p>
          <label htmlFor="first-name">
            First Name
            <input id="first-name" type="text" placeholder="First Name"></input>
          </label>
          <label htmlFor="surname">
            Surname
            <input id="surname" type="text" placeholder="Surname"></input>
          </label>
          <label htmlFor="email-address">
            Email
            <input id="email-address" type="email" placeholder="Email"></input>
          </label>
          <label htmlFor="password">
            Password
            <input id="password" type="password" placeholder="Password"></input>
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
