<script setup>
const props = defineProps({
    title: {
        type: String,
    },
    desc: {
        type: String
    },
    enrolled: {
        type: String
    },
    expired: {
        type: String
    },
    progress: {
        type: String
    },
    rating: {
        type: String
    }
})
</script>

<template>
    <VCard class="my_learn_card">
        <VCardTitle class="my_learn_card_title">
            <div class="my_learn_card_title_div">
                <img class="my_learn_card_title_img" src="/images/myLearnimg.png" />
            </div>
        </VCardTitle>
        <VCardText class="my_learn_card_text">
            <h1 class="my_learn_card_h">{{ props.title }}</h1>
            <p class="my_learn_card_p">{{ props.desc }}</p>
            <div class="learn_card_desc">
                <p class="learn_card_desc_p">enrolled : {{ props.enrolled }}</p>
                <p class="learn_card_desc_p">expired : {{ props.expired }}</p>
            </div>
            <UProgress class="course_progress_bar" size="md" :indicator="false" :value="props.progress" />
            <div class="progres_report_div">
                <p class="progres_report_div_p">{{ props.progress }}% processed</p>
                <div class="progres_report_rating">
                    <v-rating hover class="progres_report_rating_star" :length="5" :size="18" :model-value="props.rating"  />
                    <p class="progres_report_rating_p">Add your review</p>
                </div>
            </div>
        </VCardText>
    </VCard>
</template>

<style scoped>
p.progres_report_rating_p {
    font-size: 11px;
    font-weight: 400;
    color: #F87126;
}
.progres_report_rating {
    text-align: right;
}
.progres_report_div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
}

p.progres_report_div_p {
    font-size: 12px;
    font-weight: 500;
    color: #757373;
}
.learn_card_desc {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-top: 0.5px solid #75737321;
    margin-top: 6px;
    margin-bottom: 15px;
}

p.learn_card_desc_p {
    font-size: 11px;
    text-transform: capitalize;
    font-weight: 400;
    color: #757373;
    line-height: 150%;
}
h1.my_learn_card_h {
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 600;
    line-height: 150%;
    color: #000;
}
p.my_learn_card_p {
    font-size: 12px;
    text-transform: capitalize;
    font-weight: 400;
    color: #757373;
    line-height: 150%;
}
.my_learn_card {
    width: 340px;
    padding: 12px;
    background: #FCFCFC !important;
    box-shadow: unset;
}

.my_learn_card_title {
    padding: 0;
    margin-bottom: 10px;
}

.my_learn_card_text {
    padding: 0;
}

.my_learn_card_title_div {
    width: fit-content;
    padding: 2px;
    background: transparent;
    border: 1px solid #757373;
}
</style>