<template>
    <div class="d-flex course_gap flex-wrap justify-between">
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
                { id: '1', image: '/images/course-1.png', tutorName: 'R D Sharma', title: 'Basics of Mathematics for First Graders', rating: '4.7', offPercent: '40' },
                { id: '2', image: '/images/course-2.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
                { id: '3', image: '/images/course-3.png', tutorName: 'R D Sharma', title: 'Building Strong English Skills for First Grade Students', rating: '4.3', offPercent: '40' },
                { id: '4', image: '/images/course-4.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
            ]
        }
    }
}
</script>