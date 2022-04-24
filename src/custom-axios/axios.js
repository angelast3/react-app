import axios from "axios";

const instance = axios.create({
    baseURL: 'https://library-springboot-193199.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;
