<template>
    <div class="wrapper d-flex course_gap">
        <CourseCard 
            v-for="course in courses"
            :key="course.id"
            :image="course.image"
            :title="course.title"
            :rating="course.rating"
            :offPercent="course.offPercent"
            :tutorName="course.tutorName"
         />
    </div>
</template>

<script>
export default {
    data() {
        return {
            courses: [
                { id: '1', image: '/images/comp-1.png', tutorName: 'Dr. Myra Raj', title: 'Union and State Governments Roles and Responsibilities', rating: '4.7', offPercent: '40' },
                { id: '2', image: '/images/comp-2.png', tutorName: 'Khan Sir', title: 'Economic Geography of India Resources and Industries', rating: '4.3', offPercent: '40' },
                { id: '3', image: '/images/comp-3.png', tutorName: 'Vidyapheet', title: 'Economic History of India Pre and Post-Colonial', rating: '4.3', offPercent: '40' },
                { id: '4', image: '/images/course-4.png', tutorName: 'Dods', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
            ]
        }
    }
}
</script>