<template>
    <div>
        <USkeleton v-if="tabLoading" class="course_tab_loader mb-2" />
        <CourseTab :tabs="courseTypes" @tabSelected="handleTabChange" />
        <USkeleton v-if="chipLoading" class="course_chip_loader" />
        <CourseChip :items="competitiveCourseChip" @chipSelected="handleChipChange" :reset="resetChipIndex" />
        <!-- <TotalCompetitiveCourses /> -->
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
const { $axios } = useNuxtApp();

const cardLoaders = ref(4);
const tabLoading = ref(true);
const chipLoading = ref(true);
const cardLoading = ref(true);

const courseTabSlugName = ref('');
const courseChipSlugName = ref('');

const courses = ref([]);
const getCompetitiveCourses = async () => {
    const response = await $axios.get("/courses/all_published_course?courseCategorySlug=competitive");
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
            total_lectures: course.total_lectures,
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
    //console.log('comp maped courses', mappedCourses);
    const filteredCourses = mappedCourses.filter(course => course.leaf_node_slug == courseChipSlugName.value && course.parent_node_slug == courseTabSlugName.value);
    //console.log('Competitve filteredCourses', filteredCourses)
    courses.value = filteredCourses;
    cardLoading.value = false;
}
// Your method to handle tab change
const handleTabChange = async (selectedTab) => {
    //console.log("TAB", selectedTab);
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
    await getSubCategory(courseTabSlugName.value);
    tabLoading.value = false;
}

// State to reset the chip index
const resetChipIndex = ref(false);


const handleChipChange = async (selectedChip) => {
    // Execute your logic based on selectedTab
    //console.log("CHIP", selectedChip);
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
    if (competitiveCourseChip.value.length > 0) {
        courseChipSlugName.value = competitiveCourseChip.value[0].slug;
        await getCompetitiveCourses(); // Call filtering after setting default chip
    }
    chipLoading.value = false;
}



const getProduct = (tabSlug, chipSlug) => {
    //console.log(tabSlug, chipSlug);
}
</script>

<style scoped></style>