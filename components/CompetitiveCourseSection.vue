<template>
    <div>
        <CourseTab :tabs="courseTypes" @tabSelected="handleTabChange" />
        <CourseChip :items="competitiveCourseChip" @chipSelected="handleChipChange" :reset="resetChipIndex" />
        <!-- <TotalCompetitiveCourses /> -->
        <div class="d-flex course_gap flex-wrap justify-between">
            <CourseCard v-for="course in courses" :key="course.id" :desc="course.description" :image="course.image" :title="course.title"
                :rating="course.rating" :offPercent="course.offPercent" :tutorName="course.tutorName" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp();

const courseTabSlugName = ref('');
const courseChipSlugName = ref('');

const courses = ref([
    // { id: '1', image: '/images/comp-1.png', tutorName: 'Dr. Myra Raj', title: 'Union and State Governments Roles and Responsibilities', rating: '4.7', offPercent: '40' },
    // { id: '2', image: '/images/comp-2.png', tutorName: 'Khan Sir', title: 'Economic Geography of India Resources and Industries', rating: '4.3', offPercent: '40' },
    // { id: '3', image: '/images/comp-3.png', tutorName: 'Vidyapheet', title: 'Economic History of India Pre and Post-Colonial', rating: '4.3', offPercent: '40' },
    // { id: '4', image: '/images/course-4.png', tutorName: 'Dods', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
]);
const getCompetitiveCourses = async () => {
    const response = await $axios.get("/courses/published_product?course_category_id=2");
    console.log('CC:- ', response.data.data);
    const courseData = response.data.data;
    console.log('Courses Data', courseData)
    let product_variants = [];
    const mappedCourses = courseData.map(course => {
        return {
            id: course.id,
            lead_node_slug: course.lead_node_slug,
            description: course.description,
            image: course.product_image[0].file_path,
            tutorName: course.tutor.name,
            title: course.title,
            product_variants: course.variants.map(obj => {
                let newObj = {};
                    newObj.id = obj.id;
                    newObj.title = obj.attribute_values[0].name;
                    newObj.price = obj.price;
                return newObj;
            })
        }
    })
    courses.value = mappedCourses;
    console.log('asdsadad', product_variants)
}
// Your method to handle tab change
const handleTabChange = async (selectedTab) => {
    console.log("TAB", selectedTab);
    // Execute your logic based on selectedTab
    resetChipIndex.value = true;
    setTimeout(() => {
        resetChipIndex.value = false;
    }, 100);
    courseTabSlugName.value = selectedTab;
    await getSubCategory(selectedTab)
}

const productVariants = ref([]);

const courseTypes = ref([]);
const getCompetitiveCategoryCourse = async () => {
    const response = await $axios.get('/course_categories/parent_direct_child/competitive');
    const competitiveCourses = response.data;
    courseTabSlugName.value = competitiveCourses[0].slug;
    courseTypes.value = competitiveCourses.map(obj => {
        let newObj = {};
        newObj.name = obj.name;
        newObj.slug = obj.slug;
        return newObj;
    });
}

// State to reset the chip index
const resetChipIndex = ref(false);


const handleChipChange = (selectedChip) => {
    // Execute your logic based on selectedTab
    console.log("CHIP", selectedChip);
    courseChipSlugName.value = selectedChip;
    getProduct(courseTabSlugName.value, courseChipSlugName.value);
}

const competitiveCourseChip = ref([]);

const getSubCategory = async (slugTemp) => {
    const response = await $axios.get(`/course_categories/parent_all_leaf/${slugTemp}`);
    const skillSubCourses = response.data;
    competitiveCourseChip.value = skillSubCourses.map(obj => {
        let newObj = {};
        newObj.name = obj.name;
        newObj.slug = obj.slug;
        return newObj;
    });
}

onMounted(async () => {
    await getCompetitiveCategoryCourse();
    await getSubCategory(courseTabSlugName.value);
    await getCompetitiveCourses();
})

const getProduct = (tabSlug, chipSlug) => {
    console.log(tabSlug, chipSlug);
}
</script>

<style scoped></style>