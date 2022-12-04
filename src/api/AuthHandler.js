import axios from 'axios'
import {API_URL} from '../Constants'

export const AuthApiLogin = async (email, password) => {
    let response = await axios.post(`${API_URL}/user/login`, {
        email, password
    })
    return response;
};

export const AuthApiSignUp = async (firstname, lastname, email, password) => {
    let response = await axios.post(`${API_URL}/user/signup`, {
        firstname, lastname, email, password,
        wishlist: [],
        cart: [],
        addresses: []
    })
    return response;
};
