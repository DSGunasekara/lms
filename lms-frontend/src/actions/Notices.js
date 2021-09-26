import { FETCH_NOTICE, CREATE_NOTICE, UPDATE_NOTICE, DELETE_NOTICE } from "../constants/constant";
import * as api from '../api/index.js';

//getting all the notices
export const getNotices = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchNotice();
        dispatch ({type: FETCH_NOTICE, payload: data});

    }catch (error){
        console.log("getting an error" + error);
    }
}

//getting a single notice
export const getSingleNotice = (id) => async () =>{
    try{
        const {data} = await api.fetchSingleNotice(id);
        return data;

    }catch (error){
        console.log("getting single notice error" + error);
        return error;
    }
}

//create a notice
export const createNotice = (notice) => async (dispatch) =>{
    try{
        const res = await api.createNotice(notice);
        dispatch ({type: CREATE_NOTICE, payload: res.data})
        return{...res}
    }catch (error){
        console.log("create notice error")
    }
}

//remove single notice
export const removeNotice = (id) => async (dispatch) =>{
    try{
        const res = await api.deleteNotice(id);
        return res;

    }catch (error){
        console.log("delete notice" + error);
    }
}

//update single notice
export const updateSingleNotice = (notice) => async (dispatch) =>{
    try {
        console.log(notice);
        const res = await api.updateNotice(notice);
        dispatch(getNotices())
        return res;
    }catch (error){
        console.log("update notice" + error);
        return error;
    }
}