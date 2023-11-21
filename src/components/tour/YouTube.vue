<script setup>
import { onMounted, watch } from "vue";
const props = defineProps({
    keyword: String
})


const searchF = () => {
    let serviceKey = "AIzaSyC4cD5-fJJz-mgzS-Odr36_d0osDAZhEII";
    let baseUrl = "https://youtube.googleapis.com/youtube/v3/search";
    console.log("?")
    let keyword = document.querySelector("#query").value;
    let queryString = `part=snippet&maxResults=6&q=${keyword}여행&type=video&key=${serviceKey}`;
    let url = baseUrl + "?" + queryString;
    fetch(url)
        .then((response) => response.json())
        .then((data) => makeList(data));
}
function makeList(data) {
    console.log(data);
    let videos = ``;
    data.items.forEach((item) => {
        console.log(item.id.videoId);
        videos += `
            <iframe id="ytplayer" type="text/html"  min-width="586" min-height="300"
            src="https://www.youtube.com/embed/${item.id.videoId}"
            frameborder="0" allowfullscreen></iframe><br/>`;
    });
    document.querySelector("#videoView").innerHTML = videos;
}
onMounted(() => {


    document.querySelector("#btn-search").addEventListener("click", searchF);
})
</script>

<template>
    <div id="youtubeBox">
        <h2>유튜브 검색 결과</h2>
        <div id="btnBox">
            <input type="text" id="query" :value='keyword' @keyup.enter="searchF" /><button id="btn-search">검색</button>
        </div>
        <div id="videoView">

        </div>
    </div>
</template>

<style scoped>
@import '@/assets/sass/tour/youtube.scss';
</style>