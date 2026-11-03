import { FormEvent, useState } from "react";
import specialImg from "../../assets/special.jpeg";
import SideBar from "../../components/SideBar";
import api, { apiErrorMessage, IMAGE_ACCEPT, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function AddNewPromotionPage() {
  const [promotionTitle, setPromotionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange, clearImage } = useImageSelection();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!promotionTitle || !description) {
      alert("Please fill in all details to continue");
      return;
    }
    setIsSubmitting(true);
    try {
      const promotionImage = selectedFile ? await uploadImage(selectedFile) : undefined;
      await api.post("/createPromotion", { promotion_title: promotionTitle, promotion_image: promotionImage, description });
      alert("You have added a promotion successfully");
      setPromotionTitle("");
      setDescription("");
      clearImage();
    } catch (error) {
      alert(apiErrorMessage(error, "Promotion could not be added"));
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Add a new promotion</h1>
              <p className="mt-4 leading-relaxed text-gray-600">Share a discount, new dish, or special event with customers.</p>
              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={submit}>
                <div className="col-span-6">
                  <label htmlFor="promotion-name" className="block text-sm font-medium text-gray-700">Name of Promotion</label>
                  <input id="promotion-name" type="text" required className="form-field" onChange={(event) => setPromotionTitle(event.target.value)} value={promotionTitle} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="promotion-description" className="block text-sm font-medium text-gray-700">Promotion Description</label>
                  <textarea id="promotion-description" required className="form-field min-h-[100px]" onChange={(event) => setDescription(event.target.value)} value={description} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="promotion-image" className="block text-sm font-medium text-gray-700">Promotion image</label>
                  <input id="promotion-image" type="file" accept={IMAGE_ACCEPT} className="form-field file-input-field" onChange={onFileChange} />
                  {previewUrl && <img className="image-preview" src={previewUrl} alt="Selected promotion preview" />}
                  <p className="mt-2 text-sm text-gray-600">The selected image is uploaded when you add the promotion.</p>
                </div>
                <div className="col-span-6">
                  <button type="submit" disabled={isSubmitting} className="primary-action">{isSubmitting ? "Adding promotion..." : "Add Promotion"}</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default AddNewPromotionPage;
