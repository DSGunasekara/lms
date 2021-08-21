import * as api from '../api/index.js';

export const uploadLecture = (lecture) => async (dispatch) => {
    try{
        const res = await api.uploadLecture(lecture);
        dispatch({type: UPLOAD_LECTURE, payload:res.data})
        return{...res}
    }catch(error){
        console.log("Uploding lecture" + error)
        return {...error}
    }
}

export const updateLecture = (Lecture) => async (dispatch) => {
    try{
        const res = await api.updateLecture
    }
}

