import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import specialImg from "../../assets/special.jpeg";
import SideBar from "../../components/SideBar";
import api, { apiErrorMessage, imageUrl, IMAGE_ACCEPT, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function EditPromotionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotionTitle, setPromotionTitle] = useState("");
  const [promotionImage, setPromotionImage] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange } = useImageSelection();

  useEffect(() => {
    api.get("/getPromotion/" + id)
      .then((result) => {
        setPromotionTitle(result.data.promotion_title || "");
        setPromotionImage(result.data.promotion_image || "");
        setDescription(result.data.description || "");
      })
      .catch((error) => alert(apiErrorMessage(error, "Promotion could not be loaded")));
  }, [id]);

  const update = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!promotionTitle || !description) {
      alert("Please fill in all details to continue");
      return;
    }
    setIsSubmitting(true);
    try {
      const finalImage = selectedFile ? await uploadImage(selectedFile) : promotionImage;
      await api.put("/updatePromotion/" + id, { promotion_title: promotionTitle, promotion_image: finalImage, description });
      alert("You have successfully updated the promotion");
      navigate("/promotionListPage");
    } catch (error) {
      alert(apiErrorMessage(error, "Promotion could not be updated"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedImage = previewUrl || imageUrl(promotionImage);

  return (
    <>
      <SideBar />
      <section className="cream representative-form-page">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside
            className="form-page-visual relative lg:order-last lg:col-span-5 xl:col-span-6"
            aria-hidden="true"
            style={{ backgroundImage: `url(${specialImg})` }}
          />
          <main className="management-form-content lg:col-span-7 xl:col-span-6">
            <div className="management-form-panel">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Edit Selected Promotion</h1>
              <p className="mt-4 leading-relaxed text-gray-600">Change the promotion details or choose a replacement image.</p>
              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={update}>
                <div className="col-span-6">
                  <label htmlFor="promotion-name" className="block text-sm font-medium text-gray-700">Name of Promotion</label>
                  <input id="promotion-name" type="text" required className="form-field" onChange={(event) => setPromotionTitle(event.target.value)} value={promotionTitle} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="promotion-description" className="block text-sm font-medium text-gray-700">Promotion Description</label>
                  <textarea id="promotion-description" required className="form-field min-h-[100px]" onChange={(event) => setDescription(event.target.value)} value={description} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="promotion-image" className="block text-sm font-medium text-gray-700">Replace promotion image</label>
                  <input id="promotion-image" type="file" accept={IMAGE_ACCEPT} className="form-field file-input-field" onChange={onFileChange} />
                  {displayedImage && <img className="image-preview" src={displayedImage} alt={previewUrl ? "Selected promotion preview" : "Current promotion"} />}
                  <p className="mt-2 text-sm text-gray-600">Leave this empty to keep the current image.</p>
                </div>
                <div className="col-span-6">
                  <button type="submit" disabled={isSubmitting} className="primary-action">{isSubmitting ? "Saving promotion..." : "Save"}</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default EditPromotionPage;
