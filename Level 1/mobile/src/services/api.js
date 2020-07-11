import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;

//adb reverse tcp:3000 tcp:3000
//10.0.2.2
