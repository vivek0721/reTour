import axios from 'axios';


const Axios = axios.create({
  baseURL: 'http://192.168.1.9:8000/',
  timeout: 20000,
});





export default Axios;
