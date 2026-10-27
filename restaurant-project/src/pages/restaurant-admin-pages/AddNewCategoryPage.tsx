import { FormEvent, useState } from "react";
import menuImg from "../../assets/menu.png";
import SideBar from "../../components/SideBar";
import api, { apiErrorMessage, IMAGE_ACCEPT, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function AddNewCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange, clearImage } = useImageSelection();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!categoryName) {
      alert("Please enter a category name to continue");
      return;
    }
    setIsSubmitting(true);
    try {
      const categoryImage = selectedFile ? await uploadImage(selectedFile) : undefined;
      await api.post("/createCategory", { category_name: categoryName, category_image: categoryImage });
      alert("You have added a category successfully");
      setCategoryName("");
      clearImage();
    } catch (error) {
      alert(apiErrorMessage(error, "Category could not be added"));
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
            style={{ backgroundImage: `url(${menuImg})` }}
          />
          <main className="management-form-content lg:col-span-7 xl:col-span-6">
            <div className="management-form-panel">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Add a new dish category</h1>
              <p className="mt-4 leading-relaxed text-gray-600">Categories help customers browse the dishes on your menu.</p>
              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={submit}>
                <div className="col-span-6">
                  <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">Name of Category</label>
                  <input id="category-name" type="text" required className="form-field" onChange={(event) => setCategoryName(event.target.value)} value={categoryName} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="category-image" className="block text-sm font-medium text-gray-700">Category image</label>
                  <input id="category-image" type="file" accept={IMAGE_ACCEPT} className="form-field file-input-field" onChange={onFileChange} />
                  {previewUrl && <img className="image-preview" src={previewUrl} alt="Selected category preview" />}
                  <p className="mt-2 text-sm text-gray-600">The selected image is uploaded when you add the category.</p>
                </div>
                <div className="col-span-6">
                  <button type="submit" disabled={isSubmitting} className="primary-action">{isSubmitting ? "Adding category..." : "Add Category"}</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default AddNewCategoryPage;
