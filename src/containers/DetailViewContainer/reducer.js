import {
  PICTURE_DETAILS_FETCH_START,
  PICTURE_DETAILS_FETCH_SUCCESS,
  PICTURE_DETAILS_FETCH_FAILURE
} from "./types";

const initialState = {
  hiResPictures: [],
  isLoading: false,
  errorMessage: ""
};

export default function(state: any = initialState, action: Object) {
  const payload = action.payload;
  switch (action.type) {
    case PICTURE_DETAILS_FETCH_START:
      return Object.assign({}, state, {
        isLoading: true
      });

    case PICTURE_DETAILS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hiResPictures: [...state.hiResPictures, payload.hiResImage]
      });

    case PICTURE_DETAILS_FETCH_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: payload.errorMessage
      });

    default:
      return state;
  }
}
