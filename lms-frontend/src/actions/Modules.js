import {FETCH_MODULE, FETCH_SINGLE_MODULE, CREATE_MODULE, UPDATE_MODULE, DELETE_MODULE} from "../constants/constant.js";
import * as api from '../api/index.js';

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
export const getSingleModule = (id) => async (dispatch) =>{
    try{
        const  {data} = await api.fetchSingleModule(id);
        dispatch ({type: FETCH_SINGLE_MODULE, payload: data});

    }catch (error){
        console.log("getting single module error" + error)
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
        await api.deleteModule(id);
        dispatch({type:DELETE_MODULE, payload: id})
    }catch (error){
        console.log("delete module" + error);
    }
}

//update single module
export const updateSingleModule = (id, module) => async (dispatch) =>{
    try {
        const {data} = await api.updateModules(id, module);
        dispatch({type: UPDATE_MODULE, payload:data})

    }catch (error){
        console.log("update module" + error);
    }
}