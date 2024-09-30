<template>
    <div>
        <CourseTab :tabs="courseTypes" @tabSelected="handleTabChange" />
        <CourseChip :items="competitiveCourseChip" @chipSelected="handleChipChange" :reset="resetChipIndex" />
        <TotalCompetitiveCourses />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp();

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
    await getSubCategory(selectedTab)
}

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
})

const getProduct = (tabSlug, chipSlug) => {
    console.log(tabSlug, chipSlug);
}
</script>

<style scoped></style>