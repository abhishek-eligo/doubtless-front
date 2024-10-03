<template>
  <div>
    <CourseTab :tabs="boardNames" @tabSelected="onTabSelected" />
    <CourseChip :items="classNames" @chipSelected="onChipSelected" :reset="resetChipIndex" />
    <!-- <TotalAcademicCourses /> -->
    <div class="d-flex course_gap flex-wrap justify-between">
      <CourseCard v-for="course in courses" :key="course.id" :desc="course.description" :image="course.image"
        :title="course.title" :productVariants="course.product_variants" :rating="course.rating"
        :offPercent="course.offPercent" :tutorName="course.tutorName" />
    </div>
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

const courses = ref([]);
const getAcademicCourses = async () => {
    const response = await $axios.get("/courses/all_published_course?course_category_id=1");
    // console.log('CC:- ', response.data.data);
    const courseData = response.data.data;
    console.log('acad Courses Data', courseData)
    let product_variants = [];
    const mappedCourses = courseData.map(course => {
        return {
            id: course.id,
            leaf_node_slug: course.leaf_node_slug,
            parent_node_slug: course.parent_node_slug,
            description: course.description.slice(0, 150),
            image: course.product_image[0].file_path,
            tutorName: course.tutor.name,
            title: course.title,
            product_variants: course.variants.map(variant => {
                return {
                    variantId: variant.id,
                    productId: variant.product_id,
                    title: variant.attribute_values,
                    price: variant.price,
                    offPercent: variant.off_percent,
                    salePrice: variant.sale_price
                };
            })
        }
    })
    console.log('acad maped courses', mappedCourses);
    const filteredCourses = mappedCourses.filter(course => course.leaf_node_slug == selectedChipSlug.value && course.parent_node_slug == selectedTabSlug.value);
    console.log('acad filteredCourses', filteredCourses)
    courses.value = filteredCourses;
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
const onTabSelected = async (slug) => {
  selectedTabSlug.value = slug;
  console.log('Selected Tab Slug:', selectedTabSlug.value);
  logTabAndChip();
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
  console.log('Selected Chip Slug:', selectedChipSlug.value);
  logTabAndChip();
  await getAcademicCourses();
};

// Log both tab and chip slugs together
const logTabAndChip = () => {
  console.log(`Active Tab Slug: ${selectedTabSlug.value}, Active Chip Slug: ${selectedChipSlug.value}`);
};

onMounted(async () => {
  await getAllBoards();
  await getAllClasses();
  await getAcademicCourses();
});
</script>



<style scoped></style>