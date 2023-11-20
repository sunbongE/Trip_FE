import { localAxios } from "@/util/http-commons";

const local = localAxios();

function searchMyClubs(userId, success, fail) {
    local.get(`/club/search/my/${userId}`).then(success).catch(fail);
}

function searchByToUserId(userId, success, fail) {
    local.get(`/club/status/search/to/${userId}`).then(success).catch(fail);
}

function searchByFromUserId(userId, success, fail) {
    local.get(`/club/status/search/from/${userId}`).then(success).catch(fail);
}

function replyToAnswer(dto, success, fail) {
    local.put(`/club/status/reply`, JSON.stringify(dto)).then(success).catch(fail);
}

export {
    searchMyClubs,
    searchByToUserId,
    searchByFromUserId,
    replyToAnswer,
}