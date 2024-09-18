<script setup>
import { ref } from 'vue';

const allStories = [
    { id: '1', title: '', description: 'Doubtless played a very important role in my NEET preparation. The personalized program and the video lessons helped me learn the most complex of concepts in an easy way. The AITS held at a national level allowed me to set a standard for myself and identify areas of improvement.', userName: 'Nmrita Bishnoi', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'NEET', avatarImg: '/images/suces_profile.png' },
    { id: '2', title: '"Incredibly Effective Learning Platform!"', description: 'The Doubtless app has completely transformed my preparation for the SSC CGL exam. The interactive classes, detailed explanations, and instant doubt resolution features are incredibly effective. I feel much more confident and prepared now!', userName: 'Ravi kishan', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'SSC CGL', avatarImg: '/images/suces_profile.png' },
    { id: '3', title: '', description: 'The videos on the Doubtless app aided in improving my weak areas in Chemistry. It was helpful in my preparation and I got to learn concepts in a different way. Practicing with mock tests and the AITS, along with the extensive analysis, helped me identify my weak and strong areas.', userName: 'Kundan Mahatre', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'JEE', avatarImg: '/images/suces_profile.png' },
    // { id: '4', title: '"Top-notch Faculty and Comprehensive Study Material"', description: 'Thanks to the top-notch faculty and comprehensive study material provided by the Doubtless app, I was able to grasp even the most difficult concepts with ease. The practice tests and mock exams were particularly helpful in boosting my confidence.', userName: 'Priya', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'SSC CGL', avatarImg: '/images/suces_profile.png' },
    // { id: '5', title: '', description: 'Joining the IAS online class on Doubtless App was the best decision I made. The interactive live sessions and the extensive library of recorded lectures ensured I never missed out on any topic. The mentors were always available to clarify doubts, making the learning experience seamless..', userName: 'Arjun Sharma', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'IAS', avatarImg: '/images/suces_profile.png' },
    // { id: '6', title: '“Highly Recommend for NEET Aspirants”', description: 'The structured study plan and comprehensive test series offered by Doubtless App were instrumental in my NEET preparation. The quality of teaching and the personalized attention I received made all the difference.', userName: 'Karuna Mahatri ', userDesc: 'AIR 28 - NEET 2023', sheetDesc: ' NEET', avatarImg: '/images/suces_profile.png' },
    // { id: '7', title: '', description: 'The NDA course on Doubtless App is comprehensive and well-organized. The flexibility to learn at my own pace and the support from instructors made a significant difference in my preparation.', userName: 'Aditiya', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'NDA', avatarImg: '/images/suces_profile.png' },
    // { id: '8', title: '“Outstanding Faculty and Support”', description: 'The faculty at Doubtless App is exceptional. Their deep understanding of the NEET syllabus and unique teaching methods helped me secure a top rank. The doubt-solving sessions were particularly beneficial.', userName: 'Shiva', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'NEET', avatarImg: '/images/suces_profile.png' },
    // { id: '9', title: '', description: 'The videos on the Doubtless app aided in improving my weak areas in Chemistry. It was helpful in my preparation and I got to learn concepts in a different way. Practicing with mock tests and the AITS, along with the extensive analysis, helped me identify my weak and strong areas.', userName: 'Kundan Mahatre', userDesc: 'AIR 28 - NEET 2023', sheetDesc: 'JEE', avatarImg: '/images/suces_profile.png' },
]
</script>

<template>
    <div class="row ">
        <SuccessStoryCard 
            v-for="story in allStories"
            :key="story.id"
            :title="story.title"
            :description="story.description"
            :userName="story.userName"
            :userDesc="story.userDesc"
            :avatarImg="story.avatarImg"
            :sheetDesc="story.sheetDesc"
        />
    </div>
</template>

<style scoped>

</style>