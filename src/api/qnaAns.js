import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listAns(qnaId, success, fail) {
    local.get(`/answer/search/${qnaId}`).then(success).catch(fail);
    // local.get(`/answer`, { params: param }).then(success).catch(fail);
}

function detailAns(qnano, success, fail) {
    local.get(`/answer/view/${qnano}`).then(success).catch(fail);
}

function registAns(qna, success, fail) {
    console.log("boardjs qna", qna);
    local.post(`/answer/regist`, JSON.stringify(qna)).then(success).catch(fail);
}

function getModifyAns(qnano, success, fail) {
    local.get(`/answer/view/${qnano}`).then(success).catch(fail);
}

function modifyAns(qna, success, fail) {
    local.put(`/answer/update`, JSON.stringify(qna)).then(success).catch(fail);
}

function deleteAns(qnano, success, fail) {
    local.delete(`/answer/delete/${qnano}`).then(success).catch(fail);
}

export { // 글로벌로 사용할 수 있게 해준다.
    listAns,
    detailAns,
    registAns,
    getModifyAns,
    modifyAns,
    deleteAns,
};
