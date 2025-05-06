import CustomerBar from "../../components/CustomerBar";
import {
  getAllDishesByRepId,
  getAllReservationsByCustomerId,
  getAllRepresentatives,
} from "../../databaseFunctions";
import {
  faCalendar,
  faClock,
  faUserGroup,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function formatToAMPM(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hourNum = parseInt(hours, 10);
  const ampm = hourNum >= 12 ? "PM" : "AM";
  const hour12 = hourNum % 12 || 12; // Convert 0 to 12 for 12AM
  return `${hour12}:${minutes} ${ampm}`;
}

function ViewReservationPage() {
  const rid = sessionStorage.getItem("restaurant_id");
  const customer_id = sessionStorage.getItem("customer_id");
  const reservations = getAllReservationsByCustomerId(customer_id);
  const representatives = getAllRepresentatives();
  //Issue with fetching categories by representative id
  return (
    <>
      <CustomerBar></CustomerBar>
      <section className="bg-cream">
        <div className="flex flex-col items-center justify-center mb-5 mt-20 ">
          <div className="overflow-x-auto bg-project-green rounded-lg">
          {reservations.length != 0 ? (
              <><table className="divide-y-2 divide-cream border-1 text-sm text-cream">
              <thead className="text-center text-3xl">
                <td className="whitespace-nowrap px-8 py-2 font-medium">
                  <FontAwesomeIcon icon={faUtensils} /> Restaurant
                </td>
                <td className="whitespace-nowrap px-8 py-2 font-medium">
                  <FontAwesomeIcon icon={faCalendar} /> Date
                </td>
                <td className="whitespace-nowrap px-8 py-2 font-medium">
                  <FontAwesomeIcon icon={faClock} /> Time
                </td>
                <td className="whitespace-nowrap px-8 py-2 font-medium">
                  <FontAwesomeIcon icon={faUserGroup} /> Visitors
                </td>
              </thead>
              {reservations.map((reservation) => {
                let name = "";
                representatives.map((representative) => {
                  if (reservation.rep_id == representative._id) {
                    name = representative.restaurant_name;
                  }
                });
                return (
                  <>
                    <tbody className="divide-y divide-black text-cream text-xl">
                      <tr className="text-center">
                        <td className="whitespace-nowrap px-4 py-2">
                          {
                            name /*Show reservation data together with restaurant data*/
                          }
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {
                            reservation.date /*Show reservation data together with restaurant data*/
                          }
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {
                            formatToAMPM(
                              reservation.time
                            ) /*Show reservation data together with restaurant data*/
                          }
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {
                            reservation.visitors /*Show reservation data together with restaurant data*/
                          }
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table></> ) : (
              <h1 className="text-4xl m-5 text-cream" id="head">
                No Reservations
              </h1>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewReservationPage;
