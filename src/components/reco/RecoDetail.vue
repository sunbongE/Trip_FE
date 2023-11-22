<script setup>
import { onMounted, ref, watch } from "vue";
import { getDescription, getSearchFood, getSearchHotel } from "@/api/tour";

const props = defineProps({ dto: Array });

//props.dto
// props 에 있는 위도, 경도를 기준으로 다시 부가정보를 얻어오는 api를 구현 후 적용해준다.
watch(
  () => props.dto,
  (newDto, oldDto) => {
    // 변경될 때마다 실행되는 로직
    callDescription(newDto);
    callFoodList(newDto);
    callHotelList(newDto);
    // 여기;서 부가정보들도 바꿔주기 - 주변 숙소, 주변 음식가게
  }
);
const description = ref("");
const foodList = ref([]);
const hotelList = ref([]);

const callDescription = (newDto) => {
  console.log("props.dto changed:", props.dto);
  getDescription(newDto.contentId, ({ data }) => {
    description.value = data;
  });
};

const callFoodList = (newDto) => {
  getSearchFood(
    {
      latitude: newDto.latitude,
      longitude: newDto.longitude,
    },
    ({ data }) => {
      console.log("검색결과 data : ", data);
      foodList.value = data;
    },
    (error) => console.log(error)
  );
};

const callHotelList = (newDto) => {
  getSearchHotel(
    {
      latitude: newDto.latitude,
      longitude: newDto.longitude,
    },
    ({ data }) => {
      console.log("검색결과 data : ", data);
      hotelList.value = data;
    },
    (error) => console.log(error)
  );
};
</script>

<template>
  <div class="container">
    <div class="div1">
      <div v-if="props.dto.firstImage || props.dto.firstImage2" class="image-container">
        <img :src="props.dto.firstImage || props.dto.firstImage2" alt="Image" class="image" />
      </div>
      <div v-else class="image-container">
        <img src="https://i.ibb.co/HgKFDHT/image-ready.png" alt="Image" class="image" />
      </div>

      <div class="info-container">
        <h2 class="title">{{ props.dto.title }}</h2>
        <p class="address">{{ props.dto.addr1 }}</p>
        <div class="tel">{{ props.dto.tel }}</div>
        <div class="desc">{{ description }}</div>
      </div>
    </div>

    <div class="div2">
      <div class="sub-container">
        <h3 class="title">주변 숙박업소</h3>
        <div v-for="hotel in hotelList" :key="hotel.contentId" class="obj-container">
          <p>{{ hotel.title }}</p>
          <p>{{ hotel.addr1 }}</p>
        </div>
      </div>

      <div class="sub-container">
        <h3 class="title">주변 식당</h3>
        <div v-for="food in foodList" :key="food.contentId" class="obj-container">
          <p>{{ food.title }}</p>
          <p>{{ food.addr1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.obj-container {
  border: 1px solid blue;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
}
.div1 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #d3d3d3;
  border-radius: 6px;
}

.image-container {
  max-width: 50%;
}

.image {
  width: 100%;
  height: 200px;
}

.info-container {
  text-align: center;
}

.title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.desc {
  padding: 20px;
  height: 200px;
  margin-top: auto;
  overflow-y: scroll;
  border: 1px solid #e3e3e3;
}

.div2 {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f0f0f0;
}

.sub-container {
  width: 100%;
}

.sub-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>
