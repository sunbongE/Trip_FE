import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listQna(param, success, fail) {
    // local.get(`/qna/list`).then(success).catch(fail);
    local.get(`/qna/list`, { params: param }).then(success).catch(fail);
}

function detailQna(qnano, success, fail) {
    local.get(`/qna/view/${qnano}`).then(success).catch(fail);
}

function registQna(qna, success, fail) {
    console.log("boardjs qna", qna);
    local.post(`/qna/regist`, JSON.stringify(qna)).then(success).catch(fail);
}

function getModifyQna(qnano, success, fail) {
    local.get(`/qna/view/${qnano}`).then(success).catch(fail);
}

function modifyQna(qna, success, fail) {
    local.put(`/qna/update`, JSON.stringify(qna)).then(success).catch(fail);
}

function deleteQna(qnano, success, fail) {
    local.delete(`/qna/delete/${qnano}`).then(success).catch(fail);
}

export { // 글로벌로 사용할 수 있게 해준다.
    listQna,
    detailQna,
    registQna,
    getModifyQna,
    modifyQna,
    deleteQna,
};
