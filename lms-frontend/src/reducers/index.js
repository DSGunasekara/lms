import { combineReducers } from 'redux';

import auth from './authReducer';
import module from './Modules';

export default combineReducers({ auth, module });
