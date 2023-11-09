import { Link } from "react-router-dom";
import restaurantImg from "../assets/restaurant-image.jpg";
import NavBar from "../components/NavBar";
function CustomerHomePage() {
  return (
    <>
    <NavBar></NavBar>
    <div className="flex flex-col justify-center items-center mt-20">
    <div className="card-container">
        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>

        <Link to="#" className="card">
          <img className="card-img" src={restaurantImg}></img>
          <p className="card-title">Golden Tulip</p>
        </Link>
      </div>
    </div>

    </>
  );
}

export default CustomerHomePage;
