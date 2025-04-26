import { Link, useNavigate } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomerBar from "../../components/CustomerBar";
import { getAllRepresentatives, getCustomerById } from "../../databaseFunctions";
function CustomerHomePage() {
  
  const customer_id = sessionStorage.getItem('customer_id');

  const customer = getCustomerById(customer_id);

  const representatives = getAllRepresentatives();
  
  const assignRestaurantId = (id: string) =>(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    sessionStorage.setItem('restaurant_id', id)  
  }
  
  return (
    <>
   <CustomerBar></CustomerBar>

      <p id="gtext" className="text-center text-3xl mt-10">Welcome {customer}</p>
      <p id="gtext" className="text-center text-xl mt-8">Select which restaurant you would like to view</p>

      <div className="flex flex-col justify-center items-center mt-2">
        <div className="card-container">
        {representatives.map((representative) => {
                return (<>
                  <Link onClick={assignRestaurantId(representative._id)} to={`/restaurantPage/${representative._id}`} className="card">
                  <img className="card-img mb-2" src={`../../../backend/${representative.restaurant_image}`}></img>
                  <p className="card-title items-center justify-center my-2">{representative.restaurant_name}</p>
          </Link>
                </>);
                })}
        </div>
      </div>
    </>
  );
}

export default CustomerHomePage;
