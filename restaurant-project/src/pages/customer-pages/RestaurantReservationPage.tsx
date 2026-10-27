import { useNavigate } from "react-router-dom";
import reservationImg from "../../assets/reservation.png";
import CustomerBar from "../../components/CustomerBar";
import { useState } from "react";
import api, { apiErrorMessage } from "../../api";

function RestaurantReservationPage() {
  const navigate = useNavigate();
  const rid = sessionStorage.getItem("restaurant_id");
  const customer_id = sessionStorage.getItem("customer_id");

  const rep_id = rid
  const [date, setDate] = useState<String>();
  const [time, setTime] = useState<String>();
  const [visitors, setVisitors] = useState<number>();

  const Submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (rid && customer_id && date && time && visitors) {
      try {
        await api.post("/createReservation", {
          rep_id,
          customer_id,
          date,
          time,
          visitors,
        });
        alert("You have successfully made a Reservation");
        navigate("/viewReservationsPage");
      } catch (error) {
        alert(apiErrorMessage(error, "Reservation could not be created"));
      }
    } else {
      alert("Please fill in all details to continue");
    }
  };

  return (
    <>
      <CustomerBar></CustomerBar>
      <section className="reservation-page">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="form-page-visual relative lg:order-last lg:col-span-5 xl:col-span-6">
            <img
              alt="Restaurant reservation table"
              src={reservationImg}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="reservation-content lg:col-span-7 xl:col-span-6">
            <div className="reservation-panel">
                <h1>Set Up a Reservation</h1>
                <p>Choose a date, time and number of people for your reservation.</p>
                <form className="reservation-form" onSubmit={Submit}>
                  <label htmlFor="reservation-date">
                    Select Date for Reservation
                    <input
                      id="reservation-date"
                      type="date"
                      required
                      onChange={(e) => setDate(new Date(e.target.value).toLocaleDateString('en-GB'))}
                    />
                  </label>
                  <label htmlFor="reservation-time">
                    Select Time for Reservation
                    <input
                      id="reservation-time"
                      type="time"
                      required
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </label>
                  <label htmlFor="reservation-visitors">
                    Enter the number of people
                    <input
                      id="reservation-visitors"
                      type="number"
                      min="1"
                      max="100"
                      required
                      placeholder="5"
                      onChange={(e) => setVisitors(Number(e.target.value))}
                    />
                  </label>
                  <button
                    type="submit"
                    className="primary-action"
                  >
                    Make Reservation
                  </button>
                </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default RestaurantReservationPage;
