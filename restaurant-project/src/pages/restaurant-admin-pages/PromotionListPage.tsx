import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import api from "../../api";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
function PromotionListPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem('rep_id');

  useEffect(() => {
    api
      .get("/getAllPromotionsByRepId/" + rep_id)
      .then((result) => setPromotions(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: any) => {
    api
      .delete("/deletePromotion/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
        <SideBar></SideBar>
      <div className="flex w-full flex-col items-center justify-center mb-5 mt-20 px-4">
          <div className="table-scroll management-table-scroll bg-project-green rounded-lg">
            <table className="management-table divide-y-2 divide-cream border-1 text-sm">
              <thead>
                <tr>
                  <th colSpan={3} className="whitespace-nowrap px-4 py-2 font-medium text-cream text-lg">
                    Promotion Name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {promotions.map((promotion) => (
                      <tr key={promotion._id}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-cream">
                          {promotion.promotion_title}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <Link
                            to={`/editPromotionPage/${promotion._id}`}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
                          >
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>{" "}
                            Edit
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <button
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
                            onClick={(e) => handleDelete(promotion._id)}
                          >
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>{" "}
                            Delete
                          </button>
                        </td>
                      </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}

export default PromotionListPage;
