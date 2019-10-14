// @flow
import RestClient from "@rest";

function getPictures(pageNumber: number) {
  return new RestClient(true).getInstance().get(`/images?page=${pageNumber}`);
}

function getPictureDetails(id: number) {
  return new RestClient(true).getInstance().get(`/images/${id}`);
}

export { getPictures, getPictureDetails };
