// import { FETCH_REPLY, CREATE_REPLY } from "../constants/constant";
// import * as api from '../api/index.js';

// //getting all the replies
// export const getReplies = () => async (dispatch) => {
//     try {
//         const {data} = await api.fetchReply();
//         dispatch ({type: FETCH_REPLY, payload: data});
//     } catch (error) {
//         console.log("getting an error", error);
//     }
// }

// //getting a single reply
// export const getSingleReply = (id) => async () => {
//     try {
//         const {data} = await api.fetchSingleReply(id);
//         return data;
//     } catch (error) {
//         console.log("getting an error", error);
//         return error;
//     }
// }

// //create a reply 
// export const createNewReply = (reply) => async (dispatch) => {
//     try {
//         const res = await api.createReply(reply);
//         dispatch ({type: CREATE_REPLY, payload: res.data});
//         return {...res}
//     } catch (error) {
//         console.log("Error!!" + error);
//     }
// }

// // remove a reply
// export const removeReply = (id) => async (dispatch) => {
//     try {
//         const res = await api.deleteReply(id);
//         return res;
//     } catch (error) {
//         console.log("Error!!", error);
//     }
// }

// //update a reply
// export const updateSingleReply = (reply) => async (dispatch) => {
//     try {
//         console.log(reply);
//         const res = await api.updateReply(reply);
//         dispatch(getReplies());
//         return res;
//     } catch (error) {
//         console.log("Error!!" + error);
//         return error;
//     }
// }