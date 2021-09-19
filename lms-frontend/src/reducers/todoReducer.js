import {FETCH_TASK} from "../constants/constant"

const TaskReducer = (state = {results:null}, action) =>{
    switch (action.type){
        case FETCH_TASK:
            return{...state, results:action?.payload};
        default:
            return state;
    }
}

export default TaskReducer;