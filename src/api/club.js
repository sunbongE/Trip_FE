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

function registClub(dto, success, fail) {
    local.post(`/club/regist`, JSON.stringify(dto)).then(success).catch(fail);
}

function updateClub(dto, success, fail) {
    local.put(`/club/update`, JSON.stringify(dto)).then(success).catch(fail);
}

function deleteClub(id, success, fail){
    local.delete(`/club/delete/${id}`).then(success).catch(fail);
}

function searchClubAll(success, fail) {
    local.get(`/club/search`).then(success).catch(fail);
}

function findClubById(id,success, fail) {
    local.get(`/club/search/${id}`).then(success).catch(fail);
}

function searchClubMemberByClubId(clubId,success, fail) {
    local.get(`/club/search/member/${clubId}`).then(success).catch(fail);
}

// 참가중이 회원 제거
function deleteClubMemberByid(id, success, fail){
    local.delete(`/club/delete/member/${id}`).then(success).catch(fail);
}

function insertClubStatus(dto, success, fail) {
    local.post(`/club/status/regist`, JSON.stringify(dto)).then(success).catch(fail);
}

function deleteById(id, success, fail) {
    local.delete(`/club/status/delete/${id}`).then(success).catch(fail);
}

export {
    searchMyClubs,
    searchByToUserId,
    searchByFromUserId,
    replyToAnswer,
    registClub,
    updateClub,
    deleteClub,
    searchClubAll,
    findClubById,
    searchClubMemberByClubId,
    deleteClubMemberByid,
    insertClubStatus,
    deleteById,
}