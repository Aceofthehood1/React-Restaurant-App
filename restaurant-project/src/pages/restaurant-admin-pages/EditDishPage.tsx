import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dishImg from "../../assets/dish.jpg";
import SideBar from "../../components/SideBar";
import api, { apiErrorMessage, imageUrl, IMAGE_ACCEPT, uploadImage } from "../../api";
import useImageSelection from "../../useImageSelection";

function EditDishPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [dishName, setDishName] = useState("");
  const [dishImage, setDishImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedFile, previewUrl, onFileChange } = useImageSelection();

  useEffect(() => {
    api.get("/getAllCategoriesByRepId/" + sessionStorage.getItem("rep_id"))
      .then((result) => setCategories(result.data))
      .catch((error) => alert(apiErrorMessage(error, "Categories could not be loaded")));
    api.get("/getDish/" + id)
      .then((result) => {
        setDishName(result.data.dish_name || "");
        setDishImage(result.data.dish_image || "");
        setDescription(result.data.description || "");
        setCategory(result.data.category || "");
        setPrice(result.data.price ?? "");
      })
      .catch((error) => alert(apiErrorMessage(error, "Dish could not be loaded")));
  }, [id]);

  const update = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!dishName || !description || !category || price === "") {
      alert("Please fill in all details to continue");
      return;
    }

    setIsSubmitting(true);
    try {
      const finalImage = selectedFile ? await uploadImage(selectedFile) : dishImage;
      await api.put("/updateDish/" + id, {
        dish_name: dishName,
        description,
        dish_image: finalImage,
        category,
        price,
      });
      alert("You have successfully updated the dish");
      navigate("/dishListPage");
    } catch (error) {
      alert(apiErrorMessage(error, "Dish could not be updated"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedImage = previewUrl || imageUrl(dishImage);

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
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Edit Selected Dish</h1>
              <p className="mt-4 leading-relaxed text-gray-600">Change the dish details or choose a replacement image.</p>
              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={update}>
                <div className="col-span-6">
                  <label htmlFor="dish-name" className="block text-sm font-medium text-gray-700">Name of Dish</label>
                  <input id="dish-name" type="text" required className="form-field" onChange={(event) => setDishName(event.target.value)} value={dishName} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Dish Description</label>
                  <textarea id="description" required className="form-field min-h-[100px]" onChange={(event) => setDescription(event.target.value)} value={description} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="dish-image" className="block text-sm font-medium text-gray-700">Replace dish image</label>
                  <input id="dish-image" type="file" accept={IMAGE_ACCEPT} className="form-field file-input-field" onChange={onFileChange} />
                  {displayedImage && <img className="image-preview" src={displayedImage} alt={previewUrl ? "Selected dish preview" : "Current dish"} />}
                  <p className="mt-2 text-sm text-gray-600">Leave this empty to keep the current image.</p>
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
                  <button type="submit" disabled={isSubmitting} className="primary-action">{isSubmitting ? "Saving dish..." : "Save"}</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default EditDishPage;
