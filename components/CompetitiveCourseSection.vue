<template>
    <div>
        <CourseTab :tabs="courseTypes" />

        <CourseChip :items="chipNames"/>

        <TotalCompetitiveCourses />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick, computed } from 'vue';
  
  const courseTypes = ["IAS/IPS", "NEET/JEE", "UPSC", "RRB", "SSC", "AFCAT", "NDA"]
  
  const chipNames = ['Prelims General Studies', 'Prelims CSAT', 'Mains GS Paper I-II', 'Mains GS Paper III-IV', 'Mains Optional Subjects', 'Essay Writing', 'Current Preperation', 'Algorithms', 'Machine Learning', 'Cybersecurity', 'Game Development', 'Ruby on Rails']
  </script>
  
  <style scoped>
  </style>