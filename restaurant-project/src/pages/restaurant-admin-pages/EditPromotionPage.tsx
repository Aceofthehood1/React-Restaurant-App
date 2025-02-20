import { Link, useNavigate, useParams } from "react-router-dom";
import specialImg from "../../assets/special.jpeg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
function EditPromotionPage() {
  const {id} = useParams()
  const [promotion_title, setPromotionTitle] = useState<string>();
  const [promotion_image, setPromotionImage] = useState<string>();
  const [description, setDescription] = useState<string>();

  //Image related
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string>();
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPromotion/"+ id)
      .then((result) => {console.log(result.data)
        setPromotionTitle(result.data.promotion_title)
        setPromotionImage(result.data.promotion_image)
        setDescription(result.data.description)
      })
      .catch((err) => console.log(err));
  }, []);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const onFileUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      setPromotionImage(imagePath);
      try {
        const response = await axios.post(
          "http://localhost:3001/upload",
          formData
        );
        setImagePath(response.data.filePath);
        setPromotionImage(response.data.filePath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const Update = (e: { preventDefault: () => void }) =>{
    e.preventDefault()
    if (promotion_title && description) {
      axios
        .put("http://localhost:3001/updatePromotion/"+id, {
          promotion_title,
          promotion_image,
          description,
        })
        .then((result) => {console.log(result)
          navigate('/promotionListPage')
        } )
        .catch((err) => console.log(err));
      alert("You have successfully updated the promotion");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  }
  return (
    <>
        <SideBar></SideBar>

      <section className="cream">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={specialImg}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Edit Selected Promotion
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Here, you can make changes to the selcted Promotion and this will be relected on the main page. Make sure to not leave any fields empty!
              </p>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="dish_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name of Promotion
                  </label>
                  <input
                    id="promotion-name"
                    type="text"
                    placeholder="Enter the Promotion Name"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setPromotionTitle(e.target.value)}
                    value={promotion_title}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="promotion-description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Promotion Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe the Promotion"
                    className="mt-1 w-full h-[100px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="promotion_image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Upload Image for the Promotion{" "}
                  </label>
                  <input
                    id="promotion-image"
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={onFileChange}
                  />
                   <img src={`../../../backend/${promotion_image}`}></img>
                  <button 
                  className="text-cream inline-block shrink-0 mt-2 rounded-md border green px-12 py-3 text-sm font-medium transition hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus:ring"
                  onClick={onFileUpload}>Save Image</button>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="text-cream inline-block shrink-0 rounded-md border green px-12 py-3 text-sm font-medium transition hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus:ring"
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

export default EditPromotionPage;