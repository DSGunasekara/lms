import { FETCH_DISCUSSION, CREATE_DISCUSSION } from "../constants/constant";
import * as api from '../api/index.js';

//getting all the discussions
export const getDiscussions = () => async (dispatch) => {
    try {
        const {data} = await api.fetchDiscussion();
        dispatch ({type: FETCH_DISCUSSION, payload: data});
    } catch (error) {
        console.log("getting an error" + error);
    }
}

//getting a single discussion
export const getSingleDiscussion = (id) => async () => {
    try {
        const {data} = await api.fetchSingleDiscussion(id);
        return data;
    } catch (error) {
        console.log("getting single discussion error" + error);
        return error;
    }
}

//create a discussion
export const createNewDiscussion = (discussion) => async (dispatch) => {
    try {
        const res = await api.createDiscussion(discussion);
        dispatch ({type: CREATE_DISCUSSION, payload: res.data});
        return{...res}
    } catch (error) {
        console.log("Create discussion error");
    }
}

//remove single discussion
export const removeDiscussion = (id) => async (dispatch) => {
    try {
        const res = await api.deleteDiscussion(id);
        return res;
    } catch (error) {
        console.log("Error in Delete Discussion" + error);
    }
}

//update single discussion
export const updateSingleDiscussion = (discussion) => async (dispatch) => {
    try {
        console.log(discussion);
        const res = await api.updateDiscussion(discussion);
        dispatch(getDiscussions());
        return res;
    } catch (error) {
        console.log("Error in Update Discussion" +  error);
        return error;
    }
}