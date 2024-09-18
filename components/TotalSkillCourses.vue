<template>
    <div class="wrapper d-flex course_gap">
        <CourseCard 
            v-for="course in courses"
            :key="course.id"
            :image="course.image"
            :title="course.title"
            :rating="course.rating"
            :offPercent="course.offPercent",
            :tutorName="course.tutorName"
         />
    </div>
</template>

<script>
export default {
    data() {
        return {
            courses: [
                { id: '1', image: '/images/skill-1.png', tutorName: 'Danny', title: 'Introduction C++ Programming Basics Syntax & Data Types', rating: '4.7', offPercent: '40' },
                { id: '2', image: '/images/skill-2.png', tutorName: 'Max', title: 'Mastering Control Structures  If-Else, Switch & Looping in C++', rating: '4.3', offPercent: '40' },
                { id: '3', image: '/images/skill-3.png', tutorName: 'Er. Rao', title: 'learn about function in C++ and working with arrays', rating: '4.3', offPercent: '40' },
                { id: '4', image: '/images/course-4.png', tutorName: 'Dev Hub', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
            ]
        }
    }
}
</script>