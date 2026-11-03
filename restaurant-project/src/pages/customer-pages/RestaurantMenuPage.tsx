
import allDishesImg from "../../assets/alldishes.jpg";
import dishImg from "../../assets/dish.jpg";
import { imageUrl } from "../../api";
import CustomerBar from "../../components/CustomerBar";
import ImageWithFallback from "../../components/ImageWithFallback";

import {
  getAllCategoriesByRepId,
  getAllDishesByRepId,
  getAllDishesByRepIdAndCategoryId,
} from "../../databaseFunctions";

function RestaurantMenuPage() {
  const restaurantId = sessionStorage.getItem("restaurant_id");
  const categoryId = sessionStorage.getItem("category_id");

  const categories = getAllCategoriesByRepId(restaurantId);
  const dishes = getAllDishesByRepId(restaurantId);

  const filteredDishes = getAllDishesByRepIdAndCategoryId(
    restaurantId,
    categoryId
  );

  const visibleDishes = categoryId ? filteredDishes : dishes;

  const chooseCategory = (id: string) => {
    sessionStorage.setItem("category_id", id);
    window.location.reload();
  };

  const resetCategory = () => {
    sessionStorage.removeItem("category_id");
    window.location.reload();
  };

  return (
    <>
      <CustomerBar />

      <main className="min-h-screen w-full bg-cream px-4 py-10 text-[#10243d] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* FOOD CATEGORIES */}
          <section aria-labelledby="categories-heading">
            <h1
              id="categories-heading"
              className="mb-8 text-center text-3xl font-semibold sm:text-4xl"
            >
              Food Categories
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* ALL CATEGORIES */}
              <button
                type="button"
                onClick={resetCategory}
                aria-pressed={!categoryId}
                className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-project-green text-left text-cream shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-green ${
                  !categoryId
                    ? "ring-2 ring-project-green ring-offset-2 ring-offset-cream"
                    : ""
                }`}
              >
                <div className="h-52 w-full overflow-hidden bg-project-green sm:h-56">
                  <img
                    src={allDishesImg}
                    alt="All food categories"
                    className="block h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex min-h-[68px] flex-1 items-center px-5 py-4">
                  <h2 className="text-xl font-semibold">
                    All
                  </h2>
                </div>
              </button>

              {/* RESTAURANT CATEGORIES */}
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => chooseCategory(category._id)}
                  aria-pressed={categoryId === category._id}
                  className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-project-green text-left text-cream shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-green ${
                    categoryId === category._id
                      ? "ring-2 ring-project-green ring-offset-2 ring-offset-cream"
                      : ""
                  }`}
                >
                  <div className="h-52 w-full overflow-hidden bg-project-green sm:h-56">
                    <ImageWithFallback
                      src={imageUrl(category.category_image)}
                      fallbackSrc={allDishesImg}
                      alt={`${category.category_name} category`}
                      className="block h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex min-h-[68px] flex-1 items-center px-5 py-4">
                    <h2 className="break-words text-xl font-semibold">
                      {category.category_name}
                    </h2>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* DISHES */}
          <section
            aria-labelledby="dishes-heading"
            className="mt-14 sm:mt-20"
          >
            <h2
              id="dishes-heading"
              className="mb-8 text-center text-3xl font-semibold sm:text-4xl"
            >
              Dishes
            </h2>

            {visibleDishes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {visibleDishes.map((dish) => (
                  <article
                    key={dish._id}
                    className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-project-green text-cream shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* DISH IMAGE */}
                    <div className="h-56 w-full overflow-hidden bg-project-green sm:h-60">
                      <ImageWithFallback
                        src={imageUrl(dish.dish_image)}
                        fallbackSrc={dishImg}
                        alt={dish.dish_name}
                        className="block h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* DISH DETAILS */}
                    <div className="flex flex-1 flex-col px-5 py-5 text-center">

                      <h3 className="break-words text-xl font-semibold leading-snug">
                        {dish.dish_name}
                      </h3>

                      <p className="mt-3 text-lg font-semibold">
                        GHC {Number(dish.price).toFixed(2)}
                      </p>

                      {dish.description && (
                        <p className="mt-4 break-words text-sm leading-relaxed sm:text-base">
                          {dish.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-lg">
                No dishes are available in this category yet.
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default RestaurantMenuPage;
