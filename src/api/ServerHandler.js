import axios from "axios";
export async function addToServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("AuthDetails"));
  const id = localUser.userID;
  try {
    await axios.post(
      `https://ecomkart-backend.herokuapp.com/user/${id}/${route}`,
      data
    );
  } catch (err) {
    console.error(err);
  }
}

export async function removeFromServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("AuthDetails"));
  const id = localUser.userID;
  try {
    await axios.delete(
      `https://ecomkart-backend.herokuapp.com/user/${id}/${route}`,
      { data: data }
    );
  } catch (err) {
    console.error(err);
  }
}
