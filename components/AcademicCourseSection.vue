<template>
  <div>
    <USkeleton v-if="tabLoading" class="course_tab_loader mb-2" />
    <CourseTab v-else :tabs="boardNames" @tabSelected="onTabSelected" />
    <USkeleton v-if="chipLoading" class="course_chip_loader" />
    <CourseChip v-else :items="classNames" @chipSelected="onChipSelected" :reset="resetChipIndex" />
    <!-- <TotalAcademicCourses /> -->
    <div class="d-flex justify-between" v-if="cardLoading">
      <div v-for="(loader, index) in cardLoaders" :key="index">
        <USkeleton class="course_card_top_loader" />
        <USkeleton class="course_card_middle_loader" />
        <USkeleton class="course_card_end_loader" />
        <USkeleton class="course_card_end_loader" />
        <USkeleton class="course_card_end_loader" />
      </div>
    </div>
    <!-- <div class="d-flex course_gap flex-wrap justify-between">
      <CourseCard v-for="course in courses" :key="course.id" :desc="course.description" :image="course.image"
        :title="course.title" :productVariants="course.product_variants" :rating="course.rating"
        :offPercent="course.offPercent" :tutorName="course.tutorName" :totalLectures="course.total_lectures" />
    </div> -->
    <v-slide-group class="course_gap">
      <v-slide-group-item v-for="course in courses" :key="course.id">
        <CourseCard :desc="course.description" :image="course.image" :title="course.title"
          :productVariants="course.product_variants" :rating="course.rating" :offPercent="course.offPercent"
          :tutorName="course.tutorName" :totalLectures="course.total_lectures" />
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $axios, $toast } = useNuxtApp();

const cardLoaders = ref(4);
const tabLoading = ref(true);
const chipLoading = ref(true);
const cardLoading = ref(true);

// State to store slugs
const selectedTabSlug = ref('');
const selectedChipSlug = ref('');

// State for resetting the chip index
const resetChipIndex = ref(false);

// Board names data
const boardNames = ref([]);
const classNames = ref([]);

const courses = ref([]);

// Fetch and filter courses based on selected tab and chip slugs
const getAcademicCourses = async () => {
  if (!selectedTabSlug.value || !selectedChipSlug.value) {
    return;
  }

  const response = await $axios.get("/courses/all_published_course?courseCategorySlug=academic");
  const courseData = response.data.data;
  //console.log(courseData);
  const mappedCourses = courseData.map(course => ({
    id: course.id,
    leaf_node_slug: course.leaf_node_slug,
    parent_node_slug: course.parent_node_slug,
    description: course.description.slice(0, 150),
    image: course.product_image[0].file_path,
    tutorName: course.tutor.name,
    title: course.title,
    total_lectures: course.total_lectures,
    product_variants: course.variants.map(variant => ({
      variantId: variant.id,
      productId: variant.product_id,
      title: variant.attribute_values,
      price: variant.price,
      offPercent: variant.off_percent,
      salePrice: variant.sale_price,
    }))
  }));

  // Filter based on both tab and chip slugs
  const filteredCourses = mappedCourses.filter(course =>
    course.leaf_node_slug === selectedChipSlug.value &&
    course.parent_node_slug === selectedTabSlug.value
  );

  courses.value = filteredCourses;
  cardLoading.value = false;
}

// Get all boards from API
const getAllBoards = async () => {
  try {
    const response = await $axios.get('/boards/all');
    const boards = response.data.data;
    boardNames.value = boards.map(obj => ({
      name: obj.name,
      slug: obj.slug,
    }));

    // Set the first board as the default selected tab
    if (boardNames.value.length > 0) {
      selectedTabSlug.value = boardNames.value[0].slug;
    }
    tabLoading.value = false;
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

    // Set the first class as the default selected chip
    if (classNames.value.length > 0) {
      selectedChipSlug.value = classNames.value[0].slug;
    }
    chipLoading.value = false;
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
};

// Handle tab selection
const onTabSelected = async (slug) => {
  selectedTabSlug.value = slug;
  //console.log('Selected Tab Slug:', selectedTabSlug.value);
  await getAcademicCourses();

  // Reset chip index to 0 whenever a new tab is selected
  resetChipIndex.value = true;
  setTimeout(() => {
    resetChipIndex.value = false;
  }, 100);
};

// Handle chip selection
const onChipSelected = async (slug) => {
  selectedChipSlug.value = slug;
  //console.log('Selected Chip Slug:', selectedChipSlug.value);
  await getAcademicCourses();
};

// On component mount, fetch data and ensure the first tab and chip are selected
onMounted(async () => {
  await getAllBoards();
  await getAllClasses();
  await getAcademicCourses();
  $toast.error('Some thing went wrong');
});
</script>

<style scoped></style>
