<script setup>
const summaryCartItems = ref([
    {
        id: 1,
        title: 'Union and State Governments Roles and Responsibilities',
        desc: 'GameDev.tv Team, Rick Davidson, Grant',
        validity: '6',
        salePrice: '390',
        originalPrice: '2099'
    },
    {
        id: 2,
        title: 'Union and State Governments Roles and Responsibilities',
        desc: 'GameDev.tv Team, Rick Davidson, Grant',
        validity: '3',
        salePrice: '780',
        originalPrice: '5599'
    }
])

</script>

<template>
    <div class="checkout_smry_div">
        <UCard v-for="(item, index) in summaryCartItems" :key="index" class="checkout_smry_card">
            <div class="summary_item_img">
                <img src="/images/cart_item.png" />
            </div>
            <div class="mr-auto summary_card_title_div">
                <h1 class="summary_card_title">{{ item.title }}</h1>
                <p class="summary_card_text">{{ item.desc }}</p>
            </div>
            <div class="text-end mr-auto">
                <button class="summary_card_btn">Remove</button>
                <p class="summary_card_validity">{{ item.validity }} month validity</p>
            </div>
            <div>
                <p class="summary_card_sp">₹{{ item.salePrice }}</p>
                <p class="summary_card_dp">₹{{ item.originalPrice }}</p>
            </div>
        </UCard>
    </div>
</template>

<style scoped>
.summary_card_title_div {
    margin-left: 16px;
}
.summary_item_img {
    width: 91px;
    max-width: 91px;
    max-height: 100%;
}

h1.summary_card_title {
    font-size: 16px;
    font-weight: 600;
    color: #000;
    text-transform: capitalize;
}

p.summary_card_text {
    font-size: 12px;
    font-weight: 400;
    color: #757373;
    text-transform: uppercase;
}

button.summary_card_btn {
    font-size: 14px;
    font-weight: 500;
    color: #757373;
    text-transform: capitalize;
}

p.summary_card_validity {
    font-size: 14px;
    font-weight: 400;
    color: #F87126;
    text-transform: capitalize;
}

p.summary_card_sp {
    font-size: 20px;
    font-weight: 800;
    color: #F87126;
}

p.summary_card_dp {
    font-size: 15px;
    font-weight: 600;
    color: #757373;
    text-decoration: line-through;
}
</style>