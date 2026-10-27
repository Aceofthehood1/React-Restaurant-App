import { useParams } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import specialImg from "../../assets/special.jpeg";
import { imageUrl } from "../../api";
import CustomerBar from "../../components/CustomerBar";
import ImageWithFallback from "../../components/ImageWithFallback";
import { getAllPromotionsByRepId, getRepresentativeById } from "../../databaseFunctions";

function RestaurantPage() {
  const { id } = useParams();
  const representative = getRepresentativeById(id);
  const promotions = getAllPromotionsByRepId(id);

  return (
    <>
      <CustomerBar />
      <main className="min-h-screen w-full bg-cream px-4 py-10 text-[#10243d] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-center text-3xl font-semibold sm:text-4xl">Welcome to {representative.restaurant_name}</h1>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-project-green shadow-md">
            <ImageWithFallback className="block h-64 w-full object-cover object-center sm:h-80" src={imageUrl(representative.restaurant_image)} fallbackSrc={restaurantImg} alt={`${representative.restaurant_name || "Restaurant"} profile`} />
          </div>

          {promotions.length > 0 && (
            <section className="mt-14" aria-labelledby="promotions-heading">
              <h2 id="promotions-heading" className="mb-8 text-center text-3xl font-semibold sm:text-4xl">Promotions</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {promotions.map((promotion) => (
                  <article key={promotion._id} className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-project-green text-cream shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                    <div className="h-56 w-full overflow-hidden bg-project-green sm:h-60">
                      <ImageWithFallback className="block h-full w-full object-cover object-center" src={imageUrl(promotion.promotion_image)} fallbackSrc={specialImg} alt={promotion.promotion_title} />
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-5 text-center">
                      <h3 className="break-words text-xl font-semibold leading-snug">{promotion.promotion_title}</h3>
                      {promotion.description && <p className="mt-4 break-words text-sm leading-relaxed sm:text-base">{promotion.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default RestaurantPage;
