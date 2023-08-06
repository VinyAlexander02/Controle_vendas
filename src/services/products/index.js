import axios from "axios";
import Swal from "sweetalert";

export const createProducts = async (payLoad) => {
  try {
    let token = localStorage.getItem("TOKEN_KEY");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.post("http://localhost:3333/products", payLoad, config);
    Swal("Uhul!", "Produto cadastrado com sucesso!", "success");
  } catch (error) {
    console.log(error);
    Swal("Ops!", "Já existe um produto com esse código cadastrado!", "error");
  }
};

export const getProducts = async () => {
  try {
    let token = localStorage.getItem("TOKEN_KEY");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get("http://localhost:3333/products", config);
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const getProductByCode = async (productCode) => {
  try {
    let token = localStorage.getItem('TOKEN_KEY');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `http://localhost:3333/products/${productCode}`;
    const response = await axios.get(url, config);
    return response.data ? [response.data] : [];
  } catch (error) {
    console.log({ error: error.message });
    return [];
  }
};

