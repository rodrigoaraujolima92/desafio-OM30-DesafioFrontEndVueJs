import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export default {
  getPacientes() {
    return axios.get("/pacientes");
  },
};
