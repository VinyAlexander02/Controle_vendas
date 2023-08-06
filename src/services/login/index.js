import axios from "axios";
import { handleErrors } from "../../common/utils/handlers/handleErrors";

async function login(payLoad) {
  try {
    const response = await axios.post("http://localhost:3333/session", payLoad);

    if (response.data.user && response.data.token) {
      localStorage.setItem("TOKEN_KEY", response.data.token);
    }

    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export default login;
