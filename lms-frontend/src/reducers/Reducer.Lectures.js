import { FETCH_LECTURE } from "../constants/constant";

const LectureReducer = (state = { lectures: null }, action) => {
  switch (action.type) {
    case FETCH_LECTURE:
      return { ...state, lectures: action?.payload };
    default:
      return state;
  }
};

export default LectureReducer;
