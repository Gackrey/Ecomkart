import axios from 'axios'

export const AuthApiLogin = async (email, password) => {
    let response = await axios.post('https://ecomkart-backend.herokuapp.com/user/login', {
        email, password
    })
    return response;
};

export const AuthApiSignUp = async (firstname, lastname, email, password, wishList, cartItems) => {
    let response = await axios.post('https://ecomkart-backend.herokuapp.com/user/signup', {
        firstname, lastname, email, password,
        wishlist: wishList,
        cart: cartItems
    })
    return response;
};
