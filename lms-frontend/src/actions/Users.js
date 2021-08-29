import {FETCH_USERS} from '../constants/constant';
import * as api from '../api/index'
//get all users
export const getUsers = () => async (dispatch) =>{
    try{
        const res = await api.fetchUsers();
        dispatch ({type: FETCH_USERS, payload: res.data})
        return res;
    }catch (error){
        console.log("getting user error" + error);
    }
}

export const deleteUser = (userID) => async() => {
    try {
        const res = await api.deleteUser(userID);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getUser = (userID) => async() => {
    try {
        const { data } = await api.fetchUser(userID);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateUser = (user) => async(dispatch) => {
    try {
        const res = await api.updateUser(user);
        dispatch(getUsers())
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updatePassword = (user) => async() => {
    try {
        const res = await api.updatePassword(user);
        return res;
    } catch (error) {
        return {...error.response};
    }
}