import { FETCH_EVENT, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../constants/constant";
import * as api from '../api/index.js';

//getting all the events
export const getEvents = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchEvent();
        dispatch ({type: FETCH_EVENT, payload: data});

    }catch (error){
        console.log("getting workshop error" + error);
    }
}

//getting a single event
export const getSingleEvent = (id) => async () =>{
    try{
        const {data} = await api.fetchSingleEvent(id);
        return data;

    }catch (error){
        console.log("getting single event error" + error);
        return error;
    }
}

//create a event
export const createEvent = (event) => async (dispatch) =>{
    try{
        const res = await api.createEvent(event);
        dispatch ({type: CREATE_EVENT, payload: res.data})
        return{...res}
    }catch (error){
        console.log("create event error")
    }
}

//remove single event
export const removeEvent = (id) => async (dispatch) =>{
    try{
        const res = await api.deleteEvent(id);
        return res;

    }catch (error){
        console.log("delete event" + error);
    }
}

//update single event
export const updateSingleEvent = (event) => async (dispatch) =>{
    try {
        const res = await api.updateEvent(event);
        dispatch(getEvents())
        return res;
    }catch (error){
        console.log("update event" + error);
        return error;
    }
}