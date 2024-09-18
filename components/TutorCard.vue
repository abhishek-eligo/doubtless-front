<template>
    <div class="container d-flex flex-wrap justify-content-around mt-5">
        <div class="course-card">
            <div>
                <img :src="image" alt="Course Image">
            </div>
            <div class="p-3">
                <h5 class="tutor_title mb-1">{{ title }}</h5>
                <div class="meta mb-0">
                    <p class="d-flex tutor_text gap-1 justify-content-between mb-0">
                        <img src='/images/tutor_bag.png' />
                        {{ experience }} years experience</p>
                    <img class="cardArrow imgSize" src="/images/tutor_icon.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: String,
        title: String,
        experience: String,
    }
}
</script>

<style scoped>

</style>