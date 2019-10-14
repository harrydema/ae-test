// @flow
import {
  PICTURES_FETCH_START,
  PICTURES_FETCH_SUCCESS,
  PICTURES_FETCH_FAILURE
} from "./types";

const initialState = {
  pictures: [],
  isLoading: false,
  page: 1,
  errorMessage: ""
};

export default function(state: any = initialState, action: Object) {
  const payload = action.payload;
  switch (action.type) {
    case PICTURES_FETCH_START:
      return Object.assign({}, state, {
        isLoading: true
      });

    case PICTURES_FETCH_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        pictures: [...state.pictures, ...payload.pictures],
        page: payload.page
      });

    case PICTURES_FETCH_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: payload.errorMessage
      });

    default:
      return state;
  }
}
