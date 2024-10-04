<script setup>
const relatedCourses = ref([
    { id: 1, title: 'Drawing & Craft' },
    { id: 2, title: 'English' },
    { id: 3, title: 'Science' },
])

const course_info_description = ref([
    { id: 1, title: 'Basic Addition and Subtraction', desc: `Introduction to the world of addition and subtraction, where students will learn to combine and separate quantities. Using visual aids like counting blocks and number lines, they'll grasp the basics of adding and subtracting within 20.`, },
    { id: 2, title: 'Identifying and Drawing Shapes', desc: `Students will explore the world of geometry by identifying, drawing, and describing basic shapes like circles, squares, triangles, and rectangles. They’ll also learn about the properties of these shapes, such as the number of sides and corners.`, },
    { id: 3, title: 'Understanding Patterns', desc: `Patterns are a fun and important part of math. Students will learn to recognize, create, and extend simple patterns, helping them develop critical thinking and problem-solving skills.`, },
    { id: 4, title: 'Sorting and Classifying', desc: `Sorting and classifying objects based on attributes like size, shape, and color will help students develop their analytical skills. These activities also lay the groundwork for more advanced math concepts later on.`, },
])

const courseTutorVariants = ref([
    { id: 1, title: '4.7 Instructor Rating', image: '/images/blackStar.png' },
    { id: 2, title: '534 Reviews', image: '/images/tutor_rating.png' },
    { id: 3, title: '755 Students', image: '/images/tutor_student.png' },
    { id: 4, title: '12 Courses', image: '/images/tutor_total_crse.png' },
])
</script>

<template>
    <div>
        <div class="courseInfo_section">
            <div class="wrapper py-10">
                <div class="course_info_left_sec">
                    <div class="d-flex justify-center">
                        <img src="/images/OBJECTS.png" />
                    </div>
                    <h1>Fun with Numbers and Shapes<br>
                        Early <span class="orangeShade">Math Adventurest</span></h1>
                    <p>Explore numbers and shapes through engaging activities, building a strong foundation in early
                        math concepts.</p>
                </div>
            </div>
        </div>
        <div class="section_two">
            <div class="wrapper">
                <div class="row">
                    <div class="col-md-8 px-0">
                        <div>
                            <h1 class="course_relate_chip">explore related <span class="orangeShade">courses</span></h1>
                            <div class="d-flex">
                                <UButton v-for="(item, index) in relatedCourses" :key="index"
                                    class="course_related_chip">{{ item.title }}</UButton>
                            </div>
                        </div>

                        <div class="include_space marginTop_space">
                            <h1 class="course_contains_title_mb">this course includes :</h1>
                            <ul>
                                <li>
                                    <img src="/images/video_tym.png" class="crseTypeimgSize" />
                                    5 hours on-demand video
                                </li>
                                <li>
                                    <img src="/images/course_tab_img.png" class="crseTypeimgSize" />
                                    Access on mobile and tablet
                                </li>
                                <li>
                                    <img src="/images/course_pdf_img.png" class="crseTypeimgSize" />
                                    12 pdf books
                                </li>
                                <li>
                                    <img src="/images/course_ppt_img.png" class="crseTypeimgSize" />
                                    10 ppt slide sheets
                                </li>
                            </ul>
                        </div>

                        <div class="description_sec marginTop_space">
                            <h1 class="course_info_desc_title">description :</h1>
                            <p class="course_subtitle">First-Grade Math Courses <span>Building a Strong
                                    Foundation</span></p>
                            <p class="course_desc_text">Our first-grade math courses are designed to make learning fun
                                and engaging, helping young learners build a solid foundation in essential math
                                concepts. Through a mix of interactive activities, visual aids, and hands-on practice,
                                students will develop key skills that are crucial for their mathematical journey ahead.
                            </p>
                        </div>

                        <div class="course_highlight_sec">
                            <p class="course_subtitle d-flex">
                                <img src="/images/notes.png" class="crseTypeimgSize" />
                                Course Highlights:
                            </p>
                            <ul>
                                <li v-for="(item, index) in course_info_description" :key="index"  class="course_desc_text">
                                    <span class="highlight_text">{{ item.title }}:</span>
                                    {{ item.desc }}
                                </li>
                            </ul>
                            <p class="course_desc_text">
                                Our first-grade math courses are designed to be interactive, engaging, and aligned with
                                educational standards, ensuring that students not only learn but also enjoy the process.
                                By the end of the course, students will have a strong grasp of basic math concepts,
                                setting them up for success in their future studies.
                            </p>
                        </div>

                        <div class="instructor_sec">
                            <h1 class="course_contains_title_mb">Instructor</h1>
                            <UCard class="course_info_tutor_card">
                                <div class="d-flex">
                                    <div class="tutor_image_border_div">
                                        <img class="card_tutor_img_size" src="/images/course_tutor_img.png" />
                                    </div>
                                    <div class="course_tutor_info_div">
                                        <div class="course_tutor_info_inner_div">
                                            <h3 class="course_tutor_name">amayra Singh</h3>
                                            <p class="course_tutor_info_text">
                                                <span class="course_tutor_info_text_mr">Elementary School Teacher</span>
                                                <span class="">Math and Science Specialist</span>
                                            </p>
                                        </div>
                                        <ul class="d-flex tutor_variant_list mb-0">
                                            <li v-for="(item, index) in courseTutorVariants" :key="index" class="d-flex align-center">
                                                <img class="tutor_desc_icon_size" :src="item.image" />
                                                <p class="course_info_tutor_desc_text">{{ item.title }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </UCard>

                        </div>
                        <p class="name_desc">
                            I am amayra Singh, an experienced online course instructor specializing in math’s and
                            science. With over 6 years in education, I excel at creating engaging and interactive
                            learning experiences. My background includes a b.ed & m.ed from University of California,
                            Berkeley and a proven track record in developing high-quality online courses.<br>
                            My teaching philosophy focuses on personalized learning, leveraging multimedia tools and
                            real-world examples to make complex topics accessible and interesting. I am adept at using
                            platforms like [LMS, e.g., Moodle] and tools such as [Video Conferencing, e.g., Zoom] to
                            enhance student engagement.
                            Students appreciate my clear explanations and responsive feedback. I am committed to
                            continuous professional development to stay current with educational trends. For course
                            inquiries or collaborations,<br>
                            please contact me at <span mailto:class="blue_email">amayrasinghteh32@gmail.com.</span>
                        </p>

                        <div class="featured_review_div">
                            <h1 class="review_deatured_mb">Featured review</h1>
                            <div class="d-flex justify-between flex-wrap">
                                <TutorReviewCard />
                            </div>
                            <UButton class="review_more_btn">see more review</UButton>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <AddToCartCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.review_more_btn {
    padding: 5px 15px;
    background: #fff !important;
    box-shadow: none !important;
    border: 1px solid #757373;
    border-radius: 4px;
    color: #757373 !important;
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 600;
    font-family: var(--Montserrat);
}
.review_deatured_mb {
    margin-bottom: 15px !important;
}
.course_contains_title_mb {
    margin-bottom: 20px !important;
}
.featured_review_div {
    margin-top: 30px;
    padding: 30px;
    border: 1px solid #75737353;
    border-radius: 6px;
    margin-bottom: 46px;
}
.blue_email {
    color: #007AFF;
    text-transform: none;
}
.tutor_variant_list {
    column-gap: 35px;
}
p.course_info_tutor_desc_text {
    font-size: 15px;
    font-weight: 400;
    color: #E8E8E8;
    text-transform: capitalize;
    margin-left: 5px !important;
}
img.tutor_desc_icon_size {
    width: 17px;
    height: 17px;
}
img.card_tutor_img_size {
    border-radius: 5px;
}

.tutor_image_border_div {
    margin: 3px 0 3px 3px;
}
p.course_tutor_info_text {
    color: #fff;
    font-size: 18px;
    font-weight: 400;
}
span.course_tutor_info_text_mr {
    padding-right: 5px;
    margin-right: 5px;
    border-right: 1px solid #fff;
}
h3.course_tutor_name {
    font-size: 25px;
    text-transform: capitalize;
    color: #fff;
    font-weight: 600;
    margin-bottom: 9px;
}
.course_tutor_info_div {
    margin-left: 21px;
}

.course_tutor_info_inner_div {
    margin: 13px 0 50px 0;
}
h1.course_info_desc_title {
    margin-bottom: 20px;
}
img.crseTypeimgSize {
    width: 19px;
    height: 19px;
}

.course_related_chip {
    border: 1px solid #F87126;
    background: transparent !important;
    color: #F87126 !important;
    box-shadow: none !important;
    padding: 10px 30px;
    border-radius: 50px;
    width: fit-content;
    font-size: 18px;
    font-weight: 500;
    margin-right: 25px;
    font-family: var(--Montserrat);
}

.course_related_chip:hover {
    background: #F87126 !important;
    border: 1px solid #F87126;
    color: #fff !important;
    transition: 0.3s;
}

.course_related_chip .v-chip__content {
    color: #F87126;
    font-size: 18px;
    font-weight: 500;
}

h1.course_relate_chip {
    margin-bottom: 20px !important;
}

.course_info_left_sec {
    width: 100%;
    max-width: 728px;
    background: #fff;
    padding: 30px 20px;
}

.courseInfo_section {
    background-image: url('/images/crse_info_bg.png');
    background-size: cover;
    background-position: center;
}

.marginTop_space {
    margin-top: 30px !important;
}

.include_space ul {
    margin: 0 !important;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 497px;
    flex-wrap: wrap;
    gap: 10px;
    min-width: 500px;
}

.include_space li {
    display: flex;
    gap: 8px;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    text-transform: capitalize;
}

.include_space li:nth-child(3) {
    grid-column: 1 / span 2;
}

.course_highlight_sec {
    margin: 20px 0 30px 0 !important;
    padding-bottom: 50px;
    border-bottom: 1px solid #757373;
}

.course_highlight_sec p.course_subtitle {
    gap: 8px !important;
}

p.course_subtitle {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    color: var(--black);
    margin: 0 0 15px 0 !important;
}

.tutor_dec_card {
    max-width: 269px !important;
}

.description_sec span {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: var(--black);
}

.course_desc_text {
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px;
    text-align: left;
    color: var(--tutorTextClr);
}

.course_highlight_sec li {
    margin: 0 0 18px 0 !important;
}

span.highlight_text {
    font-size: 15px;
    font-weight: 500;
    line-height: 22.5px;
    text-align: left;
    color: var(--black);
}

.colured_name {
    font-size: 24px;
    font-weight: 600;
    line-height: 28.8px;
    text-align: left;
    text-transform: capitalize;
    color: var(--default_color);
}

.name_desc {
    font-size: 16px;
    font-weight: 300;
    line-height: 150%;
    text-align: left;
    color: var(--tutorTextClr);
    padding: 15px 31px 20px 15px;
    background-color: #F9F8F8;
    text-transform: capitalize;
}

img .instructor_size {
    width: 96px !important;
    height: 96px !important;
    border-radius: 50% !important;
}
</style>