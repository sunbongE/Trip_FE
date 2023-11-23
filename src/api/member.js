import { localAxios, localFileAxios} from "@/util/http-commons";

const local = localAxios();
const fileAxios = localFileAxios();

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
function checkId(userId, success, fail) {
    local.post("/user/checkId", userId).then(success).then(fail);
}
function findProfileByUserId(userId, success, fail) {
    local.get(`/user/profile/findProfileByUserId/${userId}`).then(success).catch(fail);
}
function registerProfile(dto, success, fail) {
    fileAxios.post(`/user/profile/regist`, dto).then(success).catch(fail);
}
function isCorrectPwd(dto, success, fail) {
    local.post(`/user/isCorrectPwd`, JSON.stringify(dto)).then(success).catch(fail);
}

function update(dto, success, fail) {
    local.put(`/user/update`, JSON.stringify(dto)).then(success).catch(fail);
}
export {
    userConfirm,
    join,
    findid,
    findpw,
    logout,
    tokenRegeneration,
    findById,
    checkId,
    findProfileByUserId,
    registerProfile,
    isCorrectPwd,
    update,
};