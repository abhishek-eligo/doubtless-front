<template>
    <div>
        <CourseTab :tabs="boardNames" />

        <CourseChip :items="chipNames"/>

        <TotalAcademicCourses />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick, computed } from 'vue';
  
  const boardNames = ["CBSE", "CISCE", "NIOS", "IB", "CIE", "HPBSE", "MPBSE", "APBSE", "BSEB", "WBBSE"]
  
  const chipNames = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
  </script>
  
  <style scoped>
  </style>