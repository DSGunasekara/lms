import {FETCH_MODULE, FETCH_SINGLE_MODULE, CREATE_MODULE, UPDATE_MODULE, DELETE_MODULE} from "../constants/constant.js";
import * as api from '../api/index.js';
import {updateModules} from "../api/index.js";

//getting all the modules
export const getModules = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchModules();
        dispatch ({type: FETCH_MODULE, payload: data});

    }catch (error){
        console.log("getting workshop error" + error);
    }
}

//getting a single module
export const getSingleModule = (id) => async () =>{
    try{
        const  {data} = await api.fetchSingleModule(id);
        return data;

    }catch (error){
        console.log("getting single module error" + error);
    }
}

//create a module
export const createModules = (module) => async (dispatch) =>{
    try{
        const res = await api.createModules(module);
        dispatch ({type: CREATE_MODULE, payload: res.data})
        return{...res}
    }catch (error){
        console.log("create module error")
    }
}

//remove single module
export const removeModule = (id) => async (dispatch) =>{
    try{
        const res = await api.deleteModule(id);
        return res;

    }catch (error){
        console.log("delete module" + error);
    }
}

//update single module
export const updateSingleModule = (module) => async (dispatch) =>{
    try {
        console.log(module);
        const res = await api.updateModules(module);
        dispatch(getModules())
        return res;

    }catch (error){
        console.log("update module" + error);
    }
}