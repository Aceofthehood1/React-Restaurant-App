import { FormEvent, useState } from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";
import api, { apiErrorMessage, clearSession, IMAGE_ACCEPT, saveSession, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function RestaurantSignUpPage() {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange } = useImageSelection();
  const navigate = useNavigate();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!restaurantName || !address || !email.includes("@") || password.length < 8) {
      alert("Fill in all details and use a password of at least 8 characters");
      return;
    }

    let accountCreated = false;
    setIsSubmitting(true);
    try {
      const created = await api.post("/createRep", {
        restaurant_name: restaurantName,
        address,
        email,
        password,
      });
      accountCreated = true;

      if (selectedFile) {
        const signedIn = await api.post("/loginRepresentative", { email, password });
        saveSession(signedIn.data);
        const restaurantImage = await uploadImage(selectedFile);
        await api.put("/updateRepresentative/" + created.data.id, { restaurant_image: restaurantImage });
        clearSession();
      }

      alert("You have created an account successfully");
      navigate("/restaurantSignIn");
    } catch (error) {
      clearSession();
      const detail = apiErrorMessage(error, "The request could not be completed");
      if (accountCreated) {
        alert(`Your account was created, but the restaurant image could not be saved. Sign in and retry it from your profile. ${detail}`);
        navigate("/restaurantSignIn");
      } else {
        alert(detail);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeaderBar />
      <div className="flex flex-col items-center justify-center bg-cream px-4 py-10">
        <form className="form mb-10 text-cream" onSubmit={submit}>
          <p id="form-head" className="my-2">Register Account</p>
          <label htmlFor="restaurant-name">Restaurant Name
            <input id="restaurant-name" type="text" required onChange={(event) => setRestaurantName(event.target.value)} className="text-black" value={restaurantName} />
          </label>
          <label htmlFor="address">Address
            <input id="address" type="text" required onChange={(event) => setAddress(event.target.value)} className="text-black" value={address} />
          </label>
          <label htmlFor="email">Email
            <input id="email" type="email" required onChange={(event) => setEmail(event.target.value)} className="text-black" value={email} />
          </label>
          <label htmlFor="password">Password
            <input id="password" type="password" minLength={8} required onChange={(event) => setPassword(event.target.value)} className="text-black" value={password} />
          </label>
          <label htmlFor="restaurant-image">Restaurant Image (optional)
            <input id="restaurant-image" type="file" accept={IMAGE_ACCEPT} onChange={onFileChange} className="text-black" />
          </label>
          {previewUrl && <img className="image-preview" src={previewUrl} alt="Selected restaurant preview" />}
          <button type="submit" disabled={isSubmitting} className="my-3 inline-block rounded border-2 border-cream bg-cream px-4 py-2 text-xs font-medium text-black hover:bg-project-green hover:text-cream">
            <FontAwesomeIcon icon={faUserPlus} /> {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
          <Link id="form-link" to="/restaurantSignIn">Already have an Account? Click here to sign in</Link>
        </form>
      </div>
    </>
  );
}

export default RestaurantSignUpPage;
