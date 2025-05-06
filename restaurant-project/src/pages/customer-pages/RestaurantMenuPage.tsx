import { Link } from "react-router-dom";
import allDishesImg from "../../assets/alldishes.jpg";
import CustomerBar from "../../components/CustomerBar";
import {
  getAllCategoriesByRepId,
  getAllPromotionsByRepId,
  getAllDishesByRepId,
  getAllCategoriesByRepIdAndCategoryId,
  getAllDishesByRepIdAndCategoryId,
} from "../../databaseFunctions";
import { useState } from "react";

function RestaurantMenuPage() {
  const rid = sessionStorage.getItem("restaurant_id");
  let cid = sessionStorage.getItem("category_id");
  const categories = getAllCategoriesByRepId(rid);
  const dishes = getAllDishesByRepId(rid);
  const dishbyRepIdAndCatId = getAllDishesByRepIdAndCategoryId(rid, cid);

  const assignCategoryId =
    (id: string) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      sessionStorage.setItem("category_id", id);
      cid = sessionStorage.getItem("category_id");
      window.location.reload();
    };
  const reset = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    sessionStorage.removeItem("category_id");
    cid = sessionStorage.getItem("category_id");
    window.location.reload();
  };
  //Issue with fetching categories by representative id
  return (
    <>
      <CustomerBar></CustomerBar>
      <h1 className="text-4xl m-5" id="head">
        Food Categories
      </h1>
      <div className="h-full bg-cream">
        <div className="flex flex-row justify-center items-center">
          <div className="card-container">
            <Link onClick={reset} to="" className="card">
              <img className="card-img mb-2" src={allDishesImg}></img>
              <p className="card-title items-center justify-center my-2">All</p>
            </Link>
            {categories.map((category) => {
              return (
                <>
                  <Link
                    onClick={assignCategoryId(category._id)}
                    to=""
                    className="card"
                  >
                    <img
                      className="card-img mb-2"
                      src={`../../../backend/${category.category_image}`}
                    ></img>
                    <p className="card-title items-center justify-center my-2">
                      {category.category_name}
                    </p>
                  </Link>
                </>
              );
            })}
          </div>
        </div>

        <h1 className="text-4xl m-5" id="head">
          Food
        </h1>
        <div className="flex flex-row justify-center items-center">
          <div className="card-container">
            {cid == null
              ? dishes.map((dish) => {
                  //checks to see if category id is null if it is all dishes will show if not, the dishes will be filtered.
                  return (
                    <>
                      <Link to="#" className="card text-cream">
                        <img
                          className="card-img mb-2"
                          src={`../../../backend/${dish.dish_image}`}
                        ></img>
                        <p className="card-title items-center justify-center my-1">
                          {dish.dish_name}
                        </p>
                        <p className="text-lg items-center text-center">
                          GHC {dish.price}.00
                        </p>
                        <p className="text-sm text-cream text-center p-2">
                          {dish.description}
                        </p>
                      </Link>
                    </>
                  );
                })
              : dishbyRepIdAndCatId.map((dish) => {
                  return (
                    <>
                      <Link to="#" className="card text-cream">
                        <img
                          className="card-img mb-2"
                          src={`../../../backend/${dish.dish_image}`}
                        ></img>
                        <p className="card-title items-center justify-center my-1">
                          {dish.dish_name}
                        </p>
                        <p className="text-lg items-center text-center">
                          GHC {dish.price}.00
                        </p>
                        <p className="text-sm text-cream text-center p-2">
                          {dish.description}
                        </p>
                      </Link>
                    </>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantMenuPage;
