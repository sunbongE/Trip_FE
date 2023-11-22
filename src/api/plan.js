import { localAxios } from "@/util/http-commons";

const local = localAxios();

function searchPlanByUserId(userId, success, fail) {
    // local.get(`/qna/list`).then(success).catch(fail);
    local.get(`/plan/search/my/${userId}`).then(success).catch(fail);
}

function searchPlanById(id, success, fail) {
    local.get(`/plan/search/${id}`).then(success).catch(fail);
}
function write(data, success, fail) {
    local.post(`/plan/regist`,JSON.stringify(data)).then(success).catch(fail);
}

export {
    searchPlanByUserId,
    searchPlanById,
    write
}