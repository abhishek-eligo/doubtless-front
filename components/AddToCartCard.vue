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
]);

watch(courseDuration, () => {
    // Reset to default state whenever the user selects a different radio button
    cartAdd.value = false;
    cartUpdated.value = false;
});
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
                    <label class="radio_container d-flex align-center">
                        
                        <input v-model="courseDuration" :value="item.id" class="duration_radio" type="radio" />
                        <span class="duration_radio_span checkmark"></span>
                        <p class="duration_month">{{ item.title }} Month</p>
                    </label>
                    <div class="d-flex align-center">
                        <p class="duration_sp">₹{{ item.salePrice }} /-</p>
                        <p class="duration_op">₹{{ item.originalPrice }}</p>
                    </div>
                </div>
            </div>
            <button @click="addToCart" :disabled="!courseDuration" v-if="cartAdd == false && cartUpdated == false" :class="{'disabled-button': !courseDuration}" class="add_cart_btn">Add To Cart</button>
            <button v-if="cartAdd == true" class="add_cart_btn">
                <img class="loader_rotate" src="/images/cart_loader.png" />
            </button>
            <button disabled v-if="cartUpdated == true" class="add_cart_btn">Added To Cart</button>
        </VCardText>
    </VCard>
</template>

<style scoped>

</style>