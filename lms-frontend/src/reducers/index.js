import { combineReducers } from 'redux';

import auth from './authReducer';
import ModuleReducer from './Modules';
import UserReducer from "./Users";
import NoticeReducer from './Notices';
import LectureReducer from './Reducer.Lectures';
import EventReducer from './Events';
import ResultReducer from './resultReducer';
import DiscussionReducer from './discussionReducer';
import ReplyReducer from './replyReducer';

export default combineReducers({ auth, ModuleReducer, UserReducer, LectureReducer, NoticeReducer, EventReducer, ResultReducer, DiscussionReducer, ReplyReducer });
