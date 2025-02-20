import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";


function RestaurantAdminPage() {
  const rep_id = sessionStorage.getItem("rep_id");
  const [rep, setRep] = useState<String>();
  const img =" 1738589675594-801754356-ball.jpg"
  const [error, setError] = useState();

  const [image, setImage] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getRepresentative/" + rep_id)
      .then((result) => {
        console.log(result.data[0]); //data is being picked as an array value
        setRep(result.data[0].restaurant_name);
      })
      .catch((err) => console.log(err));
  }, []);

  const name = "1738596021602-182109559-Xmen DoFP.jpg"
  let test = imagePath;
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      
    }
  };
  const onFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3001/upload",
          formData
        );
        setImagePath(response.data.filePath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      <SideBar></SideBar>

      <h1 className="text-4xl m-5" id="head">
        Welcome {rep}
      </h1>

      <div className="flex flex-col items-center justify-center">
        <img className="w-96 rounded-md" src={restaurantImg}></img>
        <p className="mt-2 text-md font-semibold text-center sm:text-lg">
          Here, you can make changes on what you want to be displayed on your
          restaurants page
        </p>
      </div>

      <div>
        <h1>Upload Image</h1>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
        <img src={`../../../backend/${test}`} alt="here"></img>
      </div>
      <p>{test} Way</p>

    </>
  );
}

export default RestaurantAdminPage;
