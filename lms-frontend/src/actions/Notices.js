import { FETCH_NOTICE, CREATE_NOTICE, UPDATE_NOTICE, DELETE_NOTICE } from "../constants/constant";
import * as api from '../api/index.js';

//getting all the notices
export const getNotices = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchNotice();
        dispatch ({type: FETCH_NOTICE, payload: data});

    }catch (error){
        console.log("getting workshop error" + error);
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
export const updateSingleNotice = (id, notice) => async (dispatch) =>{
    try {
        const {data} = await api.updateNotice(id, notice);
        dispatch({type: UPDATE_NOTICE, payload:data})

    }catch (error){
        console.log("update notice" + error);
    }
}