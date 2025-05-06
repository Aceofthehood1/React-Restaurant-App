import { Link, useNavigate } from "react-router-dom";
import reservationImg from "../../assets/reservation.png";
import CustomerBar from "../../components/CustomerBar";
import {
  getAllCategoriesByRepId,
  getAllDishesByRepId,
} from "../../databaseFunctions";
import { integer } from "aws-sdk/clients/cloudfront";
import { useState } from "react";
import axios from "axios";

function RestaurantReservationPage() {
  const navigate = useNavigate();
  const rid = sessionStorage.getItem("restaurant_id");
  const categories = getAllCategoriesByRepId(rid);
  const dishes = getAllDishesByRepId(rid);
  const customer_id = sessionStorage.getItem("customer_id");
  
  const rep_id = rid
  const [date, setDate] = useState<String>();
  const [time, setTime] = useState<String>();
  const [visitors, setVisitors] = useState<integer>();

  const Submit = (e: { preventDefault: () => void }) => {
    if (rid && customer_id && date && time && visitors) {
      axios
        .post("http://localhost:3001/createReservation", {
          rep_id,
          customer_id,
          date,
          time,
          visitors,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      alert("You have successfully made a Reservation");
      navigate("/viewReservationsPage");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };
  
  return (
    <>
      <CustomerBar></CustomerBar>
      <section className="bg-cream">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={reservationImg}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div>
                <h1 className="text-4xl m-5" id="head">
                  Set Up a Reservation
                </h1>
                <form className="flex flex-col w-[500px]">
                  <label className="m-2 text-lg">
                    Select Date for Reservation:
                    <input
                      type="date"
                      className="input border-project-green ml-3"
                      onChange={(e) => setDate(new Date(e.target.value).toLocaleDateString('en-GB'))}
                    />
                  </label>
                  <label className="m-2 text-lg">
                    Select Time for Reservation:
                    <input
                      type="time"
                      className="input border-project-green ml-3"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </label>
                  <label className="m-2 text-lg">
                    Enter the number of people:
                    <input
                      type="Number"
                      className="input border-project-green ml-3 w-20"
                      placeholder="5"
                      onChange={(e) => setVisitors(Number(e.target.value))}
                    />
                  </label>
                  <button
                    type="submit"
                    className="text-cream inline-block shrink-0 mt-2 rounded-md border green px-12 py-3 text-sm font-medium transition hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus:ring"
                    onClick={Submit}
                  >
                    Make Reservation
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default RestaurantReservationPage;
