import {FETCH_RESULTS} from "../constants/constant"

const NoticeReducer = (state = {results:null}, action) =>{
    switch (action.type){
        case FETCH_RESULTS:
            return{...state, results:action?.payload};
        default:
            return state;
    }
}

export default NoticeReducer;