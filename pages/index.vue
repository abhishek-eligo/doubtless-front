<script setup>
const advantages = [
    { id: '1', para: 'Visualizing concepts aids understanding by making abstract ideas concrete.', image: '/images/adv-1.png' },
    { id: '2', para: 'Tailored education program adapting to individual student needs and pace.', image: '/images/adv-2.png' },
    { id: '3', para: "Personalized, focused care tailored uniquely to each individual's needs.", image: '/images/adv-3.png' },
    { id: '4', para: 'Online courses let you explore fields and hobbies before committing fully.', image: '/images/adv-4.png' },
    { id: '5', para: 'Courses in your language use familiar examples, making learning easier.', image: '/images/adv-3.png' },
]

const courseTypes = [
    { id: '1', title: 'free courses', text: 'expert-led, and interactive.' },
    { id: '2', title: 'Practice & revision', text: 'get 24/7 study hours' },
    { id: '3', title: 'learn anytime, anywhere', text: '121 mentorship program' },
    { id: '4', title: 'learn anytime, anywhere', text: '121 mentorship program' },
    { id: '5', title: 'learn anytime, anywhere', text: '121 mentorship program' },
    { id: '6', title: 'learn anytime, anywhere', text: '121 mentorship program' },
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
                <p class="learn_text_p">Ready to expand your knowledge? You've arrived at the perfect spot. Dive in, explore, and reach your
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
                <div class="align-items-start d-flex ml-0">
                    <NuxtMarquee>
                        <TotalTutors />
                    </NuxtMarquee>

                </div>
            </div>
        </div>

        <div class="section_two mb-5 pb-10 mt-5">
            <div class="wrapper">
                <h1 style="text-align: center;">get the <span class="orangeShade">doubtless</span> advantage</h1>
            </div>
            <div class="d-flex">
                <DoubtlessAdvantage v-for="adv in advantages" :key="adv.id" :image="adv.image" :para="adv.para" />
            </div>
        </div>

        <div class="free_section mb-5 pb-10 mt-5">
            <div class="wrapper">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <h2>Try <span class="orangeShade">Learning</span> for free </h2>
                        <p>We offer valuable online/offline courses that are available for anyone wishing to achieve
                            their target goals </p>
                        <button style="width: 200px;" class="hdr_btn mt-3">Build Your Career</button>
                    </div>
                    <div class="col-md-8 grid_cont">
                        <FreeCard v-for="courseType in courseTypes" :key="courseType.id" :title="courseType.title"
                            :text="courseType.text" />
                    </div>
                </div>
            </div>
        </div>

        <div class="section_two mb-5 pb-10 mt-5">
            <div class=" wrapper">
                <div>
                    <h1>Insights From Our<span class="orangeShade"> Valued Students</span></h1>
                    <div>
                        <AllSuccessCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>