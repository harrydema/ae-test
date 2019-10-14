// @flow

import { getPictureDetails } from "@rest/resources/PicturesResource";
import {
  PICTURE_DETAILS_FETCH_START,
  PICTURE_DETAILS_FETCH_SUCCESS,
  PICTURE_DETAILS_FETCH_FAILURE
} from "./types";
import type {
  ActionWithPayload,
  ActionWithoutPayload
} from "../../types/actions";

export function pictureIsLoading(): ActionWithoutPayload {
  return {
    type: PICTURE_DETAILS_FETCH_START
  };
}

export function fetchPictureSuccess(
  imageId: number,
  hiResImage: string
): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload: {
      imageId,
      hiResImage
    }
  };
}

export function fetchPictureFailed(errorMessage: string): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function fetchPictureDetails(imageId: number) {
  return async dispatch => {
    try {
      dispatch(pictureIsLoading());

      const response = await getPictureDetails(imageId);

      dispatch(fetchPictureSuccess(response.data.id, response.data));
    } catch (e) {
      console.error(e);
      dispatch(fetchListFailed(e.message));
    }
  };
}
