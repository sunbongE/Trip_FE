<script setup>
import { ref, onMounted } from 'vue';
import { getSidoList, getGugunList, getSearchTourinfo } from "@/api/tour";
</script>
<template>
    <section>
        <!-- kakao map -->
        <div id="mapBox">
            <div id="map"></div>
        </div>
    </section>

</template>

<style scoped>

</style>