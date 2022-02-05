import axios from "axios";

export default axios.create({
  baseURL: "https://webapi20211228172142.azurewebsites.net/api/Groups",
  headers: {
    "Content-Type": "application/json",
  },
});
