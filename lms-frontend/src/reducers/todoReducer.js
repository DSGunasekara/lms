import { FETCH_TASK, DELETE_TASK } from "../constants/constant";

const TaskReducer = (state = { task: null }, action) => {
  switch (action.type) {
    case FETCH_TASK:
      return { ...state, task: action?.payload };
    case DELETE_TASK:
      return state;
    default:
      return state;
  }
};

export default TaskReducer;
