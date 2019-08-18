import { combineReducers } from "redux";
import newsReducer from "./news-reducer";
import usersReducer from "./users-reducer";

const reducer = combineReducers({
  news: newsReducer,
  user: usersReducer
});
export default reducer;
