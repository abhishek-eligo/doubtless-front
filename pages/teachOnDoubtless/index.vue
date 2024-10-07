<script setup>
const userTab = ref('');
const tabs = [
    { title: 'Plan Your Curriculum' },
    { title: 'Record Your Video' },
    { title: 'Prepare Your Course PPT & PDF' },
    { title: 'Launch Your Courses' },
]

const doubtlessDetails = ref([
    { title: '16', desc: 'best instructor' },
    { title: '5000', desc: 'enrollments' },
    { title: '10m', desc: 'students' },
    { title: '60', desc: 'courses' },
]);

const items = ref([
    { label: 'Plan Your Curriculum', slot: 'curriculum', defaultOpen: true },
    { label: 'Record Your Video', slot: 'video', defaultOpen: false },
    { label: 'Prepare Your Course PPT & PDF', slot: 'pdf', defaultOpen: false },
    { label: 'Launch Your Courses', slot: 'launch', defaultOpen: false },
]);

</script>

<template>
    <div>
        <div class="tob_section_one">
            <div class="wrapper">
                <div>
                    <v-row class="align-center">
                        <v-col class="d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center" lg="6">
                            <div class="teach_us_div">
                                <h1 class="teach_us_h">come teach with us </h1>
                                <p class="teach_us_p">Join Our Passionate Team of Expert Educators</p>
                                <UButton class="teach_us_btn">Get start</UButton>
                            </div>
                        </v-col>
                        <v-col class="d-flex justify-content-lg-center justify-content-md-center justify-content-sm-center" lg="6" cols="12">
                            <img src="/images/tob_bg.png" />
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>

        <div class="tob_section_two">
            <div class="wrapper">
                <h2 class="tob_section_two_h">so many <span>reason to start</span> with <span>Doubtless</span></h2>
                <div class="tob_card_outer_div">
                    <VCard class="teach_card before_card_curve_1">
                        <VCardTitle class="d-flex justify-center teach_card_title">
                            <img src="/images/tob_icon_1.png" />
                        </VCardTitle>
                        <VCardText class="teach_card_text">
                            <h3 class="teach_card_text_h">Teach Your Way</h3>
                            <p class="teach_card_text_p">Empower yourself to share knowledge and skills with others
                                through personalized and engaging teaching methods.</p>
                        </VCardText>
                    </VCard>

                    <VCard class="teach_card before_card_curve_2">
                        <VCardTitle class="d-flex justify-center teach_card_title">
                            <img src="/images/tob_icon_2.png" />
                        </VCardTitle>
                        <VCardText class="teach_card_text">
                            <h3 class="teach_card_text_h">Inspire Learners</h3>
                            <p class="teach_card_text_p">Empower your journey with expert-led courses, unlocking new
                                skills and possibilities for a brighter future.</p>
                        </VCardText>
                    </VCard>

                    <VCard class="teach_card before_card_curve_3">
                        <VCardTitle class="d-flex justify-center teach_card_title">
                            <img src="/images/tob_icon_3.png" />
                        </VCardTitle>
                        <VCardText class="teach_card_text">
                            <h3 class="teach_card_text_h">Get Rewarded</h3>
                            <p class="teach_card_text_p">Earn recognition and rewards as you guide students to success,
                                making a meaningful impact on their academic journey.</p>
                        </VCardText>
                    </VCard>
                </div>
            </div>
        </div>

        <div class="tob_section_three">
            <div class="wrapper">
                <h1 class="tob_section_3_h">how to
                    <span>begin</span>
                </h1>
                <VTabs v-model="userTab" class="totalTabs v-tabs-pill disable-tab-transition">
                    <VTab class="begin_tab" v-for="tab in tabs" :key="tab.title">{{ tab.title }}</VTab>
                </VTabs>
                <VWindow v-model="userTab" :touch="false">
                    <VWindowItem>
                        <VCard class="howToBeginCard">
                            <VCardText class="howToBeginCard_text d-flex">
                                <VCol class="d-flex" cols="6">
                                    <span class="begin_span_dot"></span>
                                    <div>
                                        <p class="begin_text">
                                            When planning your curriculum, focus on clear learning objectives and
                                            outcomes.
                                            Break down the content into manageable units that build on each other.
                                            Incorporate a variety of teaching methods to cater to different learning
                                            styles.
                                            Ensure the curriculum is aligned with the required standards and
                                            assessments.
                                            Allow flexibility for adjustments based on student progress and feedback.
                                            Lastly, include opportunities for review and reinforcement to help students
                                            retain and apply their knowledge effectively.
                                        </p>
                                    </div>
                                </VCol>
                                <VCol class="d-flex justify-end" cols="6">
                                    <img class="howToBeginCard_img" src="/images/curriculam.png" />
                                </VCol>
                            </VCardText>
                        </VCard>
                    </VWindowItem>

                    <VWindowItem>
                        <VCard class="howToBeginCard">
                            <VCardText class="howToBeginCard_text d-flex">
                                <VCol class="d-flex" cols="6">
                                    <span class="begin_span_dot"></span>
                                    <div>
                                        <p class="video_title">When creating your video for the students, please keep
                                            the following in mind:</p>
                                        <p class="begin_text">
                                            Ensure clarity in your explanations and maintain a positive, encouraging
                                            tone. Use simple language that's easy for students to understand. Stay on
                                            topic, focusing on the lesson's objectives. Incorporate visual aids or
                                            examples to help illustrate key points. Keep the video engaging but concise
                                            to hold the students' attention. Lastly, review the video for any errors
                                            before sharing it with the students to ensure a smooth learning experience.
                                        </p>
                                    </div>
                                </VCol>
                                <VCol class="d-flex justify-end" cols="6">
                                    <img class="howToBeginCard_img" src="/images/record_video.png" />
                                </VCol>
                            </VCardText>
                        </VCard>
                    </VWindowItem>

                    <VWindowItem>
                        <VCard class="howToBeginCard">
                            <VCardText class="howToBeginCard_text d-flex">
                                <VCol class="d-flex" cols="6">
                                    <span class="begin_span_dot"></span>
                                    <div>
                                        <p class="begin_text">
                                            When preparing your course PPT and PDF materials for students, please ensure
                                            that the content is clear, concise, and engaging. Focus on key concepts,
                                            include visuals to aid understanding, and use bullet points to highlight
                                            important information. Make sure the material is accessible and suitable for
                                            the students' age and comprehension level. Include examples and practice
                                            exercises to reinforce learning. Remember, the goal is to make the content
                                            easy to understand and engaging, so students can grasp the concepts
                                            effectively.
                                        </p>
                                    </div>
                                </VCol>
                                <VCol class="d-flex justify-end" cols="6">
                                    <img class="howToBeginCard_img" src="/images/ppt_pdf.png" />
                                </VCol>
                            </VCardText>
                        </VCard>
                    </VWindowItem>

                    <VWindowItem>
                        <VCard class="howToBeginCard">
                            <VCardText class="howToBeginCard_text d-flex">
                                <VCol cols="6">
                                    <p class="launch_p">Ensure Course Quality and Effective Teaching for Student Success
                                        with Every Course Launch.</p>
                                    <div class="d-flex">
                                        <span class="begin_span_dot"></span>
                                        <p class="begin_text">
                                            When preparing your course PPT and PDF materials for students, please
                                            ensure
                                            that the content is clear, concise, and engaging. Focus on key concepts,
                                            include visuals to aid understanding, and use bullet points to highlight
                                            important information. Make sure the material is accessible and suitable
                                            for
                                            the students' age and comprehension level. Include examples and practice
                                            exercises to reinforce learning. Remember, the goal is to make the
                                            content
                                            easy to understand and engaging, so students can grasp the concepts
                                            effectively.
                                        </p>
                                    </div>
                                </VCol>
                                <VCol class="d-flex justify-end" cols="6">
                                    <img class="howToBeginCard_img" src="/images/launch.png" />
                                </VCol>
                            </VCardText>
                        </VCard>
                    </VWindowItem>
                </VWindow>
            </div>
        </div>

        <div class="tob_section_accord">
            <div class="wrapper">
                <h1 class="tob_section_3_h">how to
                    <span>begin</span>
                </h1>
                <UAccordion class="tob_accord" :items="items">
                    <template #curriculum>
                        <div class="d-flex p-3">
                            <div class="tob_accord_w">
                                <p class="tob_accord_p">
                                    When planning your curriculum, focus on clear learning objectives and
                                    outcomes.
                                    Break down the content into manageable units that build on each other.
                                    Incorporate a variety of teaching methods to cater to different learning
                                    styles.
                                    Ensure the curriculum is aligned with the required standards and
                                    assessments.
                                    Allow flexibility for adjustments based on student progress and feedback.
                                    Lastly, include opportunities for review and reinforcement to help students
                                    retain and apply their knowledge effectively.
                                </p>
                            </div>
                            <div class=tob_accord_img_div>
                                <img src="/images/curriculam.png" />
                            </div>
                        </div>
                    </template>
                    <template #video>
                        <div class="d-flex p-3">
                            <div class="tob_accord_w">
                                <h4 class="tob_accord_h">When creating your video for the students, please keep the
                                    following in mind:</h4>
                                <p class="tob_accord_p">
                                    Ensure clarity in your explanations and maintain a positive, encouraging tone. Use
                                    simple language that's easy for students to understand. Stay on topic, focusing on
                                    the lesson's objectives. Incorporate visual aids or examples to help illustrate key
                                    points. Keep the video engaging but concise to hold the students' attention. Lastly,
                                    review the video for any errors before sharing it with the students to ensure a
                                    smooth learning experience.
                                </p>
                            </div>
                            <div class=tob_accord_img_div>
                                <img src="/images/record_video.png" />
                            </div>
                        </div>
                    </template>
                    <template #pdf>
                        <div class="d-flex p-3">
                            <div class="tob_accord_w">
                                <p class="tob_accord_p">
                                    When preparing your course PPT and PDF materials for students, please ensure that
                                    the content is clear, concise, and engaging. Focus on key concepts, include visuals
                                    to aid understanding, and use bullet points to highlight important information. Make
                                    sure the material is accessible and suitable for the students' age and comprehension
                                    level. Include examples and practice exercises to reinforce learning. Remember, the
                                    goal is to make the content easy to understand and engaging, so students can grasp
                                    the concepts effectively.
                                </p>
                            </div>
                            <div class=tob_accord_img_div>
                                <img src="/images/ppt_pdf.png" />
                            </div>
                        </div>
                    </template>
                    <template #launch>
                        <div class="d-flex p-3">
                            <div class="tob_accord_w">
                                <h4 class="tob_accord_h">When creating your video for the students, please keep the
                                    following in mind:</h4>
                                <p class="tob_accord_p">
                                    Ensure clarity in your explanations and maintain a positive, encouraging tone. Use
                                    simple language that's easy for students to understand. Stay on topic, focusing on
                                    the lesson's objectives. Incorporate visual aids or examples to help illustrate key
                                    points. Keep the video engaging but concise to hold the students' attention. Lastly,
                                    review the video for any errors before sharing it with the students to ensure a
                                    smooth learning experience.
                                </p>
                            </div>
                            <div class=tob_accord_img_div>
                                <img src="/images/launch.png" />
                            </div>
                        </div>
                    </template>
                </UAccordion>
            </div>
        </div>

        <div class="tob_section_four">
            <div class="wrapper">
                <VContainer class="px-0 py-0">
                    <div class="d-flex justify-content-evenly flex-wrap row-gap-4 gap-2">
                        <VCard v-for="item in doubtlessDetails" :key="item" class="doubtless_info_card">
                            <VCardText class="doubtless_info_card_text">
                                <h4 class="doubtless_info_card_h">{{ item.title }}+</h4>
                                <p class="doubtless_info_card_p">{{ item.desc }}</p>
                            </VCardText>
                            <div class="begin_card"></div>
                        </VCard>
                    </div>
                </VContainer>
            </div>
        </div>

        <div class="tob_section_five">
            <div class="wrapper">
                <div class="tob_join_tutor">
                    <h5 class="tob_join_tutor_title">Become an instructor today</h5>
                    <p class="tob_join_tutor_text">Empower Minds and Shape Futures—Start Your Journey as an Instructor
                        Today!</p>
                    <UButton class="tob_join_tutor_btn">Join as an Instructor</UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tob_join_tutor_btn {
    color: #F87126 !important;
    border: 2.3px solid #F87126;
    background: transparent !important;
    border-radius: 4.6px;
    padding: 17px 31px;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
}

.tob_join_tutor_btn:hover {
    color: #fff !important;
    border: 2.3px solid #F87126;
    background: #F87126 !important;
    border-radius: 4.6px;
    padding: 17px 31px;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    transition: 0.3s;
}

.tob_join_tutor {
    text-align: center;
}

h5.tob_join_tutor_title {
    font-size: 32px;
    font-weight: 800;
    color: #424040;
    margin-bottom: 11px;
}

p.tob_join_tutor_text {
    font-size: 18px;
    font-weight: 500;
    color: #424040;
    margin-bottom: 20px !important;
}

.tob_section_five {
    background: url(/images/tob_tutor_bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 40px;
    padding-bottom: 40px;
}

.doubtless_info_card::before {
    content: '';
    position: absolute;
    width: 218px;
    height: 5px;
    background: #FFC09D;
    bottom: 0;
    left: 0;
}

.begin_tab {
    padding: 4px 0 8px 0;
    border-radius: 0 0 5px 5px !important;
    border-bottom: 2px solid #f8702600 !important;
}

.begin_tab.v-tab--selected {
    border-radius: 0 0 5px 5px !important;
    border-bottom: 2px solid #F87126 !important;
}

.begin_card {}

.tob_section_four {
    padding-top: 30px;
    padding-bottom: 30px;
}

p.doubtless_info_card_p {
    font-size: 19px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
}

h4.doubtless_info_card_h {
    font-size: 45px;
    font-weight: 900;
    color: #4D4B4B;
    line-height: 150%;
}

.doubtless_info_card_text {
    padding: 0 10px;
}

.doubtless_info_card {
    background: #EFEFEF url(/images/quarter_circle.png);
    box-shadow: 0 4px 11px #00000010;
    border-radius: 0;
    background-repeat: no-repeat;
    background-position: top right;
    max-width: 250px;
    padding: 32px 12px 32px 10px;
    position: relative;
    width: 100%;
}

p.launch_p {
    font-size: 22px;
    font-weight: 600;
    color: #333232;
    margin-bottom: 20px !important;
}

p.video_title {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 47px !important;
}

p.begin_text {
    font-size: 20px;
    font-weight: 400;
    color: #333232;
    line-height: 150%;
}

.howToBeginCard_text {
    padding: 0;
    margin-bottom: 76px;
}

span.begin_span_dot {
    width: 72px;
    height: 11px;
    border: 1px solid;
    border-radius: 50%;
    margin-right: 15px;
    margin-top: 8px;
}

.howToBeginCard {
    background: transparent;
    margin-top: 30px;
    border: none !important;
}

/* .begin_tab {
    padding: 0;
} */

h1.tob_section_3_h {
    font-size: 42px;
    font-weight: 800;
    text-transform: capitalize;
    color: #000;
    margin-bottom: 25px;
}

.tob_section_3_h span {
    color: #F87126;
}


.tob_card_outer_div {
    display: flex;
    justify-content: space-around;
    padding: 40px 0;
    flex-wrap: wrap;
    row-gap: 60px;
}

.before_card_curve_1 {
    position: relative;
    overflow: visible;
}

.before_card_curve_2 {
    position: relative;
    overflow: visible;
}

.before_card_curve_3 {
    position: relative;
    overflow: visible;
}

.before_card_curve_1::before {
    content: '';
    position: absolute;
    background-image: url('/images/teah_curve_1.png');
    top: -47px;
    left: -16px;
    width: 100%;
    height: 100%;
}

.before_card_curve_2::before {
    content: '';
    position: absolute;
    background-image: url('/images/teah_curve_2.png');
    top: -47px;
    left: -16px;
    width: 100%;
    height: 100%;
}

.before_card_curve_3::before {
    content: '';
    position: absolute;
    background-image: url('/images/teah_curve_3.png');
    top: -47px;
    left: -16px;
    width: 100%;
    height: 100%;
}

h3.teach_card_text_h {
    font-size: 16px;
    font-weight: 800;
    color: #F87126;
    line-height: 140%;
    letter-spacing: 1px;
    margin-top: 1.39px;
    margin-bottom: 5px;
}

p.teach_card_text_p {
    font-size: 14px;
    font-weight: 500;
    color: #5C5A5A;
}

.teach_card_title {
    padding: 0;
}

.teach_card_text {
    padding: 0;
}

.teach_card {
    max-width: 371px;
    background: #F0EFEF;
    border-radius: 49px;
    box-shadow: 0px 4px 4px #00000025 !important;
    text-align: center;
    padding: 60px 45px 29px 45px;
}

.tob_section_one {
    background-color: #EDEDED;
}

.teach_us_div {
    padding: 30px;
    width: fit-content;
    background: #fff;
    text-align: center;
    margin-top: 20px;
}

h1.teach_us_h {
    font-size: 38px;
    font-weight: 800;
    text-transform: capitalize;
    color: #000;
    margin-bottom: 9px;
}

.teach_us_btn {
    padding: 10px 30px;
    background: #000 !important;
    border-radius: 0;
    font-size: 20px;
    font-weight: 600;
    border: 1px solid #000;
}

.teach_us_btn:hover {
    background: #fff !important;
    color: #000 !important;
    border: 1px solid #000;
    transition: 0.3s;
}

p.teach_us_p {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px !important;
}

h2.tob_section_two_h {
    font-size: 30px;
    font-weight: 800;
    text-transform: capitalize;
    text-align: center;
    color: #000;
    margin-bottom: 35px;
}

.tob_section_two {
    padding-top: 50px;
    padding-bottom: 50px;
}

.tob_section_two_h span {
    color: #F87126;
}
</style>