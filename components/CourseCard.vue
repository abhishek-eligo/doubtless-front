<template>
    <div class="container parentCard px-0 mt-5">
        <div class="course-card">
            <div class="position-relative">
                <img :src="image" alt="Course Image">
                <!-- <span class="badge">{{ offPercent }} % off</span> -->
            </div>
            <div>
                <h5 class="title_space mb-0 course-title">{{ title }}</h5>
                <div class="d-flex align-center gap-2 tutorName">
                    <img class="imgSize" src="/images/tutor_pic.png" />
                    <p class="mb-0">{{ tutorName }}</p>
                </div>
                <div class="meta tutor_meta_space">
                    <p class="d-flex meta_text align-center">{{ rating }}<img class="imgSize py-0"
                            src="/images/crse_star.png" />
                    </p>
                    <p class="d-flex meta_text tutorHatSize align-center"><img
                            src="/images/tutor_hat.png" />410 Enroll</p>
                </div>
                <div class="pricingSec px-3 d-flex justify-content-between">
                    <p class="mb-0">₹ 399 /- <span class="old_price">₹ 599 /-</span></p>
                    <span class="off_badge">{{ offPercent }}% off</span>
                </div>
            </div>
        </div>
        <div class="description_card">
            <v-card class="course-card course_info">
                <div class="overviewData">
                    <h1>{{ title }}</h1>
                    <p class="orangeShade course_1_text">updated : <span>June 2024</span></p>
                    <p class="course_2_text">by : {{ tutorName }}</p>
                    <ul>
                        <li class="course_info_li_mb">Develop fine motor skills through simple cutting, coloring, and pasting projects.</li>
                        <li class="course_info_li_mb">Develop fine motor skills through simple cutting, coloring, and pasting projects.</li>
                        <li class="course_info_li_mb">Develop fine motor skills through simple cutting, coloring, and pasting projects.</li>
                        <li class="course_info_li_mb">Develop fine motor skills through simple cutting, coloring, and pasting projects.</li>
                        <li>Develop fine motor skills through simple cutting, coloring, and pasting projects.</li>
                    </ul>
                </div>
                <div class="d-flex justify-content-between">
                    <button class="course_info_btn">view more</button>
                    <button class="course_info_btn">Add to cart</button>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: String,
        title: String,
        rating: String,
        offPercent: String,
        tutorName: String
    }
}
</script>

<style scoped>
.course_info_btn {
    font-size: 16px;
    color: #F87126;
    border: 2px solid;
    border-radius: 4px;
    padding: 15px 20px;
    text-transform: uppercase;
    font-weight: 600;
}

.course_info_btn:hover {
    background: #F87126;
    color: #ffffff;
}
.course_1_text span {
    font-weight: 600;
}
</style>