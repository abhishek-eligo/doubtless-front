<template>
    <div class="container d-flex flex-wrap justify-content-around mt-5">
        <div class="advantage-card">
            <div class="relativePosition" style="align-items: center;">
                <img :src="image" />
            </div>
            <div class="p-3">
                <p class="adv_text">{{ para }}</p>
            </div>
        </div>
    </div>
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

</style>