import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listQna(success, fail) {
    local.get(`/board/list`).then(success).catch(fail);
    // local.get(`/board`, { params: param }).then(success).catch(fail);
}

function detailQna(qnano, success, fail) {
    local.get(`/board/view/${qnano}`).then(success).catch(fail);
}

function registQna(qna, success, fail) {
    console.log("boardjs qna", qna);
    local.post(`/board/regist`, JSON.stringify(qna)).then(success).catch(fail);
}

function getModifyQna(qnano, success, fail) {
    local.get(`/board/modify/${qnano}`).then(success).catch(fail);
}

function modifyQna(qna, success, fail) {
    local.put(`/board/modify`, JSON.stringify(qna)).then(success).catch(fail);
}

function deleteQna(qnano, success, fail) {
    local.delete(`/board/delete/${qnano}`).then(success).catch(fail);
}

export { // 글로벌로 사용할 수 있게 해준다.
    listQna,
    detailQna,
    registQna,
    getModifyQna,
    modifyQna,
    deleteQna,
};
