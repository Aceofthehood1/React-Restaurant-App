import { faCalendar, faClock, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../../components/SideBar";
import { getAllCustomers, getAllReservationsByRepId } from "../../databaseFunctions";

function formatToAMPM(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hourNum = parseInt(hours, 10);
  return `${hourNum % 12 || 12}:${minutes} ${hourNum >= 12 ? "PM" : "AM"}`;
}

function ViewCustomerReservationsPage() {
  const reservations = getAllReservationsByRepId(sessionStorage.getItem("rep_id"));
  const customers = getAllCustomers();

  return (
    <>
      <SideBar />
      <main className="table-page">
        <div className="table-scroll reservation-table">
          {reservations.length ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faUser} /> Customer</th>
                  <th><FontAwesomeIcon icon={faCalendar} /> Date</th>
                  <th><FontAwesomeIcon icon={faClock} /> Time</th>
                  <th><FontAwesomeIcon icon={faUserGroup} /> Visitors</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => {
                  const customer = customers.find((item) => item._id === reservation.customer_id);
                  return (
                    <tr key={reservation._id}>
                      <td>{customer ? `${customer.first_name} ${customer.surname}` : "Customer"}</td>
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

export default ViewCustomerReservationsPage;
