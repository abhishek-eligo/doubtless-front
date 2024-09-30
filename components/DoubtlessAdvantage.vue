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
    <div class="d-flex flex-wrap justify-between">
        <VCard class="adv_card curve_img_1">
            <VCardTitle class="d-flex justify-center">
                <img src="/images/adv-1.png" />
            </VCardTitle>
            <VCardText class="px-0 py-0">
                <p class="adv_text">Visualizing concepts aids understanding by making abstract ideas concrete.</p>
            </VCardText>
        </VCard>
        <VCard class="adv_card curve_img_2">
            <VCardTitle class="d-flex justify-center">
                <img src="/images/adv-2.png" />
            </VCardTitle>
            <VCardText class="px-0 py-0">
                <p class="adv_text">Tailored education program adapting to individual student needs and pace.</p>
            </VCardText>
        </VCard>
        <VCard class="adv_card curve_img_3">
            <VCardTitle class="d-flex justify-center">
                <img src="/images/adv-3.png" />
            </VCardTitle>
            <VCardText class="px-0 py-0">
                <p class="adv_text">Personalized, focused care tailored uniquely to each individual's needs.</p>
            </VCardText>
        </VCard>
        <VCard class="adv_card curve_img_4">
            <VCardTitle class="d-flex justify-center">
                <img src="/images/adv-4.png" />
            </VCardTitle>
            <VCardText class="px-0 py-0">
                <p class="adv_text">Online courses let you explore fields and hobbies before committing fully.</p>
            </VCardText>
        </VCard>
        <VCard class="adv_card curve_img_5">
            <VCardTitle class="d-flex justify-center">
                <img src="/images/adv-3.png" />
            </VCardTitle>
            <VCardText class="px-0 py-0">
                <p class="adv_text">Courses in your language use familiar examples, making learning easier.</p>
            </VCardText>
        </VCard>
    </div>
</template>

<script>
</script>

<style scoped>
.curve_img_1::before {
    content: '';
    background-image: url(/images/adv_curve.png);
    top: -41px;
    position: absolute;
    left: -11px;
    width: 100%;
    height: 100%;
}
.curve_img_2::before {
    content: '';
    background-image: url(/images/curve_2.png);
    top: -41px;
    position: absolute;
    left: -11px;
    width: 100%;
    height: 100%;
}
.curve_img_3::before {
    content: '';
    background-image: url(/images/curve_3.png);
    top: -41px;
    position: absolute;
    left: -11px;
    width: 100%;
    height: 100%;
}
.curve_img_4::before {
    content: '';
    background-image: url(/images/curve_4.png);
    top: -41px;
    position: absolute;
    left: -11px;
    width: 100%;
    height: 100%;
}
.curve_img_5::before {
    content: '';
    background-image: url(/images/curve_5.png);
    top: -41px;
    position: absolute;
    left: -11px;
    width: 100%;
    height: 100%;
}

.adv_card {
    width: 100%;
    max-width: 246px;
    background: #EAE8E8;
    border-radius: 49px;
    padding: 30px 10px 21px 10px;
    box-shadow: 0 7px 6px -2px #d9d9d9 !important;
    position: relative;
    overflow: visible;
}
</style>