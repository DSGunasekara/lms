import {FETCH_TASK} from '../constants/constant';
import * as api from '../api/index'


export const getTask = (id) => async () =>{
    try{
        const {data} = await api.fetchTask(id);
        return data;
    }catch (error){
        console.log("getting result error" + error);
    }
}

export const createTask = (task) => async() => {
    try {
        const res = await api.createTask(task);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const getTasks = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchTask();
        dispatch ({type: FETCH_TASK, payload:data})
    }catch (error){
        console.log("getting results error" + error);
    }
}


