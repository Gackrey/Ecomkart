import axios from 'axios'
const AddDataToServer = async( wishList,cartItems) => {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    const id = loginStatus?.userID;
    if (id) {
        try {
            await axios.post(`https://ecomkart-backend.herokuapp.com/user/${id}`, {
                wishlist: wishList,
                cart: cartItems
            });
        } catch(err) {
            console.error("Error",err);
        }
    }
}

export default AddDataToServer;
