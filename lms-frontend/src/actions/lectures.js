import * as api from '../api/index.js';

export const uploadLecture = (lecture) => async () => {
    try{
        const res = await api.uploadLecture(lecture);
        // dispatch({type: UPLOAD_LECTURE, payload:res.data})
        return{...res}
    }catch(error){
        return {...error.response}
    }
}

// export const updateLecture = (Lecture) => async (dispatch) => {
//     try{
//         const res = await api.updateLecture
//     }
// }
