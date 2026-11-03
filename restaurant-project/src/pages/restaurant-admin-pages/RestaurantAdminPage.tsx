import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import restaurantPlaceholder from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import api, { apiErrorMessage, imageUrl, IMAGE_ACCEPT, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function RestaurantAdminPage() {
  const navigate = useNavigate();
  const representativeId = sessionStorage.getItem("rep_id");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantImage, setRestaurantImage] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange } = useImageSelection();

  useEffect(() => {
    api.get("/me")
      .then((result) => {
        setRestaurantName(result.data.restaurant_name || "");
        setRestaurantImage(result.data.restaurant_image || "");
        setEmail(result.data.email || "");
        setAddress(result.data.address || "");
      })
      .catch((error) => alert(apiErrorMessage(error, "Restaurant profile could not be loaded")));
  }, []);

  const update = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!restaurantName || !address || !email) {
      alert("Please fill in all required details to continue");
      return;
    }
    setIsSubmitting(true);
    try {
      const finalImage = selectedFile ? await uploadImage(selectedFile) : restaurantImage;
      const result = await api.put("/updateRepresentative/" + representativeId, {
        restaurant_name: restaurantName,
        restaurant_image: finalImage,
        address,
        email,
        ...(password ? { password } : {}),
      });
      setRestaurantImage(result.data.restaurant_image || finalImage);
      setPassword("");
      alert("You have successfully updated your restaurant details");
      navigate("/restaurantAdminPage");
    } catch (error) {
      alert(apiErrorMessage(error, "Restaurant details could not be updated"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedImage = previewUrl || imageUrl(restaurantImage) || restaurantPlaceholder;
  const usePlaceholder = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = restaurantPlaceholder;
  };

  return (
    <>
      <SideBar />
      <main className="min-h-[calc(100vh-4rem)] w-full bg-cream px-4 py-6 text-[#10243d] sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-5xl">
          <section className="grid overflow-hidden rounded-lg bg-project-green text-cream shadow-md md:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)]">
            <img className="block h-64 w-full object-cover object-center sm:h-80 md:h-full md:min-h-80" src={displayedImage} onError={usePlaceholder} alt={`${restaurantName || "Restaurant"} profile`} />
            <div className="flex min-w-0 flex-col justify-center px-5 py-6 text-center md:px-8 md:text-left">
              <h1 className="break-words text-3xl font-semibold leading-tight sm:text-4xl">Welcome {restaurantName}</h1>
              <p className="mt-3 break-words text-lg sm:text-xl">{address}</p>
            </div>
          </section>
          <p className="mx-auto my-6 max-w-3xl text-center text-base leading-relaxed sm:text-lg">Here, you can make changes on what you want to be displayed on your restaurant page.</p>

          <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Restaurant management shortcuts">
            <Link className="group flex min-h-20 min-w-0 items-center justify-between gap-4 rounded-lg border border-project-green/20 bg-white px-5 py-4 font-semibold text-[#10243d] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-project-green hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-green" to="/dishListPage">
              <span className="break-words">Manage Dishes</span><span className="text-2xl text-project-green transition-transform group-hover:translate-x-1" aria-hidden="true">&rsaquo;</span>
            </Link>
            <Link className="group flex min-h-20 min-w-0 items-center justify-between gap-4 rounded-lg border border-project-green/20 bg-white px-5 py-4 font-semibold text-[#10243d] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-project-green hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-green" to="/categoryListPage">
              <span className="break-words">Manage Categories</span><span className="text-2xl text-project-green transition-transform group-hover:translate-x-1" aria-hidden="true">&rsaquo;</span>
            </Link>
            <Link className="group flex min-h-20 min-w-0 items-center justify-between gap-4 rounded-lg border border-project-green/20 bg-white px-5 py-4 font-semibold text-[#10243d] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-project-green hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-green" to="/addNewPromotionPage">
              <span className="break-words">Add New Promotion</span><span className="text-2xl text-project-green transition-transform group-hover:translate-x-1" aria-hidden="true">&rsaquo;</span>
            </Link>
            <Link className="group flex min-h-20 min-w-0 items-center justify-between gap-4 rounded-lg border border-project-green/20 bg-white px-5 py-4 font-semibold text-[#10243d] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-project-green hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-green" to="/viewCustomerReservationsPage">
              <span className="break-words">View Reservations</span><span className="text-2xl text-project-green transition-transform group-hover:translate-x-1" aria-hidden="true">&rsaquo;</span>
            </Link>
          </nav>

          <section className="mx-auto mt-14 max-w-2xl">
            <h2 className="mb-6 text-center text-2xl font-semibold sm:text-3xl">Setup Restaurant Details</h2>
            <form className="grid grid-cols-6 gap-5" onSubmit={update}>
              <div className="col-span-6">
                <label htmlFor="restaurant-name" className="block text-sm font-medium text-gray-700">Name of Restaurant</label>
                <input id="restaurant-name" type="text" required className="form-field" onChange={(event) => setRestaurantName(event.target.value)} value={restaurantName} />
              </div>
              <div className="col-span-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input id="address" type="text" required className="form-field" onChange={(event) => setAddress(event.target.value)} value={address} />
              </div>
              <div className="col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" required className="form-field" onChange={(event) => setEmail(event.target.value)} value={email} />
              </div>
              <div className="col-span-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password (leave blank to keep the current password)</label>
                <input id="password" type="password" minLength={8} className="form-field" onChange={(event) => setPassword(event.target.value)} value={password} />
              </div>
              <div className="col-span-6">
                <label htmlFor="restaurant-image" className="block text-sm font-medium text-gray-700">Replace restaurant image</label>
                <input id="restaurant-image" type="file" accept={IMAGE_ACCEPT} className="form-field file-input-field" onChange={onFileChange} />
                <p className="mt-2 text-sm text-gray-600">Leave this empty to keep the current image. A replacement is uploaded when you update the profile.</p>
              </div>
              <div className="col-span-6">
                <button type="submit" disabled={isSubmitting} className="primary-action">{isSubmitting ? "Updating profile..." : "Update"}</button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default RestaurantAdminPage;
