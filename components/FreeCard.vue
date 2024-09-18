<script>
export default {
    props: {
        title: String,
        text: String
    }
}
</script>

<template>
        <div class="course-type ">
            <div class="left-side">
                <h1>{{ title}}</h1>
                <p>{{ text }}</p>
            </div>
        </div>
</template>

<style scoped>


</style>