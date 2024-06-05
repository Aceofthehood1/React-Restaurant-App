import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
function RestaurantAdminPage() {
  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Welcome [Admin User Name]
      </h1>
      <div className="sm:flex relative mb-10 lg:absolute">
        <SideBar></SideBar>
      </div>

    <div className="flex flex-col items-center justify-center">
    <img className="w-96 rounded-md" src={restaurantImg}></img>
    <p>Here you can make changes on what you want to be displayed on your page</p>
    </div>
      
    </>
  );
}

export default RestaurantAdminPage;
