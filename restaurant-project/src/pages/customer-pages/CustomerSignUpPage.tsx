import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";

function CustomerSignUpPage() {
  
  const [first_name, setFirstName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate()

  const Submit = (e: { preventDefault: () => void }) => {
    if (first_name && surname && email && password && email.includes("@")) {
      axios
        .post("http://localhost:3001/createCustomer", {
          first_name,
          surname,
          email,
          password,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      alert("You have created an account successfully");
      navigate('/customerSignIn')
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };

  return (
    <>
      <h1 className="text-5xl text-center">Customer Sign Up Page</h1>

      <Link id="form-link" to="/">
        <h2 className="text-3xl text-center">Go to Homepage</h2>
      </Link>

      <div className="flex flex-col justify-center items-center mt-10">
        <form className="form mb-10">
          <p id="form-head">Register Account</p>
          <label htmlFor="first-name">
            First Name
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </label>
          <label htmlFor="surname">
            Surname
            <input
              id="surname"
              type="text"
              placeholder="Surname"
              onChange={(e) => setSurname(e.target.value)}
            ></input>
          </label>
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
          <button onClick={Submit} className="btn btn-three">
            <span>Sign Up</span>
          </button>
          <Link id="form-link" to="/customerSignIn">
            Already have an Account? Click here to sign in
          </Link>
        </form>
      </div>
    </>
  );
}

export default CustomerSignUpPage;
