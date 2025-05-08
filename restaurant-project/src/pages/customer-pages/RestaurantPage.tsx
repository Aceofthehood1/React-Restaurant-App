import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomerBar from "../../components/CustomerBar";
import {
  getRepresentativeById,
  getAllPromotionsByRepId,
} from "../../databaseFunctions";
function RestaurantPage() {
  const { id } = useParams();

  const [promotion_title, setPromotionTitle] = useState<string>();
  const [promotion_image, setPromotionImage] = useState<string>();
  const [description, setDescription] = useState<string>();

  const representative = getRepresentativeById(id);
  const promotions = getAllPromotionsByRepId(id);
  //Image related
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string>();

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

  return (
    <>
      <CustomerBar></CustomerBar>
      <h1 className="text-4xl m-5" id="head">
        Welcome to {representative.restaurant_name} 
      </h1>

      {promotions.map((promotion) => {
        return (
          <>
              <div className="flex flex-col justify-center items-center bg-cream">
                <div className="m-4 w-[500px] p-5 bg-red-600 rounded-md">
                  <p className="text-center text-3xl m-4">
                    {promotion.promotion_title}
                  </p>
                  <img
                    className="w-full aspect-video rounded-md m-4"
                    src={`../../../backend/${promotion.promotion_image}`}
                  ></img>
                  <p className="text-center text-2xl">
                    {promotion.description}
                  </p>
                </div>
              </div>
          </>
        );
      })}
    </>
  );
}

export default RestaurantPage;
