import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-my-burger-bf676.firebaseio.com/",
});

export default instance;