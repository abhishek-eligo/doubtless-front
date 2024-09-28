<script setup>
const userTabs = ref('')
const tabs = [
    { title: 'my courses' },
    { title: 'order history' },
    { title: 'logout' },
]

const myLearinngCourses = ref([
    { id: 1, title: 'Blender Character Creator for Video Games Design', desc: 'GameDev.tv Team, Rick Davidson, Grant', enrolled: '8th Aug 2024', expired: '12th feb 2025', progress: '70', rating: '3' },
    { id: 2, title: 'Blender Character Creator for Video Games Design', desc: 'GameDev.tv Team, Rick Davidson, Grant', enrolled: '8th Aug 2024', expired: '12th feb 2025', progress: '30', rating: '4' },
    { id: 3, title: 'Blender Character Creator for Video Games Design', desc: 'GameDev.tv Team, Rick Davidson, Grant', enrolled: '8th Aug 2024', expired: '12th feb 2025', progress: '80', rating: '2' },
    { id: 4, title: 'Blender Character Creator for Video Games Design', desc: 'GameDev.tv Team, Rick Davidson, Grant', enrolled: '8th Aug 2024', expired: '12th feb 2025', progress: '20', rating: '5' },
    { id: 5, title: 'Blender Character Creator for Video Games Design', desc: 'GameDev.tv Team, Rick Davidson, Grant', enrolled: '8th Aug 2024', expired: '12th feb 2025', progress: '90', rating: '4' },
    { id: 6, title: 'Blender Character Creator for Video Games Design', desc: 'GameDev.tv Team, Rick Davidson, Grant', enrolled: '8th Aug 2024', expired: '12th feb 2025', progress: '50', rating: '1' },
])
</script>

<template>
    <div>
        <div class="wrapper mylearn_page">
            <VRow>
                <VCol class="" md="3">
                    <VTabs class="myLearn_user_tabs" v-model="userTabs">
                        <VTab v-for="tab in tabs" :key="tab" class="myLearn_user_tab">{{ tab.title }}</VTab>
                    </VTabs>
                </VCol>
                <VCol class="myLearn_col_border" md="9" cols="12">
                    <VWindow v-model="userTabs" :touch="false">
                        <VWindowItem>
                            <h1 class="windows_h">My Courses</h1>
                            <div class="my-learn-toal-cards">
                                <MyLearningCard v-for="(item, index) in myLearinngCourses" :key="index"
                                    :title="item.title" :desc="item.desc" :enrolled="item.enrolled"
                                    :expired="item.expired" :progress="item.progress" :rating="item.rating" />
                            </div>
                        </VWindowItem>

                        <VWindowItem>
                            <h1 class="windows_h">order history</h1>
                        </VWindowItem>
                    </VWindow>
                </VCol>
            </VRow>
        </div>
    </div>
</template>

<style scoped>
.windows_h {
    font-size: 24px;
    font-weight: 800;
    color: #000;
    line-height: 150%;
    text-transform: capitalize;
}
.my-learn-toal-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 25px;
}

.myLearn_col_border {
    border-left: 0.5px solid #75737350;
}
</style>