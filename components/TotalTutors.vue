<script>
export default {
    data() {
        return {
            tutors: [
                { id: '1', title: 'Sainil', experience: '9', image: '/images/tutor_1.png' },
                { id: '2', title: 'Sainil', experience: '9', image: '/images/tutor_1.png' },
                { id: '3', title: 'Sainil', experience: '9', image: '/images/tutor_1.png' },
                { id: '4', title: 'Sainil', experience: '9', image: '/images/tutor_1.png' },
                { id: '5', title: 'Sainil', experience: '9', image: '/images/tutor_1.png' },
                { id: '6', title: 'Sainil', experience: '9', image: '/images/tutor_1.png' },
                { id: '7', title: 'Sainil', experience: '9', image: '/images/tutor_1.png' },
            ]
        }
    }
}
</script>

<template>
    <div class="d-flex">
            <TutorCard v-for="tutor in tutors" :key="tutor.id" :title="tutor.title" :experience="tutor.experience"
            :image="tutor.image" />
    </div>
</template>

<style scoped></style>