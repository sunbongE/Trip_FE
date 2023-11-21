import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getSidoList(success, fail) {
  local.get(`/trip/sidoList`).then(success).catch(fail);
}

function getGugunList(sidoCode, success, fail) {
  local.get(`/trip/gugunList/${sidoCode}`).then(success).catch(fail);
}

function getSearchTourinfo(sidoCode, gugunCode, contentTypeId, success, fail) {
  local
    .get(`/trip/searchTourinfo/${sidoCode}/${gugunCode}/${contentTypeId}`)
    .then(success)
    .catch(fail);
}

function getSearchByPoint(map, success, fail) {
  local.post(`/trip/searchByPoint`, JSON.stringify(map)).then(success).catch(fail);
}

function getDescription(contentId, success, fail) {
  local.get(`/trip/getDescription/${contentId}`).then(success).catch(fail);
}
function getSearchHotel(map, success, fail) {
  local.post(`/trip/searchHotel`, JSON.stringify(map)).then(success).catch(fail);
}
function getSearchFood(map, success, fail) {
  local.post(`/trip/searchFood`, JSON.stringify(map)).then(success).catch(fail);
}
export {
  getSidoList,
  getGugunList,
  getSearchTourinfo,
  getSearchByPoint,
  getDescription,
  getSearchHotel,
  getSearchFood,
};
