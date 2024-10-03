<script setup>
const { $axios, $retryRequest } = useNuxtApp();
const items = ref([
    { label: 'Categories', slot: 'categories', defaultOpen: true },
    { label: 'Price', slot: 'price', defaultOpen: false },
    { label: 'Ratings', slot: 'ratings', defaultOpen: false },
    { label: 'Video Duration', slot: 'videoDuration', defaultOpen: false },
])

const academicData = ref([
    { label: 'Board', slot: 'board', defaultOpen: true },
    { label: 'Classes', slot: 'classes', defaultOpen: false },
])

const selectedCategory = ref(null);
const selectedBoard = ref([]);
const selectedClass = ref([]);
const filterModalIsOpen = ref(false);

const totalClassModalIsOpen = ref(false);

const openBoardFilterModal = () => {
    filterModalIsOpen.value = true;
}

const openClassFilterModal = () => {
    totalClassModalIsOpen.value = true;
}

const allBoards = ref([]);
const slicedBoards = ref([]);
const getAllBoards = async () => {
    const response = await $axios.get('/boards/all');
    // console.log('All Boards', response.data.data);
    allBoards.value = response.data.data;
    slicedBoards.value = response.data.data.slice(0, 2);
}


const allClasses = ref([]);
const slicedClasses = ref([]);
const getAllClasses = async () => {
    const response = await $axios.get('/studentclasses/all');
    // console.log('All Classes', response.data.data);
    allClasses.value = response.data.data;
    slicedClasses.value = response.data.data.slice(0, 2);
}

onMounted(() => {
    getAllBoards();
    getAllClasses();
})
</script>

<template>
    <div>
        <VContainer class="px-0 py-0 courses_section_one">
            <VRow class="justify-content-around align-center">
                <div class="course_pg_div">
                    <div class="d-flex justify-center">
                        <img class="course_pg_img" src="/images/OBJECTS.png" />
                    </div>
                    <h1 class="course_pg_h">Explore <span>Learning Opportunities</span> Your One-Stop Study Resource
                    </h1>
                    <p class="course_pg_p">Discover Tailored Learning Options for Your Success. Find All Courses in One
                        Place.</p>
                </div>
                <img src="/images/course_page_img.png" />
            </VRow>
        </VContainer>
        <div class="courses_section_two">
            <div class="wrapper">
                <div class="row flex-wrap">
                    <div class="col-md-3">
                        <VCard class="course_filter_card">
                            <VCardTitle class="course_filter_card_title">
                                <div class="course_filter_div">
                                    <img class="course_filter_img" src="/images/filter.png" />
                                    <h1 class="course_filter_h">Filters</h1>
                                </div>
                                <button class="course_filter_btn">Clear all</button>
                            </VCardTitle>
                            <VCardText class="course_filter_card_text">
                                <UAccordion multiple class="course_filter_accord" :items="items">
                                    <template #categories>
                                        <v-radio-group class="radio_group" v-model="selectedCategory">
                                            <VRadio class="crse_cat" value="academic" label="academic courses" />
                                        </v-radio-group>
                                        <UAccordion multiple v-if="selectedCategory == 'academic'"
                                            class="acadameic_accord" id="acadAccord" :items="academicData">
                                            <template #board>
                                                <VCheckbox v-for="(board, index) in slicedBoards" :key="index"
                                                    class="filter_checkbox" v-model="selectedBoard" :value="board.name"
                                                    :label="board.name" 
                                                    />
                                                    <p @click="openBoardFilterModal" class="acadameic_accord_see_more">
                                                        See
                                                        More...
                                                    </p>
                                            </template>
                                            <template #classes>
                                                <VCheckbox v-for="(board, index) in slicedClasses" :key="index"
                                                    class="filter_checkbox" v-model="selectedClass" :value="board.name"
                                                    :label="board.name" 
                                                    />
                                                <p @click="openClassFilterModal" class="acadameic_accord_see_more">See
                                                    More...
                                                </p>
                                            </template>
                                        </UAccordion>

                                        <v-radio-group class="radio_group" v-model="selectedCategory">
                                            <VRadio class="crse_cat" value="skills" label="grow skills courses" />
                                        </v-radio-group>
                                        <UAccordion multiple v-if="selectedCategory == 'skills'"
                                            class="acadameic_accord" :items="academicData">
                                            <template #board>
                                                <VCheckbox class="filter_checkbox" v-model="selectedBoard" value="CBSE"
                                                    label="CBSE" />
                                                <VCheckbox class="filter_checkbox" v-model="selectedBoard" value="ICSE"
                                                    label="ICSE" />
                                                <p @click="openBoardFilterModal" class="acadameic_accord_see_more">See
                                                    More...
                                                </p>
                                            </template>
                                            <template #classes>
                                                <VCheckbox class="filter_checkbox" v-model="selectedClass"
                                                    value="Class 1" label="Class 1" />
                                                <VCheckbox class="filter_checkbox" v-model="selectedClass"
                                                    value="Class 2" label="Class 2" />
                                                <p @click="openClassFilterModal" class="acadameic_accord_see_more">See
                                                    More...
                                                </p>
                                            </template>
                                        </UAccordion>

                                        <v-radio-group class="radio_group" v-model="selectedCategory">
                                            <VRadio class="crse_cat" value="competitive"
                                                label="competitive exam courses" />
                                        </v-radio-group>
                                        <UAccordion multiple v-if="selectedCategory == 'competitive'"
                                            class="acadameic_accord" :items="academicData">
                                            <template #board>
                                                <VCheckbox class="filter_checkbox" v-model="selectedBoard" value="CBSE"
                                                    label="CBSE" />
                                                <VCheckbox class="filter_checkbox" v-model="selectedBoard" value="ICSE"
                                                    label="ICSE" />
                                                <p @click="openBoardFilterModal" class="acadameic_accord_see_more">See
                                                    More...
                                                </p>
                                            </template>
                                            <template #classes>
                                                <VCheckbox class="filter_checkbox" v-model="selectedClass"
                                                    value="Class 1" label="Class 1" />
                                                <VCheckbox class="filter_checkbox" v-model="selectedClass"
                                                    value="Class 2" label="Class 2" />
                                                <p @click="openClassFilterModal" class="acadameic_accord_see_more">See
                                                    More...
                                                </p>
                                            </template>
                                        </UAccordion>
                                    </template>
                                    <template #price></template>
                                    <template #ratings></template>
                                    <template #videoDuration></template>
                                </UAccordion>
                            </VCardText>
                        </VCard>
                        <v-dialog persistent class="filter_dialog course_dialog_card" v-model="filterModalIsOpen">
                            <VCard class="filter_dialog_card">
                                <img @click="filterModalIsOpen = false" class="filter_dialog_canel_img"
                                    src="/images/modal_cancel.png" />
                                <VCardTitle class="filter_card_title">
                                    <div class="filter_card_title_div">
                                        <h1 class="filter_card_title_h">academic courses / board</h1>
                                    </div>
                                </VCardTitle>
                                <VCardText class="filter_card_text">
                                    <div class="filter_card_text_div">
                                        <div class="checkbox_div">
                                            <!-- <label class="filter_chekbox_label">CBSE
                                            <input class="filter_chekbox" type="checkbox" />
                                            <span class="filter_checkmark"></span>
                                        </label> -->
                                            <div v-for="(item) in allBoards" :key="item.id" class="d-flex">
                                                <div class="filter_chekbox_label">
                                                    <label>
                                                        <input class="filter_chekbox" type="checkbox" />
                                                        <span class="filter_checkmark"></span>
                                                    </label>
                                                </div>
                                                <label class="filter_chekbox_text">{{ item.name }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </VCardText>
                            </VCard>
                        </v-dialog>

                        <v-dialog class="course_dialog_card" v-model="totalClassModalIsOpen">
                            <VCard class="filter_dialog_card">
                                <img @click="totalClassModalIsOpen = false" class="filter_dialog_canel_img"
                                    src="/images/modal_cancel.png" />
                                <VCardTitle class="filter_card_title">
                                    <div class="filter_card_title_div">
                                        <h1 class="filter_card_title_h">academic courses / class</h1>
                                    </div>
                                </VCardTitle>
                                <VCardText class="filter_card_text">
                                    <div class="filter_card_text_div">
                                        <div class="checkbox_div">
                                            <div v-for="(item) in allClasses" :key="item.id" class="d-flex">
                                                <div class="filter_chekbox_label">
                                                    <label>
                                                        <input class="filter_chekbox" type="checkbox" />
                                                        <span class="filter_checkmark"></span>
                                                    </label>
                                                </div>
                                                <label class="filter_chekbox_text">{{ item.name }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </VCardText>
                            </VCard>
                        </v-dialog>
                    </div>
                    <div class="col-md-9">
                        <TotalCourses />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.total_course_gap {
    row-gap: 40px;
    column-gap: 40px;
}

.filter_checkbox {
    height: unset !important;
    --v-input-control-height: unset !important;
}

.filter_dialog_canel_img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 9px;
    right: 10px;
}

.filter_dialog_canel_img:hover {
    cursor: pointer;
}

label.filter_chekbox_text {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 150%;
    letter-spacing: 1px;
    color: #000;
}

.filter_chekbox_label .filter_checkmark::after {
    left: 5px;
    top: 0px;
    width: 7px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}

.filter_chekbox_label input:checked~.filter_checkmark::after {
    display: block;
}

.filter_checkmark::after {
    content: "";
    position: absolute;
    display: none;
}

.filter_chekbox_label input:checked~.filter_checkmark {
    background: #F87126;
}

.filter_checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: transparent;
    border: 2px solid #F87126;
    border-radius: 2px;
    margin-left: -24px;

}

.filter_chekbox_label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.filter_chekbox_label {
    position: relative;
    margin-left: 23px;
}

.filter_card_text_div {
    margin-top: 40px;
}

.checkbox_div {
    width: fit-content;
    display: flex;
    /* align-items: center; */
    column-gap: 65px;
    flex-wrap: wrap;
    row-gap: 40px;
}

.filter_card_text {
    padding: 0 !important;
}

.filter_card_title {
    padding: 0;
}

.filter_card_title_div {
    width: fit-content;
    padding: 4px 10px;
    border-bottom: 1px solid #F87126;
}

h1.filter_card_title_h {
    font-size: 24px;
    font-weight: 600;
    text-transform: capitalize;
    color: #000;
}

.filter_dialog_card {
    width: 845px;
    background: url(/images/course-filter.png);
    padding: 50px 60px 60px 60px;
    position: relative;
}

p.acadameic_accord_see_more {
    font-size: 12px;
    font-weight: 600;
    color: #007AFF;
}

p.acadameic_accord_see_more:hover {
    cursor: pointer;
}



.course_filter_card_text {
    padding: 0;
}

h1.course_filter_h {
    font-size: 19px;
    font-weight: 800;
    color: #F87126;
    margin: 0;
}

button.course_filter_btn {
    font-size: 12px;
    font-weight: 400;
    color: #DA5323;
    font-family: var(--Montserrat);
}

.course_filter_card {
    padding: 15px;
    background: #F8F8F7;
    position: sticky;
    top: 0;
    box-shadow: 0 4px 11px #00000025;
}

.course_filter_div {
    display: flex;
    align-items: center;
    column-gap: 9px;
}

.courses_section_two {
    padding-top: 30px;
    padding-bottom: 30px;
}

.course_filter_card_title {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.courses_section_one {
    min-width: 100%;
    background-image: url(/images/course_page_bg.png);
    background-size: cover
}

.course_pg_div {
    width: 728px;
    background: #fff;
    padding: 30px 20px;
    text-align: center;
}

h1.course_pg_h {
    font-size: 38px;
    font-weight: 800;
    line-height: 150%;
    color: #000;
    margin-bottom: 9px;
}

.course_pg_h span {
    color: #F87126;
}

p.course_pg_p {
    font-size: 20px;
    font-weight: 400;
    padding: 0 41.5px;
    color: #757373;
}
</style>