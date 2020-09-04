import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
        // "Sec-Fetch-Mode": 'no-cors',
        // 'Access-Control-Allow-Origin': 'http://localhost:4200'
    },
    // mode: 'no-cors'
})