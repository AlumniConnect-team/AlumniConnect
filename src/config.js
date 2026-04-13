import axios from "axios";

const API = axios.create({
  baseURL: "https://alumniserver-augm.onrender.com",
});

export default API;
