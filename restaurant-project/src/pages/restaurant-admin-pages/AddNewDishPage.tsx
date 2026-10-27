import { FormEvent, useEffect, useState } from "react";
import dishImg from "../../assets/dish.jpg";
import SideBar from "../../components/SideBar";
import api, { apiErrorMessage, IMAGE_ACCEPT, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function AddNewDishPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange, clearImage } = useImageSelection();

  useEffect(() => {
    api.get("/getAllCategoriesByRepId/" + sessionStorage.getItem("rep_id"))
      .then((result) => setCategories(result.data))
      .catch((error) => alert(apiErrorMessage(error, "Categories could not be loaded")));
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!dishName || !description || !category || price === "") {
      alert("Please fill in all details to continue");
      return;
    }

    setIsSubmitting(true);
    try {
      const dishImage = selectedFile ? await uploadImage(selectedFile) : undefined;
      await api.post("/createDish", {
        dish_name: dishName,
        dish_image: dishImage,
        description,
        category,
        price,
      });
      alert("You have added a dish successfully");
      setDishName("");
      setDescription("");
      setCategory("");
      setPrice("");
      clearImage();
    } catch (error) {
      alert(apiErrorMessage(error, "Dish could not be added"));
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
            style={{ backgroundImage: `url(${dishImg})` }}
          />
          <main className="management-form-content lg:col-span-7 xl:col-span-6">
            <div className="management-form-panel">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Add a new dish</h1>
              <p className="mt-4 leading-relaxed text-gray-600">Add a dish for customers to view on your menu.</p>
              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={submit}>
                <div className="col-span-6">
                  <label htmlFor="dish-name" className="block text-sm font-medium text-gray-700">Name of Dish</label>
                  <input id="dish-name" type="text" required className="form-field" onChange={(event) => setDishName(event.target.value)} value={dishName} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Dish Description</label>
                  <textarea id="description" required className="form-field min-h-[100px]" onChange={(event) => setDescription(event.target.value)} value={description} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="dish-image" className="block text-sm font-medium text-gray-700">Dish image</label>
                  <input id="dish-image" type="file" accept={IMAGE_ACCEPT} className="form-field file-input-field" onChange={onFileChange} />
                  {previewUrl && <img className="image-preview" src={previewUrl} alt="Selected dish preview" />}
                  <p className="mt-2 text-sm text-gray-600">The selected image is uploaded when you add the dish.</p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select id="category" required className="form-field" onChange={(event) => setCategory(event.target.value)} value={category}>
                    <option value="">Select Dish Category</option>
                    {categories.map((item) => <option key={item._id} value={item._id}>{item.category_name}</option>)}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input id="price" type="number" min="0" step="0.01" required className="form-field" onChange={(event) => setPrice(event.target.value === "" ? "" : Number(event.target.value))} value={price} />
                </div>
                <div className="col-span-6">
                  <button type="submit" disabled={isSubmitting} className="primary-action">{isSubmitting ? "Adding dish..." : "Add Dish"}</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default AddNewDishPage;
