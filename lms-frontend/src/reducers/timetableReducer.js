import {FETCH_TIMETABLE} from "../constants/constant"

const TimetableReducer = (state = {timetables:null}, action) =>{
    switch (action.type){
        case FETCH_TIMETABLE:
            return{...state, timetables:action?.payload};
        default:
            return state;
    }
}

export default TimetableReducer;