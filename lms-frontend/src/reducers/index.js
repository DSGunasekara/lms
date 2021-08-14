import { combineReducers } from 'redux';

import auth from './authReducer';
import ModuleReducer from './Modules';

export default combineReducers({ auth, ModuleReducer });
