import {FETCH_USERS} from '../constants/constant';
import * as api from '../api/index'
//get all users
export const getUsers = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchUsers();
        dispatch ({type: FETCH_USERS, payload:data})
    }catch (error){
        console.log("getting user error" + error);
    }
}

export const deleteUser = (userID) => async() => {
    try {
        const res = await api.deleteUser(userID);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}