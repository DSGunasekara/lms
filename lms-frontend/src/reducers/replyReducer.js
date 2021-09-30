import { FETCH_REPLY, FETCH_SINGLE_REPLY, CREATE_REPLY, UPDATE_REPLY, DELETE_REPLY } from "../constants/constant";

const ReplyReducer = (state = {replies:null, reply:null}, action) =>{
    switch (action.type){
        case CREATE_REPLY:
            return{...state, reply: action?.payload};
        case FETCH_REPLY:
            return {...state, replies: action?.payload};
        case FETCH_SINGLE_REPLY:
            return {...state, replies: action?.payload};
        case UPDATE_REPLY:
            return state;
        case DELETE_REPLY:
            return state;
        default:
            return state;
    }
}

export default ReplyReducer;