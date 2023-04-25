import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export default {
  authUser(email, senha) {
    return axios.post("/login", {
      email: email,
      senha: senha,
    });
  },
};
