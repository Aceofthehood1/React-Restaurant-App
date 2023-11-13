import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import restaurantImg from "../assets/restaurant-image.jpg";
function RestaurantPage() {
  return (
    <>
      <NavBar></NavBar>
      <h1 className="text-4xl m-5" id="head">
        Welcome to Restaurant Name
      </h1>
      <div className="flex flex-col justify-center items-center">
        <img className="w-96" src={restaurantImg}></img>
        <div className="m-4 h-40 w-60 bg-red-600">
            <p className="text-center">New Fish Dish Released</p>
        </div>
      </div>
    </>
  );
}

export default RestaurantPage;
