// @flow
const API_KEY = '23567b218376f79d9415' // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035'

export async function getPictures (page: number = 1): Array<Object> {
  // http://195.39.233.28:8035/images?page=xxx
}

export async function getPictureDetails (id: number): Object {
  // http://195.39.233.28:8035/images/id
}
