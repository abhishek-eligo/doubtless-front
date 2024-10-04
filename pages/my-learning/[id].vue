<script setup>
definePageMeta({
  middleware: 'auth'
});
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
]);

const headers = ref([
  { title: 'Order id', key: 'orderid' },
  { title: 'Course Name', key: 'coursename' },
  { title: 'Enroll Date', key: 'enrolldate' },
  { title: 'Status', key: 'status' },
  { title: 'Expired Date', key: 'expireddate' },
  { title: 'Total', key: 'total' },
  { title: 'Action', key: 'action' },
]);

const orders = ref([
  { id: 1, orderid: '#87663', coursename: 'Blender Character Creator for Video Games Design', enrolldate: '08/04/2024', status: 'Enrolled', expireddate: '02/11/2024', total: '$49.99', paymentMethod: 'Online Razor Payment', paymentStatus: 'Successfull' },
  { id: 2, orderid: '#87563', coursename: 'Blender Character Creator for Video Games Design', enrolldate: '05/03/2023', status: 'Completed', expireddate: '02/04/2024', total: '$49.99', paymentMethod: 'Online Razor Payment', paymentStatus: 'Successfull' },
  { id: 3, orderid: '#86863', coursename: 'Blender Character Creator for Video Games Design', enrolldate: '08/03/2024', status: 'Enrolled', expireddate: '02/09/2024', total: '$49.99', paymentMethod: 'Online Razor Payment', paymentStatus: 'Successfull' },
  { id: 4, orderid: '#87613', coursename: 'Blender Character Creator for Video Games Design', enrolldate: '02/02/2023', status: 'Completed', expireddate: '01/01/2024', total: '$49.99', paymentMethod: 'Online Razor Payment', paymentStatus: 'Successfull' },
]);

const showOrderHistory = ref(true); // State to toggle visibility of order history table
const selectedOrder = ref(null); // To store the details of the selected order

// Method to handle View button click
const viewOrderDetails = (order) => {
  selectedOrder.value = order; // Store the clicked order's details
  showOrderHistory.value = false; // Hide the order history table
}

// Method to go back to the order history view
const backToOrderHistory = () => {
  selectedOrder.value = null; // Clear the selected order details
  showOrderHistory.value = true; // Show the order history table
}
</script>

<template>
  <div>
    <div class="wrapper mylearn_page">
      <VRow>
        <VCol class="" md="3">
          <VTabs class="myLearn_user_tabs" v-model="userTabs">
            <VTab v-for="tab in tabs" :key="tab.title" class="myLearn_user_tab">{{ tab.title }}</VTab>
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
              <!-- Conditionally render the order history table or the order detail section -->
              <div v-if="showOrderHistory" class="order_history_table">
                <VDataTable :items="orders" :headers="headers" item-value="id" class="elevation-1 order_table">
                  <!-- Customize the rows to display specific data from orders -->
                  <template #item.orderid="{ item }">
                    <span class="order_id">{{ item.orderid }}</span>
                  </template>
                  <template #item.coursename="{ item }">
                    <span class="order_table_desc">{{ item.coursename }}</span>
                  </template>
                  <template #item.enrolldate="{ item }">
                    <span class="order_table_desc">{{ item.enrolldate }}</span>
                  </template>
                  <template #item.status="{ item }">
                    <span class="order_table_desc">{{ item.status }}</span>
                  </template>
                  <template #item.expireddate="{ item }">
                    <span class="order_table_desc">{{ item.expireddate }}</span>
                  </template>
                  <template #item.total="{ item }">
                    <span class="order_table_desc">{{ item.total || '$0.00' }}</span>
                  </template>
                  <template #item.action="{ item }">
                    <button class="order_table_btn" @click="viewOrderDetails(item)">View</button>
                  </template>
                </VDataTable>
              </div>

              <div v-else class="order_detail_div">
                <!-- Display the details of the selected order -->
                <VCard class="order_detail_card">
                  <VCardTitle class="order_detail_title">
                    <h3>Order Details</h3>
                    <button class="back_btn" @click="backToOrderHistory">Back</button>
                  </VCardTitle>
                  <VCardText class="order_detail_text">
                    <div class="order_detail_p">
                      <h4>Order ID</h4>
                      <p>{{ selectedOrder?.orderid }}</p>
                    </div>
                    <div class="order_detail_p">
                      <h4>Name</h4>
                      <p>{{ selectedOrder?.coursename }}</p>
                    </div>
                    <div class="order_detail_p">
                      <h4>Enroll Date</h4>
                      <p>{{ selectedOrder?.enrolldate }}</p>
                    </div>
                    <div class="order_detail_p">
                      <h4>Expired Date</h4>
                      <p>{{ selectedOrder?.expireddate }}</p>
                    </div>
                    <div class="order_detail_p">
                      <h4>Total</h4>
                      <p>{{ selectedOrder?.total }}</p>
                    </div>
                    <div class="order_detail_p">
                      <h4>Payment Method</h4>
                      <p>{{ selectedOrder?.paymentMethod }}</p>
                    </div>
                    <div class="order_detail_p">
                      <h4>Payment Status</h4>
                      <p>{{ selectedOrder?.paymentStatus }}</p>
                    </div>
                  </VCardText>
                </VCard>
              </div>
            </VWindowItem>
          </VWindow>
        </VCol>
      </VRow>
    </div>
  </div>
</template>


<style scoped>
.order_detail_p h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
    color: #000;
    line-height: 150%;
    text-transform: capitalize;
}

.order_detail_p p {
    font-size: 13px;
    font-weight: 400;
    color: #000;
    text-transform: capitalize;
}
.order_detail_p {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.order_detail_text {
    padding: 10px 20px;
}
.order_detail_card {
    box-shadow: 0 4px 4px #00000025 !important;
    border-radius: 0;
}

.order_detail_title {
    padding: 10px;
    background: #757373;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order_detail_title h3 {
    font-size: 14px;
    color: #fff;
    text-transform: capitalize;
    font-weight: 600;
}
span.order_table_desc {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    line-height: 150%;
}

.order_id {
    color: #F87126;
}
button.order_table_btn {
    padding: 4px 20px;
    background: #F87126;
    border-radius: 26px;
    color: #fff;
    font-family: var(--Montserrat);
    font-size: 14px;
    font-weight: 600;
}
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