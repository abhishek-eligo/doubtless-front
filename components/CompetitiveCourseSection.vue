<template>
    <div>
        <CourseTab :tabs="courseTypes" @tabSelected="handleTabChange" />
        <CourseChip :items="competitiveCourseChip" @chipSelected="handleChipChange" :reset="resetChipIndex" />
        <!-- <TotalCompetitiveCourses /> -->
        <div class="d-flex course_gap flex-wrap justify-between">
            <CourseCard v-for="course in courses" :key="course.id" :desc="course.description" :image="course.image" :title="course.title" :productVariants="course.product_variants"
                :rating="course.rating" :offPercent="course.offPercent" :tutorName="course.tutorName" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp();

const courseTabSlugName = ref('');
const courseChipSlugName = ref('');

const courses = ref([]);
const getCompetitiveCourses = async () => {
    const response = await $axios.get("/courses/all_published_course?course_category_id=2");
    // console.log('CC:- ', response.data.data);
    const courseData = response.data.data;
    // console.log('Courses Data', courseData)
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
    console.log('comp maped courses', mappedCourses);
    const filteredCourses = mappedCourses.filter(course => course.leaf_node_slug == courseChipSlugName.value && course.parent_node_slug == courseTabSlugName.value);
    console.log('Competitve filteredCourses', filteredCourses)
    courses.value = filteredCourses;
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
    await getSubCategory(courseTabSlugName.value);
    await getCompetitiveCourses();
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


const handleChipChange = async (selectedChip) => {
    // Execute your logic based on selectedTab
    console.log("CHIP", selectedChip);
    courseChipSlugName.value = selectedChip;
    getProduct(courseTabSlugName.value, courseChipSlugName.value);
    await getCompetitiveCourses();
}

onMounted(async () => {
    await getCompetitiveCategoryCourse();
    await getSubCategory(courseTabSlugName.value);
    await getCompetitiveCourses();
})

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



const getProduct = (tabSlug, chipSlug) => {
    console.log(tabSlug, chipSlug);
}
</script>

<style scoped></style>