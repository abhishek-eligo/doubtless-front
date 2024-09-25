<template>
    <div>
        <CourseTab :tabs="courseTypes" />

        <CourseChip :items="chipNames"/>

        <TotalSkillCourses />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick, computed } from 'vue';
  
  const courseTypes = ["Coding", "Graphic Design", "Creative Writing", "Music Production", "Craft", "Robotics", "Cooking", "Photography", 'sdnfjsdjfdsf', 'jsdndsj']
  
  const chipNames = ['C++', 'JavaScript', 'PHP', 'HTML/CSS', 'Data Structures', 'Python', 'Data Structures', 'Algorithms', 'Machine Learning', 'Cybersecurity', 'Game Development', 'Ruby on Rails']
  </script>
  
  <style scoped>
  </style>