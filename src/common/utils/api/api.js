import axios from "axios";

export const axiosDefault = () => {
    const token = localStorage.getItem('TOKEN_KEY');
    const configs = {
        baseURL: `http://localhost:3333/`,
        headers: {
            Authorization: token ? `Bearer${token}` : undefined,
            withCredencials: true,
        },
    }
    return axios.create(configs)
}