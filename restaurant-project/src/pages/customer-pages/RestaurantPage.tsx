import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomerBar from "../../components/CustomerBar";
import { getRepresentativeById } from "../../databaseFunctions";
function RestaurantPage() {
  const {id} = useParams();

  const [promotion_title, setPromotionTitle] = useState<string>();
  const [promotion_image, setPromotionImage] = useState<string>();
  const [description, setDescription] = useState<string>();

  const representative = getRepresentativeById(id);
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
      <div className="flex flex-col justify-center items-center">
        <img className="w-96 rounded-md" src={`../../../backend/${representative.restaurant_image}`}></img>
        <div className="m-4 h-40 w-90 p-5 bg-red-600 rounded-md">
          <p className="text-center text-3xl">New Fish Dish Released</p>
          <p className="text-center text-3xl">
            Enjoy our Yogurt with snacks for cheap
          </p>
          <p className="text-center text-3xl">Meals on Fridays are 50% off</p>
        </div>
      </div>
    </>
  );
}

export default RestaurantPage;
