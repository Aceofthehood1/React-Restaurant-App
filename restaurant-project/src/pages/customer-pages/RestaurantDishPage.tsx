import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import CustomerBar from "../../components/CustomerBar";
import { getAllCategoriesByRepId, getAllPromotionsByRepId, getAllDishesByRepId } from "../../databaseFunctions";

function RestaurantDishPage() {

  const rid = sessionStorage.getItem('restaurant_id');
  const categories = getAllCategoriesByRepId(rid);
  const dishes = getAllDishesByRepId(rid);
  //Issue with fetching categories by representative id
  return (
    <>
      <CustomerBar></CustomerBar>
      <h1 className="text-4xl m-5" id="head">
        Food Categories
      </h1>
      <div className="h-full bg-cream">
      <div className="flex flex-row justify-center items-center">
      
      </div>
      
      </div>
      
    </>
  );
}

export default RestaurantDishPage;