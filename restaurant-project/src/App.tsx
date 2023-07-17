import customerImg from "./assets/customer-image.jpg"; //importing image so it can be used
import restaurantImg from "./assets/restaurant-image.jpg";
import { Link } from "react-router-dom";
function App() {
  return (
    <>
      <h1 id="head">Home Page</h1>
      <div id="home-box">
        <Link to="/customerSignIn" className="link-box">
          <img className="home-image" src={customerImg}></img>
          <p className="link-text">Sign in as a customer</p>
        </Link>

        <Link to="/customerRegister" className="link-box">
          <img className="home-image" src={restaurantImg}></img>
          <p className="link-text">Sign in as a Restaurant Representative</p>
        </Link>
      </div>
    </>
  );
}

export default App;
