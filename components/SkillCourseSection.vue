<template>
    <div>
        <USkeleton v-if="tabLoading" class="course_tab_loader mb-2" />
        <CourseTab :tabs="skillTabs" @tabSelected="handleTabChange" />
        <USkeleton v-if="chipLoading" class="course_chip_loader" />
        <CourseChip :items="skillCourseChip" @chipSelected="handleChipChange" :reset="resetChipIndex" />
        <!-- <TotalSkillCourses /> -->
        <div class="d-flex justify-between" v-if="cardLoading">
            <div v-for="(loader, index) in cardLoaders" :key="index">
                <USkeleton class="course_card_top_loader" />
                <USkeleton class="course_card_middle_loader" />
                <USkeleton class="course_card_end_loader" />
                <USkeleton class="course_card_end_loader" />
                <USkeleton class="course_card_end_loader" />
            </div>
        </div>
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

const cardLoaders = ref(4);
const tabLoading = ref(true);
const chipLoading = ref(true);
const cardLoading = ref(true);

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
    await getSubCategory(courseTabSlugName.value);
    await getSkillCourses();
}

// State to reset the chip index
const resetChipIndex = ref(false);

const handleChipChange = async (selectedChip) => {
    // Execute your logic based on selectedTab
    console.log("CHIP", selectedChip);
    courseChipSlugName.value = selectedChip;
    getProduct(courseTabSlugName.value, courseChipSlugName.value);
    await getSkillCourses();
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
    tabLoading.value = false;
}
const getSkillCourses = async () => {
    courses.value = [];
    const response = await $axios.get("/courses/all_published_course?course_category_id=3");
    console.log('SC:- ', response.data.data);
    const courseData = response.data.data;
    console.log('Courses Data', courseData, courseChipSlugName.value)
    let product_variants = [];
    const mappedCourses = courseData.map(course => {
        return {
            id: course.id,
            parent_node_slug: course.parent_node_slug,
            leaf_node_slug: course.leaf_node_slug,
            description: course.description.slice(0, 150),
            image: course.product_image[0].file_path,
            tutorName: course.tutor.name,
            title: course.title.slice(0, 40),
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
    // console.log('mappedCourses', mappedCourses)
    const filteredCourses = mappedCourses.filter(course => course.leaf_node_slug === courseChipSlugName.value && course.parent_node_slug === courseTabSlugName.value);
    console.log('filteredCourses', filteredCourses)
    courses.value = filteredCourses;
    cardLoading.value = false;
}

onMounted(async () => {
    await getSkillCategoryCourse();
    await getSubCategory(courseTabSlugName.value);
    await getSkillCourses();
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
    chipLoading.value = false;
}

const getProduct = (tabSlug, chipSlug) => {
    console.log(tabSlug, chipSlug);
}
</script>

<style scoped></style>