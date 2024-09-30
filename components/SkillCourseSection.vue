<template>
    <div>
        <CourseTab :tabs="skillTabs" @tabSelected="handleTabChange" />
        <CourseChip :items="skillCourseChip" @chipSelected="handleChipChange" :reset="resetChipIndex" />
        <TotalSkillCourses />
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

onMounted(async () => {
    await getSkillCategoryCourse();
    await getSubCategory(courseTabSlugName.value);
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