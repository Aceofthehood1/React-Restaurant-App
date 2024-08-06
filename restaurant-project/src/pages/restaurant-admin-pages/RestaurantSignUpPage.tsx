import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RestaurantSignUpPage() {
  const [restaurant_name, setRestaurantName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate()

  const Submit = (e: { preventDefault: () => void }) => {
    if (
      restaurant_name &&
      address &&
      email &&
      password &&
      email.includes("@")
    ) {
      axios
        .post("http://localhost:3001/createRep", {
          restaurant_name,
          address,
          email,
          password,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
        navigate('/restaurantAdminPage')
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };
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
              onChange={(e) => setRestaurantName(e.target.value)}
            ></input>
          </label>
          <label htmlFor="address">
            Address
            <input id="address" type="text" 
            placeholder="Address"
            onChange= {(e)=> setAddress(e.target.value)}
            ></input>
          </label>
          <label htmlFor="email">
            Email
            <input id="email" type="email" placeholder="Email"
            onChange= {(e)=> setEmail(e.target.value)}
            ></input>
          </label>
          <label htmlFor="password">
            Password
            <input id="password" type="password" placeholder="Password"
            onChange= {(e)=> setPassword(e.target.value)}
            ></input>
          </label>
          <button id="sub" onClick={Submit} className="btn btn-three">
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
