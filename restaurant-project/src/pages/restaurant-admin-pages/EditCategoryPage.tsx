import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import menuImg from "../../assets/menu.png";
import SideBar from "../../components/SideBar";
import api, { apiErrorMessage, imageUrl, IMAGE_ACCEPT, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange } = useImageSelection();

  useEffect(() => {
    api.get("/getCategory/" + id)
      .then((result) => {
        setCategoryName(result.data.category_name || "");
        setCategoryImage(result.data.category_image || "");
      })
      .catch((error) => alert(apiErrorMessage(error, "Category could not be loaded")));
  }, [id]);

  const update = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!categoryName) {
      alert("Please enter a category name to continue");
      return;
    }
    setIsSubmitting(true);
    try {
      const finalImage = selectedFile ? await uploadImage(selectedFile) : categoryImage;
      await api.put("/updateCategory/" + id, { category_name: categoryName, category_image: finalImage });
      alert("You have successfully updated the category");
      navigate("/categoryListPage");
    } catch (error) {
      alert(apiErrorMessage(error, "Category could not be updated"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedImage = previewUrl || imageUrl(categoryImage);

  return (
    <>
      <SideBar />
      <section className="cream representative-form-page">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside
            className="form-page-visual relative lg:order-last lg:col-span-5 xl:col-span-6"
            aria-hidden="true"
            style={{ backgroundImage: `url(${menuImg})` }}
          />
          <main className="management-form-content lg:col-span-7 xl:col-span-6">
            <div className="management-form-panel">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Edit Selected Category</h1>
              <p className="mt-4 leading-relaxed text-gray-600">Change the category name or choose a replacement image.</p>
              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={update}>
                <div className="col-span-6">
                  <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">Name of Category</label>
                  <input id="category-name" type="text" required className="form-field" onChange={(event) => setCategoryName(event.target.value)} value={categoryName} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="category-image" className="block text-sm font-medium text-gray-700">Replace category image</label>
                  <input id="category-image" type="file" accept={IMAGE_ACCEPT} className="form-field file-input-field" onChange={onFileChange} />
                  {displayedImage && <img className="image-preview" src={displayedImage} alt={previewUrl ? "Selected category preview" : "Current category"} />}
                  <p className="mt-2 text-sm text-gray-600">Leave this empty to keep the current image.</p>
                </div>
                <div className="col-span-6">
                  <button type="submit" disabled={isSubmitting} className="primary-action">{isSubmitting ? "Saving category..." : "Save"}</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default EditCategoryPage;
