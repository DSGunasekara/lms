import {
  FETCH_DISCUSSION,
  FETCH_SINGLE_DISCUSSION,
  CREATE_DISCUSSION,
  UPDATE_DISCUSSION,
  DELETE_DISCUSSION,
} from "../constants/constant";

const DiscussionReducer = (
  state = { discussions: null, discussion: null },
  action
) => {
  switch (action.type) {
    case CREATE_DISCUSSION:
      return { ...state, discussion: action?.payload };
    case FETCH_DISCUSSION:
      return { ...state, discussions: action?.payload };
    case FETCH_SINGLE_DISCUSSION:
      return { ...state, discussions: action?.payload };
    case UPDATE_DISCUSSION:
      return state;
    case DELETE_DISCUSSION:
      return state;
    default:
      return state;
  }
};

export default DiscussionReducer;
