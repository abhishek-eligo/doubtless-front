<template>
  <div>
    <CourseTab :tabs="boardNames" @tabSelected="onTabSelected" />
    <CourseChip :items="classNames" @chipSelected="onChipSelected" :reset="resetChipIndex" />
    <TotalAcademicCourses />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp();

// State to store slugs
const selectedTabSlug = ref('');
const selectedChipSlug = ref('');

// State for resetting the chip index
const resetChipIndex = ref(false);

// Board names data
const boardNames = ref([]);

// Class names data
const classNames = ref([]);

// Get all boards from API
const getAllBoards = async () => {
  try {
    const response = await $axios.get('/boards/all');
    const boards = response.data.data;
    boardNames.value = boards.map(obj => ({
      name: obj.name,
      slug: obj.slug,
    }));
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
};

// Get all classes from API
const getAllClasses = async () => {
  try {
    const response = await $axios.get('/studentclasses/all');
    const classes = response.data.data;
    classNames.value = classes.map(obj => ({
      name: obj.name,
      slug: obj.slug,
    }));
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
};

// Handle tab selection
const onTabSelected = (slug) => {
  selectedTabSlug.value = slug;
  console.log('Selected Tab Slug:', selectedTabSlug.value);
  logTabAndChip();  // Log tab and chip slug together

  // Reset chip index to 0 whenever a new tab is selected
  resetChipIndex.value = true;
  setTimeout(() => {
    resetChipIndex.value = false;
  }, 100);
};

// Handle chip selection
const onChipSelected = (slug) => {
  selectedChipSlug.value = slug;
  console.log('Selected Chip Slug:', selectedChipSlug.value);
  logTabAndChip();  // Log tab and chip slug together
};

// Log both tab and chip slugs together
const logTabAndChip = () => {
  console.log(`Active Tab Slug: ${selectedTabSlug.value}, Active Chip Slug: ${selectedChipSlug.value}`);
};

onMounted(() => {
  getAllBoards();
  getAllClasses();
});
</script>



<style scoped></style>