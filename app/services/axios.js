import axios from 'axios';


const Axios = axios.create({
  baseURL: 'https://retour-backend.onrender.com/',
  timeout: 20000,
});





export default Axios;
