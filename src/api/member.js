import { localAxios } from "@/util/http-commons";

const local = localAxios();

// Login
async function userConfirm(param, success, fail) {
    await local.post(`/user/login`, param).then(success).catch(fail);
}

function join(member, success, fail) {
    local.post(`/user/join`, JSON.stringify(member.value))
        .then(success)
        .catch(fail);
}

function findid(member, success, fail) {
    local.post(`/user/findUserId`, JSON.stringify(member.value)).then(success).catch(fail);

}

function findpw(member, success, fail) {
    local.post(`/user/findUserPwd`, JSON.stringify(member.value)).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
    await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
    await local.get(`/user/logout/${userid}`).then(success).catch(fail);
}
async function findById(userid, success, fail) {
    local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
    await local.get(`/user/info/${userid}`).then(success).catch(fail);
}
export {
    userConfirm,
    join,
    findid,
    findpw,
    logout,
    tokenRegeneration,
    findById
};