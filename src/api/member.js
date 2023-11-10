import { localAxios } from "@/util/http-commons";

const local = localAxios();

function login(member, success, fail) {
    console.log(member.value.userid);
    local.post(`/user/login`, JSON.stringify(member.value)).then(success).catch(fail);

}

function join(member, success, fail) {
    local.post(`/user/join`, JSON.stringify(member.value)).then(success).catch(fail);
}

function findid(member, success, fail) {
    local.post(`/user/findUserId`,JSON.stringify(member.value)).then(success).catch(fail);

}

function findpw(member, success, fail) {
    local.post(`/user/findUserPwd`,JSON.stringify(member.value)).then(success).catch(fail);
}

export {
    login,
    join,
    findid,
    findpw,
};