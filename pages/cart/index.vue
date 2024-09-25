<script setup>
import { ref } from 'vue';

const isCartVisible = ref(false);
setTimeout(() => {
    isCartVisible.value = true;
}, 100);

</script>

<template>
    <transition name="slide-fade">
        <div v-if="isCartVisible" class="wrapper">
            <VContainer class="cart_container">
                <VRow>
                    <VCol class="cart_left_col" md="9">
                        <VCard>
                            <VCardTitle class="px-0 py-0">
                                <h1 class="cart_title">shopping cart</h1>
                                <p class="cart_text">2 courses in cart</p>
                            </VCardTitle>
                        </VCard>
                        <CartCard />
                    </VCol>
                    <VCol md="3" cols="12">
                        <div class="checkout_card">
                            <div>
                                <span class="items_total">Total: </span>
                                <span class="item_sale_price">₹1,189</span>
                                <span class="cart_ori_total">₹14,996</span>
                            </div>
                            <nuxt-link to="/cart/checkout">
                                <button class="cart_checkout_btn">Checkout</button>
                            </nuxt-link>
                        </div>
                    </VCol>
                </VRow>
            </VContainer>
        </div>
    </transition>
</template>

<style scoped>
.cart_checkout_btn {
    font-size: 18px;
    text-transform: uppercase;
    background: #F87126;
    width: 100%;
    color: #fff;
    font-weight: 800;
    font-family: var(--Montserrat);
    padding: 10px 0;
    border: 2px solid #F87126;
    margin-top: 22px;
}

.cart_checkout_btn:hover {
    background: #fff;
    color: #F87126;
    border: 2px solid #F87126;
}

.checkout_card {
    padding-top: 95px;
}

span.items_total {
    font-size: 17px;
    font-weight: 600;
    margin-right: 8px;
}

span.item_sale_price {
    font-size: 26px;
    font-weight: 800;
    margin-right: 8px;
}

span.cart_ori_total {
    font-size: 17px;
    font-weight: 500;
    text-decoration: line-through;
    color: #757373;
}

.cart_item_card {
    padding: 15px 15px;
}

.cart_container {
    padding: 0;
    margin-top: 25px;
    border-top: 5px solid #F87126;
}

.cart_container .cart_left_col .v-card--variant-elevated {
    box-shadow: none;
    padding: 15px 15px;
}

h1.cart_title {
    font-size: 30px;
    font-weight: 800;
    text-transform: capitalize;
    color: #000;
    margin-bottom: 20px;
}

p.cart_text {
    font-size: 17px;
    font-weight: 800;
}

/* Slide-fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-fade-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-fade-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>