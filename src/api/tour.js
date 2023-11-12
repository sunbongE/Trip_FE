import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getSidoList(success, fail) {
    local.get(`/trip/sidoList`)
        .then(success)
        .catch(fail);
}

function getGugunList(sidoCode, success, fail) {
    local.get(`/trip/gugunList/${sidoCode}`)
        .then(success)
        .catch(fail);
}

function getSearchTourinfo(sidoCode, gugunCode, contentTypeId, success, fail) {
    local.get(`/trip/searchTourinfo/${sidoCode}/${gugunCode}/${contentTypeId}`)
        .then(success)
        .catch(fail);
}
export {
    getSidoList,
    getGugunList,
    getSearchTourinfo,
};