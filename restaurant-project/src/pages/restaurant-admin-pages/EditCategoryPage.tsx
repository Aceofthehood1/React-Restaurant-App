import { Link, useNavigate, useParams } from "react-router-dom";
import menuImg from "../../assets/menu.png";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
function EditCategoryPage() {
  const { id } = useParams();
  const [category_name, setCategoryName] = useState<string>();
  const [category_image, setCategoryImage] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getCategory/" + id)
      .then((result) => {
        console.log(result.data);
        setCategoryName(result.data.category_name);
        setCategoryImage(result.data.category_image);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (category_name) {
      axios
        .put("http://localhost:3001/updateCategory/" + id, {
          category_name,
        })
        .then((result) => {
          console.log(result);
          navigate("/categoryListPage");
        })
        .catch((err) => console.log(err));
      alert("You have successfully updated the category");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };

  return (
    <>
      <SideBar></SideBar>

      <section className="bg-cream">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={menuImg}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Edit Selected Category
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Here, you can edit the categories incase you want to make
                changes to either the image or the category name. Make sure to
                not leave any fields empty!
              </p>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="dish_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name of Category
                  </label>
                  <input
                    id="category-name"
                    type="text"
                    placeholder="Enter the Categories Name"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={category_name}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="dish_image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Upload Image of Category{" "}
                  </label>
                  <input
                    id="category-image"
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setCategoryImage(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="text-cream inline-block shrink-0 rounded-md border bg-project-green px-12 py-3 text-sm font-medium transition hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus:ring"
                    onClick={Update}
                  >
                    Save
                  </button>
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
