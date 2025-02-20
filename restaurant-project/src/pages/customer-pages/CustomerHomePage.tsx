import { Link, useNavigate } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomerBar from "../../components/CustomerBar";
function CustomerHomePage() {

  const customer_id = sessionStorage.getItem('customer_id')
  const [customer,setCustomer] = useState<String>();
  const [representatives, setRepresentatives] = useState<any[]>([])
  useEffect(() => {
    axios
      .get("http://localhost:3001/getCustomer/"+ customer_id)
      .then((result) => {console.log(result.data[0]) //data is being picked as an array value
        setCustomer(result.data[0].first_name)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllRepresentatives")
      .then((result) => setRepresentatives(result.data))
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <>
   <CustomerBar></CustomerBar>

      <p id="gtext" className="text-center text-3xl mt-2">Welcome {customer}</p>
      <p id="gtext" className="text-center text-xl mt-2">Select which restaurant you would like to view</p>

      <div className="flex flex-col justify-center items-center mt-2">
        <div className="card-container">
          <Link to="/restaurantPage" className="card">
            <img className="card-img mb-2" src={restaurantImg}></img>
            <p className="card-title items-center justify-center my-2">Golden Tulip </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CustomerHomePage;
