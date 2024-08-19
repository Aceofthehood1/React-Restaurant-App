import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function CustomerSignInPage() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const navigate = useNavigate();

  const Check = (e: { preventDefault: () => any }) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("http://localhost:3001/loginCustomer", { email, password })
        .then((result) => {
          console.log(result);
          if(result.data[0] == "Logged in Successfully") {
            //from backend the result value is taken and checked to see if user was able to login successfully if it was possible they are redirected to a different page
            sessionStorage.setItem('customer_id',result.data[1])  //Creates session storage and sets value to representatives id
            navigate("/customerHomePage");
          }else if(result.data == "The password is incorrect"){
            alert("The password is incorrect")
          }else {
            alert("Email does not exist");
          }
        })
        .catch((err) => console.log(err));
    } else {
      e.preventDefault();
      alert("Do not leave any fields empty");
    }}
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
            <input id="email-address" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              className="pl-2"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
            <button onClick={Check}>
              <span>Sign Up</span>
            </button>
          <Link id="form-link" to="/customerSignUp">
            Dont have an account? Click here to sign up
          </Link>
        </form>
      </div>
    </>
  );
}

export default CustomerSignInPage;
