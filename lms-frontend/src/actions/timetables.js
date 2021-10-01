import {FETCH_TIMETABLE} from "../constants/constant.js";
import * as api from '../api/index.js';

export const uploadTimetable = (timetable) => async (dispatch) => {
    try{
        const res = await api.uploadTimetable(timetable);
        return{...res}
    }catch(error){
        console.log(error);
        return {...error.response}
    }
}

export const getTimetables = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchTimetables();
        dispatch ({type: FETCH_TIMETABLE, payload: data});

    }catch (error){
        console.log("getting timetable error" + error);
    }
}

export const deleteTimetable = (timetableID) => async() => {
    try {
        const res = await api.deleteTimetable(timetableID);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getTimetable = (id) => async() => {
    try {
        const { data } = await api.fetchTimetable(id);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateTimetable = (timetable) => async(dispatch) => {
    try {
        const res = await api.updateTimetable(timetable);
        dispatch(getTimetables())
        return res;
    } catch (error) {
        console.log(error);
        return {...error.response};
    }
}
