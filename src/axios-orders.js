import axios from 'axios'

const instance = axios.create({
   baseURL: `https://burger-react-app-2d06e.firebaseio.com/`
})

export default instance