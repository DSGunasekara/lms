  import {FETCH_MODULE, FETCH_SINGLE_MODULE, CREATE_MODULE, UPDATE_MODULE, DELETE_MODULE} from "../constants/constant";

const ModuleReducer = (state = {modules:null, module:null}, action) =>{
    switch (action.type){
        case CREATE_MODULE:
            return{...state, module: action?.payload};
        case FETCH_MODULE:
            return {...state, modules: action?.payload};
        case FETCH_SINGLE_MODULE:
            return {...state, module: action?.payload};
        case UPDATE_MODULE:
            return state;
        case DELETE_MODULE:
            return state;
        default:
            return state;
    }
}

export default ModuleReducer;