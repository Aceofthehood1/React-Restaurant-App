import { Link } from "react-router-dom";
function RestaurantSignInPage() {
    return (
      <>
        <h1 className="text-4xl m-2" id="head">Restaurant Sign In Page</h1>
        <div className="flex flex-col justify-center items-center mt-10">
        <form className="form mb-10">
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
        </div>
        
      </>
    );
  }
  
  export default RestaurantSignInPage;