<script setup>
import { ref } from 'vue';

const allStories = ref([
    { id: '1', title: '', description: 'Doubtless played a very important role in my NEET preparation. The personalized program and the video lessons helped me learn the most complex of concepts in an easy way. The AITS held at a national level allowed me to set a standard for myself and identify areas of improvement.', userName: 'Nmrita Bishnoi', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'NEET', avatarImg: '/images/suces_profile.png' },
    { id: '2', title: '"Incredibly Effective Learning Platform!"', description: 'The Doubtless app has completely transformed my preparation for the SSC CGL exam. The interactive classes, detailed explanations, and instant doubt resolution features are incredibly effective. I feel much more confident and prepared now!', userName: 'Ravi kishan', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'SSC CGL', avatarImg: '/images/suces_profile.png' },
    { id: '3', title: '', description: 'The videos on the Doubtless app aided in improving my weak areas in Chemistry. It was helpful in my preparation and I got to learn concepts in a different way. Practicing with mock tests and the AITS, along with the extensive analysis, helped me identify my weak and strong areas.', userName: 'Kundan Mahatre', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'JEE', avatarImg: '/images/suces_profile.png' },
    { id: '4', title: '"Top-notch Faculty and Comprehensive Study Material"', description: 'Thanks to the top-notch faculty and comprehensive study material provided by the Doubtless app, I was able to grasp even the most difficult concepts with ease. The practice tests and mock exams were particularly helpful in boosting my confidence.', userName: 'Priya', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'SSC CGL', avatarImg: '/images/suces_profile.png' },
    { id: '5', title: '', description: 'Joining the IAS online class on Doubtless App was the best decision I made. The interactive live sessions and the extensive library of recorded lectures ensured I never missed out on any topic. The mentors were always available to clarify doubts, making the learning experience seamless..', userName: 'Arjun Sharma', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'IAS', avatarImg: '/images/suces_profile.png' },
    { id: '6', title: '“Highly Recommend for NEET Aspirants”', description: 'The structured study plan and comprehensive test series offered by Doubtless App were instrumental in my NEET preparation. The quality of teaching and the personalized attention I received made all the difference.', userName: 'Karuna Mahatri ', userDesc: 'AIR 28 - NEET 2023', sheetDesc: ' NEET', avatarImg: '/images/suces_profile.png' },
    { id: '7', title: '', description: 'The NDA course on Doubtless App is comprehensive and well-organized. The flexibility to learn at my own pace and the support from instructors made a significant difference in my preparation.', userName: 'Aditiya', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'NDA', avatarImg: '/images/suces_profile.png' },
    { id: '8', title: '“Outstanding Faculty and Support”', description: 'The faculty at Doubtless App is exceptional. Their deep understanding of the NEET syllabus and unique teaching methods helped me secure a top rank. The doubt-solving sessions were particularly beneficial.', userName: 'Shiva', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'NEET', avatarImg: '/images/suces_profile.png' },
    { id: '9', title: '', description: 'The videos on the Doubtless app aided in improving my weak areas in Chemistry. It was helpful in my preparation and I got to learn concepts in a different way. Practicing with mock tests and the AITS, along with the extensive analysis, helped me identify my weak and strong areas.', userName: 'Kundan Mahatre', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'JEE', avatarImg: '/images/suces_profile.png' },
])

const currentStart = ref(0);
const visibleCount = ref(3);
const slidingLeft = ref(false);
const slidingRight = ref(false);

const canSlideRight = computed(() => {
    return currentStart.value + visibleCount.value < allStories.value.length;
})

const canSlideLeft = computed(() => {
    return currentStart.value > 0;
})

const visibleItems = computed(() => {
    return allStories.value.slice(currentStart.value, currentStart.value + visibleCount.value);
})

const slideRight = () => {
    if (canSlideRight.value) {
        slidingRight.value = true;
        setTimeout(() => {
            currentStart.value += visibleCount.value;
            slidingRight.value = false;
        }, 200);
    }
}

const slideLeft = () => {
    if (canSlideLeft.value) {
        slidingLeft.value = true;
        setTimeout(() => {
            currentStart.value -= visibleCount.value;
            slidingLeft.value = false;
        }, 200);
    }
}

const totalPages = computed(() => {
    return Math.ceil(allStories.value.length / visibleCount.value);
});

const currentPage = computed(() => {
    return Math.floor(currentStart.value / visibleCount.value);
});

</script>

<template>
    <div class="row flex-wrap story_card_img">
        <div class="stort_btn_div">

            <!-- Prev Btn -->
            <button :disabled="!canSlideLeft" :class="!canSlideLeft ? 'disable_btn' : ''" @click="slideLeft" class="success_btn_1">
                <img src="/images/success_next.png" />
            </button>

            <!-- Next Btn -->
            <button :class="!canSlideRight ? 'disable_btn' : ''" @click="slideRight" class="success_btn_2">
                <img src="/images/success_next.png" />
            </button>
        </div>
        <SuccessStoryCard v-for="story in visibleItems" :key="story.id" :title="story.title"
            :description="story.description" :userName="story.userName" :userDesc="story.userDesc"
            :avatarImg="story.avatarImg" :sheetDesc="story.sheetDesc" />

        <div>
            <div class="pagination d-flex justify-center">
                <span v-for="(page, index) in totalPages" :key="index"
                    :class="{ 'active': index == currentPage }"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.disable_btn {
    opacity: 0.5;
}

.stort_btn_div {
    text-align: end;
    position: absolute;
    top: -99px;
    right: 0;
}

button.success_btn_1 {
    padding: 13px 23px;
    border: 1px solid #F87126;
    border-radius: 5px;
}

.success_btn_1 img {
    transform: rotate(180deg);
}

button.success_btn_2 {
    margin-left: 9px;
    padding: 13px 23px;
    border: 1px solid #F87126;
    border-radius: 5px;
}

.story_card_img {
    position: relative;
}



.pagination span {
    display: inline-block;
    position: relative;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #FDCCAB;
    border-radius: 50%;
    margin-right: 5px;
}

.pagination span.active {
    background: #F87126;
}
</style>