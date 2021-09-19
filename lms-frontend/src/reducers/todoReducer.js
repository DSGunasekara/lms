import { FETCH_TASK } from "../constants/constant";

const TaskReducer = (state = { task: null }, action) => {
  switch (action.type) {
    case FETCH_TASK:
      return { ...state, task: action?.payload };
    default:
      return state;
  }
};

export default TaskReducer;
