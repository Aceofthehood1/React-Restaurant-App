import { Link } from "react-router-dom";
function CustomerSignInPage() {
  return (
    <>
      <h1 className="text-5xl text-center">Customer Sign In Page</h1>

      <Link id="form-link" to="/">
        <h2 className="text-3xl text-center">Go to Homepage</h2>
      </Link>

      <div className="flex flex-col justify-center items-center mt-10">
        <form className="form mb-10">
          <p id="form-head">Sign In</p>
          <label htmlFor="email-address">
            Email
            <input id="email-address" type="email" placeholder="Email"></input>
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              className="pl-2"
              type="password"
              placeholder="Password"
            ></input>
          </label>
          <Link to="/customerHomePage">
            <button>
              <span>Sign Up</span>
            </button>
          </Link>
          <Link id="form-link" to="/customerSignUp">
            Dont have an account? Click here to sign up
          </Link>
        </form>
      </div>
    </>
  );
}

export default CustomerSignInPage;
