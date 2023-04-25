import axios from "axios";

export default {
  authUser(email, senha) {
    return axios.post("/login", {
      email: email,
      senha: senha,
    });
  },
};
