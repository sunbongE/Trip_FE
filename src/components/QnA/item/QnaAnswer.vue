<script setup>
import { ref, onMounted } from 'vue'
import {modifyAns, deleteAns} from "@/api/qnaAns.js"
const props = defineProps({
    ans: Object
})
const emit = defineEmits(["delF"])
const lgnUserId = ref('')
onMounted(() => {
    
    if (sessionStorage.getItem("memberStore") !== null && JSON.parse(sessionStorage.getItem("memberStore")).isLogin) {
        lgnUserId.value = JSON.parse(sessionStorage.getItem("memberStore")).userInfo.userId
    }
})


const modifyFunc = (ansId) => {
    let mode = event.target.parentNode.querySelector(".ans").readOnly
    if (mode) {
        event.target.parentNode.querySelector(".ans").readOnly=false
    } else { // 수정 실행 후 다시 true
        const QnaAnswerDto = ref({
        id:props.ans.id,
        userId: props.ans.userId,
        qnaId: props.ans.qnaId,
        content:event.target.parentNode.querySelector(".ans").value
})
        console.log(QnaAnswerDto.value, "수정실행")
        modifyAns(QnaAnswerDto.value,
            (Response) => {
                console.log(Response)
        })
        event.target.parentNode.querySelector(".ans").readOnly = true
    }
}
const delFunc = (id) => {
    deleteAns(id,
        (Response) => {
        emit("delF")
    })
}
</script>

<template>
    <div class="comment">
        <div class="userFrame">
            <div class="userbox">
                <div class="userImg">
                    <img src="@/assets/images/user.png" alt="사용자이미지">
                </div>
                <div class="userId"><span>{{ ans.userId }}</span></div>
            </div>
            <div class="date"><span>작성일: {{ ans.registerTime }}</span></div>
        </div>
        <p class='modifyBtn' v-if="ans.userId===lgnUserId" @click='modifyFunc(ans.id)'>수정</p>
        <p class='delBtn' v-if="ans.userId===lgnUserId" @click='delFunc(ans.id)'>삭제</p>
        <textarea class="ans" rows="3" required="required" readonly>{{ ans.content }}</textarea>
    </div>
</template>

<style scoped>
@import '@/assets/sass/qna/QnAAns.scss';
</style>