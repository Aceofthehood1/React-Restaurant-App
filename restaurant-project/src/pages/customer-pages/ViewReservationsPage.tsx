import { faCalendar, faClock, faUserGroup, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerBar from "../../components/CustomerBar";
import { getAllReservationsByCustomerId, getAllRepresentatives } from "../../databaseFunctions";

function formatToAMPM(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hourNum = parseInt(hours, 10);
  return `${hourNum % 12 || 12}:${minutes} ${hourNum >= 12 ? "PM" : "AM"}`;
}

function ViewReservationPage() {
  const reservations = getAllReservationsByCustomerId(sessionStorage.getItem("customer_id"));
  const representatives = getAllRepresentatives();

  return (
    <>
      <CustomerBar />
      <main className="table-page">
        <div className="table-scroll reservation-table">
          {reservations.length ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faUtensils} /> Restaurant</th>
                  <th><FontAwesomeIcon icon={faCalendar} /> Date</th>
                  <th><FontAwesomeIcon icon={faClock} /> Time</th>
                  <th><FontAwesomeIcon icon={faUserGroup} /> Visitors</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => {
                  const restaurant = representatives.find((item) => item._id === reservation.rep_id);
                  return (
                    <tr key={reservation._id}>
                      <td>{restaurant?.restaurant_name || "Restaurant"}</td>
                      <td>{reservation.date}</td>
                      <td>{formatToAMPM(reservation.time)}</td>
                      <td>{reservation.visitors}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : <p className="empty-table-message">No Reservations</p>}
        </div>
      </main>
    </>
  );
}

export default ViewReservationPage;
