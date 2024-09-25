<script setup>
const courseDuration = ref('');
const cartAdd = ref(false);
const cartUpdated = ref(false);

const addToCart = () => {
    cartAdd.value = true;
    setTimeout(() => {
        cartAdd.value = false;
        cartUpdated.value = true;
    }, 2000)
}
const courseDurationType = ([
    { id: 1, title: '3', salePrice: '399', originalPrice: '580' },
    { id: 2, title: '6', salePrice: '890', originalPrice: '1280' },
    { id: 3, title: '12', salePrice: '1280', originalPrice: '1590' }
])
</script>

<template>
    <VCard class="add_cart_card ml-auto">
        <VCardTitle class="add_cart_title">
            <img src="/images/product_in_cart.png" />
        </VCardTitle>
        <VCardText class="add_cart_text">
            <h1 class="add_cart_title_h">Early Math Skills Learning Numbers and Shapes</h1>
            <p class="add_cart_title_p">Course validity</p>
            <div class="duration_price_div">
                <div v-for="(item, index) in courseDurationType" :key="index" class="d-flex align-center duration_mt justify-between">
                    <label class="d-flex align-center">
                        <input class="duration_radio" type="radio" />
                        <p class="duration_month">{{ item.title }} Month</p>
                    </label>
                    <div class="d-flex align-center">
                        <p class="duration_sp">₹{{ item.salePrice }} /-</p>
                        <p class="duration_op">₹{{ item.originalPrice }}</p>
                    </div>
                </div>
            </div>
            <button @click="addToCart" v-if="cartAdd == false && cartUpdated == false" class="add_cart_btn">Add To Cart</button>
            <button v-if="cartAdd == true" class="add_cart_btn d-flex justify-center">
                <img src="/images/cart_loader.png" />
            </button>
            <button disabled v-if="cartUpdated == true" class="add_cart_btn">Added To Cart</button>
        </VCardText>
    </VCard>
</template>

<style scoped>
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 9px;
    width: 9px;
    background-color: #F4CCB5;
    border-radius: 50%;
}

.add_cart_btn {
    color: #F87126 !important;
    background-color: #fff !important;
    box-shadow: none !important;
    border: 2px solid #F87126;
    border-radius: 3px;
    width: 100%;
    text-align: center;
    padding: 13px;
    margin-top: 12px;
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 500;
    font-family: var(--Montserrat);
}

.add_cart_title img {
    width: 100%;
}

p.duration_month {
    font-size: 13px;
    margin-left: 6px !important;
    font-weight: 500;
    color: #000;
}

.duration_price_div {
    padding: 9px 11px;
    border: 1px solid #F8712670;
    border-radius: 2px;
    background: #F4CCB5;
}

p.duration_sp {
    font-size: 15px;
    font-weight: 800;
    color: #424040;
}

p.duration_op {
    color: #868585;
    font-weight: 600;
    text-decoration: line-through;
    font-size: 14px;
    margin-left: 6px !important;
}

.duration_mt {
    margin-top: 8px;
    margin-bottom: 8px;
}

.add_cart_card {
    max-width: 403px;
    padding: 12px 16px;
}

.add_cart_title {
    padding: 0;
}

.add_cart_text {
    padding: 0;
}

h1.add_cart_title_h {
    font-size: 19px;
    line-height: 150%;
    font-weight: 600;
    margin-top: 15px;
    margin-bottom: 15px;
}

p.add_cart_title_p {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    margin-bottom: 8px !important;
}
</style>