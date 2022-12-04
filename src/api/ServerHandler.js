import axios from "axios";
import {API_URL} from '../Constants'

export async function addToServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("AuthDetails"));
  const token = localUser.userID;
  try {
    await axios.post(`${API_URL}/user/${route}`, data, {
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
    await axios.delete(`${API_URL}/user/${route}`, {
      headers: { authorization: token },
      data,
    });
  } catch (err) {
    console.error(err);
  }
}
