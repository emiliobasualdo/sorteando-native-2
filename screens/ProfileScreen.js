import React from 'react';
import LogInView from './LogInView';
import UserProfileView from './UserProfileView';
import {useAuth} from "../services/use-auth";

export default function ProfileView(props) {
  const {user} = useAuth();
  if(user) {
    return <UserProfileView {...props}/>;
  } else {
    return <LogInView {...props}/>
  }
}
