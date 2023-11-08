import customerImg from "./assets/customer-image.jpg"; //importing image so it can be used
import restaurantImg from "./assets/restaurant-image.jpg";
import { Link } from "react-router-dom";
function App() {
  return (
    <>
      <h1 className= "text-4xl m-2" id="head">Home Page</h1>
      <div className="flex flex-col justify-center items-center w-10/12" id="home-box">
        <Link to="/customerSignUp" className="link-box">
          <img className="home-image" src={customerImg}></img>
          <p className="text-center text-3xl">Sign in as a customer</p>
        </Link>

        <Link to="/restaurantSignUp" className="link-box">
          <img className="home-image" src={restaurantImg}></img>
          <p className="text-center text-3xl" >Sign in as a Restaurant Representative</p>
        </Link>
      </div>
    </>
  );
}

export default App;
