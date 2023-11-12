<script setup>
defineProps({
    ans: Object
})

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
        <div class="ans">
            <p>{{ ans.content }}</p>
        </div>
    </div>
</template>

<style scoped>
.comment {
    margin: 20px 0;
    border: 1px solid black;
    border-radius: 20px;
    width: 100%;
    padding: 20px;
}

.userFrame {
    display: flex;
    justify-content: space-between;
}

.userbox {
    display: flex;

}

.userId {
    display: flex;
    align-items: flex-end;
}

.ans {
    padding: 20px;
    margin-top: 20px;
}

.ans>p {
    margin-bottom: 0;
    padding: 10px;
}

img {
    max-width: 60px;
    border-radius: 50%;
}
</style>