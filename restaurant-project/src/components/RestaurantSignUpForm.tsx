import { Link } from "react-router-dom";
function RestaurantSignUpForm() {
  return (
    <>
      <form className="form">
        <p id="form-head">Register Account</p>
        <label htmlFor="restaurant-name">
          Restaurant Name
          <input id="restaurant-name" type="text"></input>
        </label>
        <label htmlFor="address">
          Address
          <input id="address" type="text"></input>
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
        <Link id="form-link" to="/restaurantSignIn">
          Already have an Account? Click here to sign in
        </Link>
      </form>
    </>
  );
}

export default RestaurantSignUpForm;