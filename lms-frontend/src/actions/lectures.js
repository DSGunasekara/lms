import {FETCH_LECTURE, CREATE_LECTURE, UPDATE_LECTURE} from "../constants/constant.js";
import * as api from '../api/index.js';
import {getLecture} from "../api/index.js";

export const uploadLecture = (lecture) => async (dispatch) => {
    try{
        const res = await api.uploadLecture(lecture);
        //dispatch ({type: CREATE_LECTURE, payload:res.data})
        console.log(lecture);
        return{...res}
    }catch(error){
        console.log(error);
        return {...error.response}
    }
}

export const getLectures = () => async (dispatch) =>{
    try{
        const {data} = await api.fetchLectures();
        dispatch ({type: FETCH_LECTURE, payload: data});
        console.log(data);

    }catch (error){
        console.log("getting lecture error" + error);
    }
}

export const deleteLecture = (lectureID) => async() => {
    try {
        const res = await api.deleteLecture(lectureID);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// export const getLecture = (id) => async() => {
//     try {
//         const { data } = await api.fetchLecture(id);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

export const updateLecture = (lecture) => async(dispatch) => {
    try {
        const res = await api.updateLecture(lecture);
        dispatch(getLectures())
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}
