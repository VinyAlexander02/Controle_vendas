import axios from "axios";
import Swal from "sweetalert";

export const createSells = async (payLoad) => {
  try {
    let token = localStorage.getItem("TOKEN_KEY");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.post("http://localhost:3333/sells", payLoad, config);
    Swal("Uhul!", "Venda efetuada com sucesso!", "success");
  } catch (error) {
    console.log(`Erro ${error.message}`);
  }
};

export const getSells = async (client_name, sell_date) => {
  let token = localStorage.getItem("TOKEN_KEY");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { client_name: client_name, sell_date: sell_date },
  };
  return await axios.get("http://localhost:3333/sells", config);
};
