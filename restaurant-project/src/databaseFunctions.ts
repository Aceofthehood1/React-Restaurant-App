import axios from "axios";
import { useState, useEffect } from "react";

export function getRepresentativeById(id:any){
    const [restaurant_name, setRestaurantName] = useState<string>();
    const [restaurant_image, setRestaurantImage] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    useEffect(() => {
        axios
          .get("http://localhost:3001/getRepresentative/" + id)
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

      return {"restaurant_name": restaurant_name, "restaurant_image": restaurant_image, address: address, email: email, password: password}
}

export function getAllRepresentatives(){
    const [representatives, setRepresentatives] = useState<any[]>([])
    
    useEffect(() => {
        axios
          .get("http://localhost:3001/getAllRepresentatives")
          .then((result) => {console.log(result.data[0])
            setRepresentatives(result.data)})
          .catch((err) => console.log(err));
      }, []);

      return representatives;
}

export function getCustomerById(id:any){
  const [customer,setCustomer] = useState<String>();
  useEffect(() => {
    axios
      .get("http://localhost:3001/getCustomer/"+ id)
      .then((result) => {console.log(result.data[0]) //data is being picked as an array value
        setCustomer(result.data[0].first_name)
      })
      .catch((err) => console.log(err));
  }, []);
  return customer;
}

export function getAllCustomers(){
  const [customers, setCustomers] = useState<any[]>([])
  
  useEffect(() => {
      axios
        .get("http://localhost:3001/getAllCustomers")
        .then((result) => {console.log(result.data[0])
          setCustomers(result.data)})
        .catch((err) => console.log(err));
    }, []);

    return customers;
}

export function getCategory(id:any){
  const [category,setCategory] = useState<String>();
  useEffect(() => {
    axios
      .get("http://localhost:3001/getCategory/"+ id)
      .then((result) => {console.log(result.data[0]) //data is being picked as an array value
        setCategory(result.data[0].category_name)
      })
      .catch((err) => console.log(err));
  }, []);
  return category;
}

export function getAllCategories(){
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllCategories")
      .then((result) => {console.log(result.data[0])
        setCategories(result.data)})
      .catch((err) => console.log(err));
  }, []);

  return categories;
 
}

export function getAllDishes(){
  const [dishes, setDishes] = useState<any[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllDishes")
      .then((result) => {console.log(result.data[0])
        setDishes(result.data)})
      .catch((err) => console.log(err));
  }, []);

  return dishes;
   
}

export function getAllDishesByRepId(rep_id:any){
  const [dishes, setDishes] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllDishesByRepId/" + rep_id)
      .then((result) => setDishes(result.data))
      .catch((err) => console.log(err));
  }, []);
  return dishes
}

export function getAllDishesByRepIdAndCategoryId(rep_id:any, category:any){
  const [dishes, setDishes] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllDishesByRepIdAndCategoryId/" + rep_id + "/" + category)
      .then((result) => setDishes(result.data))
      .catch((err) => console.log(err));
  }, []);
  return dishes
}

export function getAllCategoriesByRepId(rep_id:any){
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllCategoriesByRepId/" + rep_id)
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);
  return categories
}

export function getAllCategoriesByRepIdAndCategoryId(rep_id:any, category_id:any){
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllCategoriesByRepIdAndCategoryId/" + rep_id +"/" + category_id)
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);
  return categories
}

export function getAllPromotionsByRepId(rep_id:any){
  const [promotions, setPromotions] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllPromotionsByRepId/" + rep_id)
      .then((result) => setPromotions(result.data))
      .catch((err) => console.log(err));
  }, []);
  return promotions
}

export function getAllReservationsByRepId(rep_id:any){
  const [reservations, setReservations] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllReservationsByRepId/" + rep_id)
      .then((result) => setReservations(result.data))
      .catch((err) => console.log(err));
  }, []);
  return reservations
}

export function getAllReservationsByRepIdAndCustomerId(rep_id:any, customer_id:any){
  const [reservations, setReservations] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllReservationsByRepIdAndCustomerId/" + rep_id + "/" + customer_id)
      .then((result) => setReservations(result.data))
      .catch((err) => console.log(err));
  }, []);
  return reservations
}

export function getAllReservationsByCustomerId(customer_id:any){
  const [reservations, setReservations] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllReservationsByCustomerId/" + customer_id)
      .then((result) => setReservations(result.data))
      .catch((err) => console.log(err));
  }, []);
  return reservations
}