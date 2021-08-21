import { FETCH_NOTICE, CREATE_NOTICE, UPDATE_NOTICE, DELETE_NOTICE } from "../constants/constant";

const NoticeReducer = (state = {notices:null, notice:null}, action) =>{
    switch (action.type){
        case CREATE_NOTICE:
            return{...state, notice: action?.payload};
        case FETCH_NOTICE:
            return {...state, notices: action?.payload};
        case UPDATE_NOTICE:
            return state;
        case DELETE_NOTICE:
            return state;
        default:
            return state;
    }
}

export default NoticeReducer;