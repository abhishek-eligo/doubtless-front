<style scoped></style>

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
    </div>
</template>

<style scoped>
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