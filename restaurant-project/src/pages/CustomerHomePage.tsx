import { Link } from "react-router-dom";
import restaurantImg from "../assets/restaurant-image.jpg";
function CustomerHomePage() {
  return (
    <>
      <nav className="bg-blue-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
              <div className="flex flex-1">
                <p className="text-3xl">Gh Restaurants</p>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div>
                  <button
                    className=" bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="card-container">
          <Link to="/restaurantPage" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>

          <Link to="#" className="card">
            <img className="card-img" src={restaurantImg}></img>
            <p className="card-title">Golden Tulip</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CustomerHomePage;
