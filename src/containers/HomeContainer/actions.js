import { getPictures } from "@rest/resources/PicturesResource";
import {
  PICTURES_FETCH_START,
  PICTURES_FETCH_SUCCESS,
  PICTURES_FETCH_FAILURE
} from "./types";
import { ActionWithPayload, ActionWithoutPayload } from "../../types/actions";

export function listIsLoading(): ActionWithoutPayload {
  return {
    type: PICTURES_FETCH_START
  };
}

export function fetchListSuccess(
  pictures: Array<Object>,
  page: number
): ActionWithPayload {
  return {
    type: PICTURES_FETCH_SUCCESS,
    payload: {
      pictures,
      page
    }
  };
}

export function fetchListFailed(errorMessage: string): ActionWithPayload {
  return {
    type: PICTURES_FETCH_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function fetchPictures(page: number = 1) {
  return async dispatch => {
    try {
      dispatch(listIsLoading());

      const response = await getPictures(page);

      dispatch(fetchListSuccess(response.data.pictures, page));
    } catch (e) {
      console.error(e);
      dispatch(fetchListFailed(e.message));
    }
  };
}
