import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getReceived(userId, success, fail) {
    local.get(`/friend/${userId}`).then(success).catch(fail);
}

function searchByStatus(req, success, fail) {
    local.post(`/friend/list`, JSON.stringify(req)).then(success).catch(fail);
}

function answer(req, success, fail) {
    local.put(`/friend/answer`, JSON.stringify(req)).then(success).catch(fail);
}

export {
    getReceived,
    searchByStatus,
    answer,
}