import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getAlarm(userId, success, fail) {
    // local.get(`/qna/list`).then(success).catch(fail);
    local.get(`/alarm/${userId}`).then(success).catch(fail);
}

// function sendAlarm(id, success, fail) {
//     local.get(`/plan/search/${id}`).then(success).catch(fail);
// }
function readAlarm(id, success, fail) {
    local.put(`/alarm/readAlarm`,id).then(success).catch(fail);
}
function deleteAlarm(id, success, fail) {
    local.delete(`/alarm/deleteAlarm/${id}`).then(success).catch(fail);
}

export {
    getAlarm,
    readAlarm,
    deleteAlarm
}