import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { apiErrorMessage } from "../../api";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderBar from "../../components/HeaderBar";

function CustomerSignUpPage() {
  
  const [first_name, setFirstName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate()

  const Submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (first_name && surname && email && password && email.includes("@")) {
      try {
        await api.post("/createCustomer", {
          first_name,
          surname,
          email,
          password,
        });
        alert("You have created an account successfully");
        navigate('/customerSignIn');
      } catch (error) {
        alert(apiErrorMessage(error, "Account creation failed"));
      }
    } else {
      alert("Please fill in all details to continue");
    }
  };

  return (
    <>
      <HeaderBar></HeaderBar>

      <div className="flex flex-col justify-center items-center mt-10">
        <form className="form text-cream">
          <p id="form-head" className="my-2">Register Account</p>
          <label htmlFor="first-name">
            First Name
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              className="text-black"
            ></input>
          </label>
          <label htmlFor="surname">
            Surname
            <input
              id="surname"
              type="text"
              placeholder="Surname"
              onChange={(e) => setSurname(e.target.value)}
              className="text-black"
            ></input>
          </label>
          <label htmlFor="email-address">
            Email
            <input
              id="email-address"
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
          <Link id="form-link" to="/customerSignIn">
            Already have an Account? Click here to sign in
          </Link>
        </form>
      </div>
    </>
  );
}

export default CustomerSignUpPage;
