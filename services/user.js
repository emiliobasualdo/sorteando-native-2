import {_delete, _get, _post} from "./api";

const participate = (drawId) => _post('/users/me/draws', {body:{drawId}});
const stopParticipating = (drawId) => _delete(`/users/me/draws/${drawId}`);

export const User = (user, setUser) => {
    console.log("user = ", user);
    if(!user) return user;

    user.participate = (drawId) =>
      participate(drawId)
        .then(user => setUser(user));
    user.stopParticipating = (drawId) =>
      stopParticipating(drawId)
        .then(user => setUser(user));
    return user;
};

