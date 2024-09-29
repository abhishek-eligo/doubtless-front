<script setup>


const courseTypes = [
    { id: '1', title: 'free courses', text: 'expert-led, and interactive.' },
    { id: '2', title: 'Practice & revision', text: 'get 24/7 study hours' },
    { id: '3', title: 'learn anytime, anywhere', text: '121 mentorship program' },
    { id: '4', title: 'free pdf books', text: 'personalized study plans (PSPs)' },
    { id: '5', title: 'NCERT Summary', text: 'effective preparation' },
    { id: '6', title: 'daily quizzes', text: 'prelims & mains benchmarking tests' },
]

const tabletListData = [
    { title: 'Flexible Learning', text: 'Access courses anytime, anywhere, with both online and offline capabilities' },
    { title: 'Crystal-Clear Display', text: 'Experience your content in stunning detail with our high-resolution screen.' },
    { title: 'Preloaded courses Content', text: 'Start learning immediately with essential courses and resources preloaded on the tablet.' },
    { title: 'Extended Battery Life', text: 'Enjoy extended learning sessions without the need for frequent recharging.' },
]
</script>

<template>
    <div>
        <div class="section_one">
            <div class="wrapper">
                <section class="hero-section pt-5">
                    <div class="container_one">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="col-md-8">
                                    <h1>Achieve Your Dreams Stay <br>
                                        <span>Focused</span> And Reach
                                        <span>Your Goals</span>
                                    </h1>
                                    <p>Doubtless offers a variety of online and offline courses tailored to
                                        your career
                                        needs.
                                        Whether you're starting, advancing, or changing paths, our programs equip you
                                        with the skills and knowledge for success.
                                        Learn at your own pace, on your own terms, and be prepared for every career
                                        moment with Doubtless.
                                    </p>
                                    <div class="d-flex gap-2">
                                        <!-- <button class="hdr_btn">Start now</button> -->
                                        <GooglePlay />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <div class="section_two pb-10">
            <div class="wrapper">
                <h1 class="">Discover Diverse
                    <span class="orangeShade">Academic Courses</span> Tailored<br> for Your Success
                </h1>
                <div>
                    <AcademicCourseSection />
                </div>
            </div>
        </div>

        <div class="wrapper">
            <div class="learn-section">
                <h2 class="learn_text_h">did you come to learn? you're in the right place. </h2>
                <p class="learn_text_p">Ready to expand your knowledge? You've arrived at the perfect spot. Dive in,
                    explore, and reach your
                    learning goals here.</p>
                <button class="hdr_btn">LEARN WHAT YOU WISH</button>
            </div>
        </div>

        <div class="section_two pb-10">
            <div class="wrapper">
                <h1>Enhance Your Expertise with Our<br> Comprehensive, Expert-Led
                    <span class="orangeShade">Skilled Courses</span>
                </h1>
                <div class="align-items-start ml-0">
                    <SkillCourseSection />
                </div>
            </div>
        </div>

        <div class="section_two tablet_outer_div">
            <div class="wrapper">
                <div class="row">
                    <div class="col-md-6">
                        <div class="tablet_div">
                            <h1>Meet the Doubtless <span class="orangeShade">Tablet</span></h1>
                            <p class="tablet_desc">Elevate your educational experience with the Doubtless tablet—a
                                versatile device
                                engineered for both students and educators.
                                Perfectly blending technology with learning, our tablet offers:</p>
                            <ul class="mb-0 tablet_ul">
                                <li v-for="list in tabletListData" :key="list" class="d-flex align-center">
                                    <img src="/images/tablet_icon.png" />
                                    <div class="tablet_text">
                                        <h2>{{ list.title }}</h2>
                                        <p>{{ list.text }}</p>
                                    </div>
                                </li>
                            </ul>
                            <button class="tablet_btn hdr_btn">Get Yours Today</button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="tablet_image_div d-flex justify-end align-center">
                            <img src="/images/tablet.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section_two mb-5 pb-10 mt-5">
            <div class="wrapper">
                <h1>Achieve Success in
                    <span class="orangeShade">Competitive Tests</span> with Our Expertly<br> Designed Study Programs
                </h1>
                <div class="align-items-start ml-0">
                    <CompetitiveCourseSection />
                </div>
            </div>
        </div>

        <div class="section_two mb-5 pb-10 mt-5">
            <div class="wrapper overflow-hidden">
                <h1>Kickstart Your Learning Path with
                    <span class="orangeShade">Experienced<br> Educators</span>
                </h1>
                <div class="ml-0">
                    <!-- <NuxtMarquee>
                        <TotalTutors />
                    </NuxtMarquee> -->
                    <TotalTutors />

                </div>
            </div>
        </div>

        <div class="section_two mb-5 pb-10 mt-5">
            <div class="wrapper">
                <h1 style="text-align: center;">get the <span class="orangeShade">doubtless</span> advantage</h1>
                <div>
                    <DoubtlessAdvantage  />
                </div>
            </div>
        </div>

        <div class="wrapper">
            <div class="learn-section">
                <h2 class="learn_text_h">Become an instructor today</h2>
                <p class="learn_text_p">Empower Minds and Shape Futures—Start Your Journey as an Instructor Today!</p>
                <button class="hdr_btn">Join as an Instructor</button>
            </div>
        </div>

        <div class="free_section">
            <div class="wrapper">
                <div class="row">
                    <div class="col-md-4">
                        <div class="free_out_div">
                            <h2 class="free_section_h">Try <span class="orangeShade learn_big">Learning</span> for free </h2>
                            <p class="free_section_p">We offer valuable online/offline courses that are available for anyone wishing to achieve
                                their target goals </p>
                            <button class="free_btn">Build Your Career</button>
                        </div>
                    </div>
                    <div class="col-md-8 learning_card d-flex flex-wrap">
                        <FreeCard v-for="courseType in courseTypes" :key="courseType.id" :title="courseType.title"
                            :text="courseType.text" />
                    </div>
                </div>
            </div>
        </div>

        <div class="section_two mt-0 success_div">
            <div class=" wrapper">
                <div>
                    <h1 class="success_div_h">Insights From Our<span class="orangeShade"> Valued Students</span></h1>
                    <div>
                        <AllSuccessCard />
                        <!-- <abc /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.success_div_h {
    margin-bottom: 55px !important;
}

.success_div {
    background: #FFF2E4;
    background-image: url('/images/success_bg.png');
    padding: 75px 0 49px 0;
}

.learn_big {
    font-size: 36px;
}
.free_btn {
    background: transparent;
    border: 2px solid var(--default_color);
    color: var(--default_color);
    padding: 12px 20px;
    border-radius: 4px;
    text-transform: uppercase;
    font-size: 17px;
    font-family: 'Roboto';
    font-weight: 500;
}

.free_btn:hover {
    background-color: var(--default_color);
    color: var(--white);
}

.learning_card {
    column-gap: 40px;
    row-gap: 50px;
    justify-content: end;
}

.left-side {
    width: 100%;
    max-width: 213px;
}
.free_out_div {
    max-width: 384px;
    padding: 15px  0 0 0;
}

.free_section {
    padding: 70px 0;
    background: #F9F7F7;
    margin-top: 20px;
}

.tablet_btn {
    font-size: 19px !important;
    padding: 18px 30px !important;
}

.tablet_ul {
    margin-bottom: 30px !important;
}

.tablet_outer_div {
    background: #F9F7F7;
    padding: 50px 0;
}

.tablet_text h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
}

.tablet_text p {
    font-size: 14px;
    font-weight: 400;
    margin-top: 4px !important;
}

.tablet_div img {
    padding: 16px 10px;
}

.tablet_div h1 {
    margin-bottom: 15px !important;
}

.tablet_div p.tablet_desc {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 15px !important;
}
</style>