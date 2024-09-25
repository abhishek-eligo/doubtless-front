<template>
    <!-- <div class="container d-flex flex-wrap justify-content-around mt-5">
        <div class="advantage-card">
            <div class="relativePosition" style="align-items: center;">
                <img :src="image" />
            </div>
            <div class="p-3">
                <p class="adv_text">{{ para }}</p>
            </div>
        </div>
    </div> -->

    <VCard class="adv_card">
        <VCardTitle class="d-flex justify-center">
            <img :src="image" />
        </VCardTitle>
        <VCardText class="px-0 py-0">
            <p class="adv_text">{{ para }}</p>
        </VCardText>
    </VCard>
</template>

<script>
export default {
    props: {
        image: String,
        para: String
    }
}
</script>

<style scoped>
.adv_card {
    width: 100%;
    max-width: 245px;
    background: #EAE8E8;
    border-radius: 49px;
    padding: 30px 10px 21px 10px;
    box-shadow: 0 7px 6px -2px #d9d9d9 !important;
}
</style>