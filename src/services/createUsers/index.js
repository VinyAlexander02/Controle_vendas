import axios from "axios";
import Swal from "sweetalert";

export const createUsers = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/createUser",
      payload
    );

    Swal("Uhul!", "Usuário criado com Sucesso!", "success");
    return response.data;
  } catch (error) {
    throw error;
  }
};
