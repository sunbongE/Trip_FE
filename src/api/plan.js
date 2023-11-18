import { localAxios } from "@/util/http-commons";

const local = localAxios();

function searchPlanByUserId(userId, success, fail) {
    // local.get(`/qna/list`).then(success).catch(fail);
    local.get(`/plan/search/my/${userId}`).then(success).catch(fail);
}

export {
    searchPlanByUserId,
}