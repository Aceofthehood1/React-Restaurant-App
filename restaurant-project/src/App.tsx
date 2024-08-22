import customerImg from "./assets/customer-image.jpg"; //importing image so it can be used
import restaurantImg from "./assets/restaurant-image.jpg";
import { Link } from "react-router-dom";
function App() {
  return (
    <>
      <h1 className= "text-5xl m-2" id="head">Home</h1>
      <div className="flex flex-row justify-center items-center mt-10 mb-20" id="home-box">
      <Link to="/customerSignUp" className="link-box mr-10 transition duration-300 hover:-translate-y-4">
          <img className="home-image rounded-[7.5px]" src={customerImg}></img>
          <p className="text-center text-3xl">Sign in as a customer</p>
        </Link>
      
        <Link to="/restaurantSignUp" className="link-box transition duration-300 hover:-translate-y-4">
          <img className="home-image rounded-[7.5px]" src={restaurantImg}></img>
          <p className="text-center text-3xl" >Sign in as a Restaurant Representative</p>
        </Link>
      </div>
    </>
  );
}

export default App;
