import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
function RestaurantPage() {
  return (
    <>
      <NavBar></NavBar>
      <h1 className="text-4xl m-5" id="head">
        Welcome to [Restaurant Name]
      </h1>
      <div className="flex flex-col justify-center items-center">
        <img className="w-96 rounded-md" src={restaurantImg}></img>
        <div className="m-4 h-40 w-90 p-5 bg-red-600 rounded-md">
          <p className="text-center text-3xl">New Fish Dish Released</p>
          <p className="text-center text-3xl">
            Enjoy our Yogurt with snacks for cheap
          </p>
          <p className="text-center text-3xl">Meals on Fridays are 50% off</p>
        </div>
      </div>
    </>
  );
}

export default RestaurantPage;
