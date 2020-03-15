import React, {useState, createContext, useContext, useEffect} from 'react'
import {
    getUserInfo,
    sendSms as _sendSms,
    verifyCode as _verifyCode,
    signout as _signout,
} from "./auth";
import {User} from "./user";
import {Text} from "react-native";

// https://kentcdodds.com/blog/authentication-in-react-applications

const UserContext = createContext();
export const useAuth = () => useContext(UserContext);

export function UserProvider(props) {
    const [user, _setUser] = useState();
    const setUser = (user) => _setUser(User(user, setUser));

    const refreshUser = () =>
      getUserInfo(true)
        .then(user => setUser(user));

    useEffect(() => {
        //console.log("user set to:", user);
    }, [user]);
    
    useEffect(() => {
        // code for pre-loading the user's information if we have their token in
        // localStorage goes here
        if(!user) {
            getUserInfo()
              .then(user => setUser(user))
              .then(() => refreshUser());
        }
    } , []);
    
    const sendSms = async (phoneNumber) => _sendSms(phoneNumber);

    const verifyCode = async (phoneNumber, code) =>
      _verifyCode(phoneNumber, code)
        .then(data => setUser(User(data.user))); // data tiene jwt y más

    const signout = async () => {
        await _signout();
        setUser();
    };

    // note, I'm not bothering to optimize this `value` with React.useMemo here
    // because this is the top-most component rendered in our app and it will very
    // rarely re-render/cause a performance problem.
    return <UserContext.Provider value={{user, sendSms, verifyCode, signout, refreshUser}} {...props} />
}