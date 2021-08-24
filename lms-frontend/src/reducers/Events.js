import { FETCH_EVENT, FETCH_SINGLE_EVENT, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../constants/constant";

const EventReducer = (state = {events:null, event:null}, action) =>{
    switch (action.type){
        case CREATE_EVENT:
            return{...state, event: action?.payload};
        case FETCH_EVENT:
            return {...state, events: action?.payload};
        case FETCH_SINGLE_EVENT:
            return {...state, events: action?.payload};
        case UPDATE_EVENT:
            return state;
        case DELETE_EVENT:
            return state;
        default:
            return state;
    }
}

export default EventReducer;