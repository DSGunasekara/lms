import {FETCH_RESULTS} from '../constants/constant';
import * as api from '../api/index'
//get all users
export const getResults = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchResults();
        dispatch ({type: FETCH_RESULTS, payload:data})
    }catch (error){
        console.log("getting results error" + error);
    }
}

export const createResult = (result) => async() => {
    try {
        const res = await api.createResult(result);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteResult = (id) => async() => {
    try {
        const res = await api.deleteResult(id);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getResult = (id) => async() => {
    try {
        const { data } = await api.fetchResult(id);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateResult = (result) => async(dispatch) => {
    try {
        const res = await api.updateResult(result);
        dispatch(getResults())
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}
