import { Link, useNavigate } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";


function RestaurantAdminPage() {
  const rep_id = sessionStorage.getItem("rep_id");
  const [restaurant_name, setRestaurantName] = useState<string>();
  const [restaurant_image, setRestaurantImage] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getRepresentative/" + rep_id)
      .then((result) => {
        console.log(result.data[0]); //data is being picked as an array value
        setRestaurantName(result.data[0].restaurant_name);
        setRestaurantImage(result.data[0].restaurant_image);
        setEmail(result.data[0].email);
        setAddress(result.data[0].address);
        setPassword(result.data[0].password);
      })
      .catch((err) => console.log(err));
  }, []);

  let test = imagePath;
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

      try {
        const response = await axios.post(
          "http://localhost:3001/upload",
          formData
        );
        setImagePath(response.data.filePath);
        setRestaurantImage(response.data.filePath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const Update = (e: { preventDefault: () => void }) =>{
    if (restaurant_name && address && email && password) {
      axios
        .put("http://localhost:3001/updateRepresentative/"+rep_id, {
          restaurant_name,
          restaurant_image,
          address,
          email,
          password
        })
        .then((result) => {console.log(result)
          navigate('/restaurantAdminPage')
        } )
        .catch((err) => console.log(err));
      alert("You have successfully updated your restaurant user details");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  }

  return (
    <>
      <SideBar></SideBar>

    
      <h1 className="text-4xl m-5" id="head">
        Welcome {restaurant_name}
      </h1>
      <h2 className="text-2xl m-5" id="head">
        Address: {address}
      </h2>
      <div className="flex flex-col items-center justify-center bg-cream">
      <p className="mt-2 text-md font-semibold text-center sm:text-xl">
          Here, you can make changes on what you want to be displayed on your
          restaurants page
        </p>
      { restaurant_image ? <img className="w-96 rounded-md mt-10" src={`../../../backend/${restaurant_image}`}></img> : <><p className="text-xl text-project-indigo mt-6">User has not added restaurant image yet!</p></> }
        <h2 className="text-3xl mt-10">Setup Restaurant Details</h2>

        <form className="mt-8 mb-10 grid grid-cols-6 gap-6 w-1/3">
                <div className="col-span-6">
                  <label
                    htmlFor="restaurant_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name of Restaurant
                  </label>
                  <input
                    id="restaurant_name"
                    type="text"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setRestaurantName(e.target.value)}
                    value={restaurant_name}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
                
                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="text"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="dish_image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Upload Image of the Restaurant{" "}
                  </label>
                  <input
                    id="dish-image"
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={onFileChange}
                  />
                  { restaurant_image ? <><p>File Path: {restaurant_image}</p></> : ""}
                  <button 
                  className="text-cream inline-block shrink-0 mt-2 rounded-md border green px-12 py-3 text-sm font-medium transition hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus:ring"
                  onClick={onFileUpload}>Save Image</button>
                  <br></br>
                  <button 
                  className="text-cream inline-block shrink-0 mt-10 rounded-md border green px-12 py-3 text-sm font-medium transition hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus:ring"
                  onClick={Update}>Update</button>
                </div>
                </form>
      </div>
      


{/*}
    image setup
      <div>
        <h1>Upload Image</h1>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
        <img src={`../../../backend/${test}`} alt="here"></img>
      </div>
      <p>{test} Way</p>
{*/}
    </>
  );
}

export default RestaurantAdminPage;
