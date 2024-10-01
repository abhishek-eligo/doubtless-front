<script setup>
const courses = ref([
    { id: '1', image: '/images/course-1.png', tutorName: 'R D Sharma', title: 'Basics of Mathematics for First Graders', rating: '4.7', offPercent: '40' },
    { id: '2', image: '/images/course-2.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
    { id: '3', image: '/images/course-3.png', tutorName: 'R D Sharma', title: 'Building Strong English Skills for First Grade Students', rating: '4.3', offPercent: '40' },
    { id: '4', image: '/images/course-4.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
    { id: '5', image: '/images/course-1.png', tutorName: 'R D Sharma', title: 'Basics of Mathematics for First Graders', rating: '4.7', offPercent: '40' },
    { id: '6', image: '/images/course-2.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
    { id: '7', image: '/images/course-3.png', tutorName: 'R D Sharma', title: 'Building Strong English Skills for First Grade Students', rating: '4.3', offPercent: '40' },
    { id: '8', image: '/images/course-4.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
    { id: '9', image: '/images/course-1.png', tutorName: 'R D Sharma', title: 'Basics of Mathematics for First Graders', rating: '4.7', offPercent: '40' },
    { id: '10', image: '/images/course-2.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
    { id: '11', image: '/images/course-3.png', tutorName: 'R D Sharma', title: 'Building Strong English Skills for First Grade Students', rating: '4.3', offPercent: '40' },
    { id: '12', image: '/images/course-4.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
    { id: '13', image: '/images/course-1.png', tutorName: 'R D Sharma', title: 'Basics of Mathematics for First Graders', rating: '4.7', offPercent: '40' },
    { id: '14', image: '/images/course-2.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
    { id: '15', image: '/images/course-2.png', tutorName: 'R D Sharma', title: 'Creative Expressions Drawing & Craft for Kids', rating: '4.3', offPercent: '40' },
]);
</script>
<template>
    <div class="d-flex flex-wrap total_course_gap">
        <CourseCard v-for="course in courses" :key="course.id" :image="course.image" :title="course.title"
        :rating="course.rating" :offPercent="course.offPercent" :tutorName="course.tutorName" />
    </div>
</template>

<style scoped>
.total_course_gap {
    row-gap: 40px;
}</style>