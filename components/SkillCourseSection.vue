<template>
    <div>
        <CourseTab :tabs="skillTabs" @tabSelected="handleTabChange" />
        <CourseChip :items="skillCourseChip" @chipSelected="handleChipChange" :reset="resetChipIndex" />
        <!-- <TotalSkillCourses /> -->
        <div class="d-flex course_gap flex-wrap justify-between">
            <CourseCard v-for="course in courses" :key="course.id" :desc="course.description" :image="course.image" :title="course.title" :productVariants="course.product_variants"
                :rating="course.rating" :offPercent="course.offPercent" :tutorName="course.tutorName" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp();

const courses = ref([]);
const courseTabSlugName = ref('');
const courseChipSlugName = ref('');
// Your method to handle tab change
const handleTabChange = async (selectedTab) => {
    console.log("TAB", selectedTab);
    // Execute your logic based on selectedTab
    resetChipIndex.value = true;
    setTimeout(() => {
        resetChipIndex.value = false;
    }, 100);
    courseTabSlugName.value = selectedTab;
    await getSubCategory(courseTabSlugName.value)
}

// State to reset the chip index
const resetChipIndex = ref(false);

const handleChipChange = (selectedChip) => {
    // Execute your logic based on selectedTab
    console.log("CHIP", selectedChip);
    courseChipSlugName.value = selectedChip;
    getProduct(courseTabSlugName.value, courseChipSlugName.value);
}

const skillTabs = ref([]);
const getSkillCategoryCourse = async () => {
    const response = await $axios.get('/course_categories/parent_direct_child/skill');
    const skillCourses = response.data;
    courseTabSlugName.value = skillCourses[0].slug;
    skillTabs.value = skillCourses.map(obj => {
        let newObj = {};
        newObj.name = obj.name;
        newObj.slug = obj.slug;
        return newObj;
    });
}
const getSkillCourses = async () => {
    const response = await $axios.get("/courses/published_product?course_category_id=3");
    console.log('CC:- ', response.data.data);
    const courseData = response.data.data;
    console.log('Courses Data', courseData)
    let product_variants = [];
    const mappedCourses = courseData.map(course => {
        return {
            id: course.id,
            lead_node_slug: course.lead_node_slug,
            description: course.description.slice(0, 150),
            image: course.product_image[0].file_path,
            tutorName: course.tutor.name,
            title: course.title,
            product_variants: course.variants.map(variant => {
                return {
                    id: variant.id,
                    title: variant.attribute_values,
                    price: variant.price,
                    offPercent: variant.off_percent,
                    salePrice: variant.sale_price
                };
            })
        }
    })
    const leadNodeSlug = mappedCourses.map(obj => obj.lead_node_slug == courseChipSlugName.value);
    console.log('SLUG Value', leadNodeSlug);
    console.log('mappedCourses', mappedCourses)
    courses.value = mappedCourses;
}

onMounted(async () => {
    await getSkillCategoryCourse();
    await getSubCategory(courseTabSlugName.value);
    getSkillCourses();
})

const skillCourseChip = ref([]);

const getSubCategory = async (slugTemp) => {
    const response = await $axios.get(`/course_categories/parent_all_leaf/${slugTemp}`);
    const skillSubCourses = response.data;
    courseChipSlugName.value = skillSubCourses[0].slug;
    skillCourseChip.value = skillSubCourses.map(obj => {
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