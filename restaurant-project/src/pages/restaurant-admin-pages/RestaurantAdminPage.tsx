import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
function RestaurantAdminPage() {
  const rep_id = sessionStorage.getItem('rep_id')
  const [rep,setRep] = useState<String>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getRepresentative/"+ rep_id)
      .then((result) => {console.log(result.data[0]) //data is being picked as an array value
        setRep(result.data[0].restaurant_name)
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Welcome {rep}
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
