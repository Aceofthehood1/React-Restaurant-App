import { Link } from "react-router-dom";
function RestaurantSignUpPage() {
  return (
    <>
      <h1 className="text-5xl m-2" id="head">
        Restaurant Registration Page
      </h1>

      <Link id="form-link" to="/">
        <h2 className="text-3xl text-center">Go to Homepage</h2>
      </Link>
      
      <div className="flex flex-col justify-center items-center mt-10">
        <form className="form mb-10">
          <p id="form-head">Register Account</p>
          <label htmlFor="restaurant-name">
            Restaurant Name
            <input
              id="restaurant-name"
              type="text"
              placeholder="Restaurant Name"
            ></input>
          </label>
          <label htmlFor="address">
            Address
            <input id="address" type="text" placeholder="Address"></input>
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
          <Link id="form-link" to="/restaurantSignIn">
            Already have an Account? Click here to sign in
          </Link>
        </form>
      </div>
    </>
  );
}

export default RestaurantSignUpPage;
