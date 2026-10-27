import api, { apiErrorMessage, saveSession } from "../../api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function CustomerSignInPage() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const navigate = useNavigate();

  const Check = async (e: { preventDefault: () => any }) => {
    e.preventDefault();
    if (email && password) {
      try {
        const result = await api.post("/loginCustomer", { email, password });
        saveSession(result.data);
        navigate("/customerHomePage");
      } catch (error) {
        alert(apiErrorMessage(error, "Sign in failed"));
      }
    } else {
      e.preventDefault();
      alert("Do not leave any fields empty");
    }}
  return (
    <>
    <HeaderBar></HeaderBar>

      <div className="flex flex-col justify-center items-center mt-32">
        <form className="form mb-10 text-cream">
          <p id="form-head" className="my-2">Sign In</p>
          <label htmlFor="email-address">
            Email
            <input id="email-address" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="text-black"></input>
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              className="pl-2 text-black"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <button
                      className="inline-block my-2 rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
                      onClick={Check}
                    >
                      <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> Sign in
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
