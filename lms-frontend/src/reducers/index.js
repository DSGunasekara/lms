import { combineReducers } from 'redux';

import auth from './authReducer';
import ModuleReducer from './Modules';
import UserReducer from "./Users";
import LectureReducer from './Reducer.Lectures';

export default combineReducers({ auth, ModuleReducer, UserReducer, LectureReducer });
