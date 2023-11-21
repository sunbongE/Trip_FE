import { onMounted, ref } from "vue";
import { defineStore } from "pinia";

// export const useFriendshipStore = defineStore('friendship', {
//   state: () => ({
//     friends: [],
//     receivedList: [],
//   }),

//   actions: {
//     setFriends(friends) {
//       this.friends = friends;
//     },

//     setReceivedList(receivedList) {
//       this.receivedList = receivedList;
//     },

//     removeReceived(receivedId) {
//       this.receivedList = this.receivedList.filter(item => item.id !== receivedId);
//     },
//   },
// });

export const useFriendshipStore = defineStore("friendship", () => {
  const friends = ref([]);
  const receivedList = ref([]);

  const setFriends = function (friend) {
    friends.value = friend;
  };

  const setReceivedList = function (list) {

    receivedList.value = list;
  };

  const deleteReceivedList = function (receivedId) {
    receivedList.value = receivedList.value.filter((item) => item.id !== receivedId);
  };


  return {
    friends,
    receivedList,
    setFriends,
    setReceivedList,
    deleteReceivedList,
  };
});
