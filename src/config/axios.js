import axios from 'axios'

const clienteAxios = axios.create({
    baseURL : 'http://192.168.1.114:10001'
})

export default clienteAxios