<script>
export default {
    props: {
        title: String,
        text: String
    }
}
</script>

<template>
        <div class="course-type">
            <div class="left-side">
                <h1 class="course_type_h">{{ title}}</h1>
                <p class="course_type_p">{{ text }}</p>
            </div>
        </div>
</template>

<style scoped>
.freeCard {
    width: 100%;
    min-width: 270px;
    border-left: 5px solid #F87126;
    border-radius: 0;
    padding: 35px 19px;
}

</style>