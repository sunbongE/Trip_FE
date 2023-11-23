import { localAxios, localFileAxios } from "@/util/http-commons";

const local = localAxios();
const fileAxios = localFileAxios();
function listArticle(param, success, fail) {
  local.get(`/board/list`, { params: param }).then(success).catch(fail);
}

function detailArticle(articleno, success, fail) {
  local.get(`/board/view/${articleno}`).then(success).catch(fail);
}


function registArticle(article, success, fail) {
  fileAxios.post(`/board/regist`, article).then(success).catch(fail);
}


function getModifyArticle(articleno, success, fail) {
  local.get(`/board/modify/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  local.put(`/board/modify`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleNo, success, fail) {
  console.log(articleNo)
  local.delete(`/board/delete/${articleNo}`).then(success).catch(fail);
}
function fileInfoList(articleno, success, fail) {
  fileAxios.get(`/board/file/${articleno}`).then(success).catch(fail);
}


export { // 글로벌로 사용할 수 있게 해준다.
  listArticle,
  detailArticle,
  registArticle,
  getModifyArticle,
  modifyArticle,
  deleteArticle,
  fileInfoList,
};
