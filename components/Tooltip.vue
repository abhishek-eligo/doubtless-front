<template>
    <div class="tooltip-container">
      <div v-if="visible" class="tooltip-content">{{ text }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    text: {
      type: String,
      required: true
    }
  });
  
  const visible = ref(true);
  
//   const show = () => {
//     visible.value = true;
//   };
  
//   const hide = () => {
//     visible.value = false;
//   };
  </script>
  
  <style scoped>
  .tooltip-container {
    position: relative;
    display: inline-block;
  }
  
  .tooltip-content {
    /* position: absolute; */
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 3px;
    /* bottom: 125%; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
    white-space: nowrap;
    z-index: 1000;
  }
  </style>
  