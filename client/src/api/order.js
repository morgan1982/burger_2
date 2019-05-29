import axios from 'axios';

export const firebase = axios.create({
    baseURL: 'https://burger-79fb8.firebaseio.com'
})


// or assign axios.create to an instance and then 
// instance.defaults.headers.common['Authorization] = 'AUTH TOKEN'

export default axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        common: {
            Authorizarion: 'auth token banan'
        }
    }
});