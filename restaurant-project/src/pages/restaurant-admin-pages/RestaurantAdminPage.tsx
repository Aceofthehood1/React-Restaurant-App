import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
function RestaurantAdminPage() {
  const rep_id = sessionStorage.getItem('rep_id')
  const [rep,setRep] = useState<String>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getRepresentative/"+ rep_id)
      .then((result) => {console.log(result.data[0]) //data is being picked as an array value
        setRep(result.data[0].restaurant_name)
      })
      .catch((err) => console.log(err));
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
  
          // Log the formData to see if it contains the file
          console.log(Array.from(formData.entries()));
  
          try {
              const response = await axios.post('/api/upload', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              console.log('Image uploaded successfully:', response.data);
          } catch (error) {
              console.error('Error uploading image:', error);
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
    <p className="mt-2 text-md font-semibold text-center sm:text-lg" >Here, you can make changes on what you want to be displayed on your restaurants page</p>
    </div>

     <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button className="special-button" type="submit"><span>Upload Image</span></button>
        </form>

    </>
  );
}

export default RestaurantAdminPage;
