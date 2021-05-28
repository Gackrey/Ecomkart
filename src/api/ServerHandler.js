import axios from "axios";
export async function addToServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("AuthDetails"));
  const token = localUser.userID;
  try {
    await axios.post(`https://ecomkart-backend.herokuapp.com/user/${route}`, data, {
      headers: { authorization: token },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function removeFromServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("AuthDetails"));
  const token = localUser.userID;
  try {
    await axios.delete(`https://ecomkart-backend.herokuapp.com/user/${route}`, {
      headers: { authorization: token },
      data,
    });
  } catch (err) {
    console.error(err);
  }
}
