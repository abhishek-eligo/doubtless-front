<script setup>
const tutorReviews = ref([
    { id: 1, title: 'komal Singh', dayCount: '3 days ago', desc: 'I am thrilled with the progress my child has made in this first-grade program. The lessons are engaging and age-appropriate, making learning enjoyable for my little one. The interactive activities have helped build a strong foundation in math and reading.' },
    { id: 2, title: 'komal Singh', dayCount: '3 days ago', desc: 'I am thrilled with the progress my child has made in this first-grade program. The lessons are engaging and age-appropriate, making learning enjoyable for my little one. The interactive activities have helped build a strong foundation in math and reading.' },
    { id: 3, title: 'komal Singh', dayCount: '3 days ago', desc: 'I am thrilled with the progress my child has made in this first-grade program. The lessons are engaging and age-appropriate, making learning enjoyable for my little one. The interactive activities have helped build a strong foundation in math and reading.' },
    { id: 4, title: 'komal Singh', dayCount: '3 days ago', desc: 'I am thrilled with the progress my child has made in this first-grade program. The lessons are engaging and age-appropriate, making learning enjoyable for my little one. The interactive activities have helped build a strong foundation in math and reading.' },
])
</script>

<template>
    <UCard class="review_card" v-for="(item, index) in tutorReviews" :key="index">
        <div class="review_card_name">
            <img src="/images/tutor_review.png" />
            <div>
                <h4 class="tutor_review_title">{{ item.title }}</h4>
                <p class="tutor_review_text d-flex align-center justify-between">
                    <span class="d-flex align-center">
                        4.7
                        <img class="review_rate_star" src="/images/crse_star.png" />
                    </span>
                    <span class="tutor_review_day">
                        {{ item.dayCount }}
                    </span>
                </p>
            </div>
        </div>
        <div class="tutor_review_desc">
            <p>
                {{ item.desc }}
            </p>
        </div>
    </UCard>
</template>

<style scoped>
.tutor_review_desc p {
    font-size: 14px;
    font-weight: 400;
    color: #757373;
    margin-top: 10px !important;
    text-transform: capitalize;
}
span.tutor_review_day {
    font-size: 11px;
    color: #757373;
    font-weight: 500;
}

p.tutor_review_text {
    font-size: 15px;
    font-weight: 500;
}

img.review_rate_star {
    width: 17px;
    height: 17px;
    margin-left: 5px !important;
}

h4.tutor_review_title {
    font-size: 25px;
    text-transform: capitalize;
    font-weight: 600;
    color: var(--default_color);
    margin-bottom: 4px;
}

.review_card {
    max-width: 384px;
    box-shadow: none !important;
    border-top: 1px solid;
    border-radius: 0 !important;
    margin-bottom: 48px;
}
</style>