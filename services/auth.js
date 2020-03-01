import {AsyncStorage} from 'react-native';
import {_get, _post, jwtIsPresent, setJwt} from "./api";

const [USER_INFO] = ["USER_INFO"];
export const getUserInfo = async (force=false) => {
  // force true refresca en internet.
  // force false busca el storage.
  if(force) {
    if(jwtIsPresent()) {
      return _get("/users/me");
    }
  } else {
    const data = JSON.parse(await AsyncStorage.getItem(USER_INFO));
    console.log("local storage: data", data);
    if(data) {
      setJwt(data.jwt);
      return data.user;
    }
  }
};

export const sendSms = (phoneNumber) =>
  _post("/users/me", {body: {phone_number:phoneNumber}});

export const verifyCode = (phoneNumber, code) =>
  _post("/users/me/verify", {body: {phone_number:phoneNumber, code}})
    .then(r => {
      setJwt(r.jwt);
      AsyncStorage.setItem(USER_INFO, JSON.stringify(r));
      return r
    });

export const signout = () => AsyncStorage.removeItem(USER_INFO);