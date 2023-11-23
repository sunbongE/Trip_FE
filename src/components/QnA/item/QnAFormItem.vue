<script setup>
import { registAns } from "@/api/qnaAns.js"
import { ref, onMounted } from "vue"
const props = defineProps({
    qnaId: Number
})
const toggle=ref(false)
const emit = defineEmits(["changeList"])
const QnaAnswerDto = ref({
        userId: JSON.parse(sessionStorage.getItem('memberStore')).userInfo.userId,
        qnaId: props.qnaId,
        content:''
})
const ansWriteFunc = () => {
     if (QnaAnswerDto.value.content === '') {
        alert("답글 내용을 작성해주세요.")
    }

    QnaAnswerDto.value.qnaId = props.qnaId
   

    registAns(QnaAnswerDto.value,
        (Response) => {
            console.log(Response)
            QnaAnswerDto.value.content = ''
            toggle.value = false
            emit("changeList")
        },
        (error) => {
        alert("작성중 문제가 발생했습니다.")
    })
}
</script>

<template>
    <div id='ansFrame'>
        <div><p @click='toggle = !toggle'>답글🔻</p></div>
        <div v-show='toggle'>
            <form action="" @submit.prevent='ansWriteFunc'>
                <input type="hidden" v-model='props.quaId'> 
                <label for="ans"></label>
                <textarea id="ans" name="content" cols="50" rows="5" required="required" v-model.lazy='QnaAnswerDto.content'>
                    
                </textarea>
                <div id='btns'>
                    <input class='okBtn' type="submit" value='작성' >
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/sass/qna/QnAFormItem.scss';
</style>