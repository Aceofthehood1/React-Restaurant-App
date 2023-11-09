import { Link } from "react-router-dom";
function RestaurantSignUpPage() {
    return (
      <>
        <h1 className="text-4xl m-2"id="head">Restaurant Registration Page</h1>
        <div className="flex flex-col justify-center items-center mt-10">
        <form className="form mb-10">
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
        </div>
        
      </>
    );
  }
  
  export default RestaurantSignUpPage;