import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import { imageUrl } from "../../api";
import CustomerBar from "../../components/CustomerBar";
import ImageWithFallback from "../../components/ImageWithFallback";
import { getAllRepresentatives, getCustomerById } from "../../databaseFunctions";

function CustomerHomePage() {
  const customer = getCustomerById(sessionStorage.getItem("customer_id"));
  const representatives = getAllRepresentatives();

  const assignRestaurantId = (id: string) => () => {
    sessionStorage.setItem("restaurant_id", id);
    sessionStorage.removeItem("category_id");
  };

  return (
    <>
      <CustomerBar />
      <main className="min-h-screen w-full bg-cream px-4 py-10 text-[#10243d] sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">Welcome {customer}!</h1>
          <p className="mt-4 text-lg sm:text-xl">Select which restaurant you would like to view</p>
        </header>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {representatives.map((representative) => (
            <Link
              key={representative._id}
              onClick={assignRestaurantId(representative._id)}
              to={`/restaurantPage/${representative._id}`}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-project-green text-cream shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-green"
            >
              <div className="h-56 w-full overflow-hidden bg-project-green sm:h-60">
                <ImageWithFallback
                  className="block h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  src={imageUrl(representative.restaurant_image)}
                  fallbackSrc={restaurantImg}
                  alt={`${representative.restaurant_name} restaurant`}
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-5">
                <h2 className="break-words text-xl font-semibold leading-snug">{representative.restaurant_name}</h2>
                {representative.address && <p className="mt-3 break-words text-sm leading-relaxed sm:text-base">{representative.address}</p>}
                <span className="mt-5 block rounded-md bg-cream px-4 py-3 text-center font-semibold text-[#10243d] transition-colors group-hover:bg-white">
                  View Restaurant
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default CustomerHomePage;
