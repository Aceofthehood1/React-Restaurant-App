import { Link, useNavigate, useParams } from "react-router-dom";
import { MongoClient } from "mongodb";
import axios from "axios";
import { useState, useEffect } from "react";
function RestaurantSignInPage() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const navigate = useNavigate();

  const Check = (e: { preventDefault: () => any }) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("http://localhost:3001/loginRepresentative", { email, password })
        .then((result) => {
          console.log(result);
          if (result.data[0] == "Logged in Successfully") {
            //from backend the result value is taken and checked to see if user was able to login successfully if it was possible they are redirected to a different page
            sessionStorage.setItem('rep_id',result.data[1])  //Creates session storage and sets value to representatives id
            navigate("/restaurantAdminPage");
          }else if(result.data == "The password is incorrect"){
            alert("The password is incorrect")
              sessionStorage.removeItem('rep_id')
          } else {
            alert("Email does not exist");
          }
        })
        .catch((err) => console.log(err));
    } else {
      e.preventDefault();
      alert("Do not leave any fields empty");
    }
  };
  return (
    <>
      <Link id="form-link" to="/">
        <h2 className="text-3xl text-center">Go to Homepage</h2>
      </Link>

      <div className="flex flex-col justify-center items-center mt-10">
        <form className="form mb-10">
          <p id="form-head">Sign In</p>
          <label htmlFor="email-address">
            Email
            <input
              id="email-address"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <button className="btn btn-three" onClick={Check}>
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
