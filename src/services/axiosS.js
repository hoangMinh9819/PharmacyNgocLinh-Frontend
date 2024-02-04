import axios from 'axios';
const axiosS = axios.create({
        baseURL:'http://localhost:8080/'
})
export default axiosS;