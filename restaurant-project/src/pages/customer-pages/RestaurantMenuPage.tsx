import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
function RestaurantMenuPage() {
  return (
    <>
      <NavBar></NavBar>
      <h1 className="text-4xl m-5" id="head">
        Food Categories
      </h1>
      <div className="flex flex-row justify-center items-center">
      <div className="card-container">
      <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Lunch</p>
        </Link>

        <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Dinner</p>
        </Link>

        <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Brunch</p>
        </Link>

        </div>
      </div>

      <h1 className="text-4xl m-5" id="head">
        Food
      </h1>
      <div className="flex flex-row justify-center items-center">
      <div className="card-container">
      <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Lunch</p>
        </Link>

        <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Dinner</p>
        </Link>

        <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Brunch</p>
        </Link>

        </div>
      </div>
    </>
  );
}

export default RestaurantMenuPage;
