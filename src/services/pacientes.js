import axios from "axios";

export default {
  getPacientes() {
    return axios.get("/pacientes");
  },
};
