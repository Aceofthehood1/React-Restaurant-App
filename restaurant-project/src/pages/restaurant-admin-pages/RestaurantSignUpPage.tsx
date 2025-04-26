import {
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";

function RestaurantSignUpPage() {
  const [restaurant_name, setRestaurantName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

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
      navigate("/restaurantAdminPage");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };
  return (
    <>
      <HeaderBar></HeaderBar>
      <div className="flex flex-col justify-center items-center mt-10 bg-cream">
        <form className="form mb-10 text-cream">
          <p id="form-head" className="my-2">Register Account</p>
          <label htmlFor="restaurant-name">
            Restaurant Name
            <input
              id="restaurant-name"
              type="text"
              placeholder="Restaurant Name"
              onChange={(e) => setRestaurantName(e.target.value)}
              className="text-black"
            ></input>
          </label>
          <label htmlFor="address">
            Address
            <input
              id="address"
              type="text"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              className="text-black"
            ></input>
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="text-black"
            ></input>
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="text-black"
            ></input>
          </label>
          <button
            className="inline-block my-2 rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
            onClick={Submit}
          >
            <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon> Sign Up
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
