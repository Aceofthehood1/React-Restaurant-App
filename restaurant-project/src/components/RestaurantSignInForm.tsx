import { Link } from "react-router-dom";
function RestaurantSignInForm() {
  return (
    <>
      <form className="form">
        <p id="form-head">Sign In</p>
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
        <Link id="form-link" to="/restaurantSignUp">
          Dont have an account? Click here to sign up
        </Link>
      </form>
    </>
  );
}

export default RestaurantSignInForm;