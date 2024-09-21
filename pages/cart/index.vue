<script setup></script>

<template>
    <div class="wrapper">
        <VContainer class="cart_container">
            <VRow>
                <VCol class="cart_left_col" md="8">
                    <VCard>
                        <VCardTitle class="px-0 py-0">
                            <h1 class="cart_title">shopping cart</h1>
                            <p class="cart_text">2 courses in cart</p>
                        </VCardTitle>
                    </VCard>
                    <CartCard />
                </VCol>
                <VCol md="4" cols="12"></VCol>
            </VRow>
        </VContainer>
    </div>

</template>

<style scoped>
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
    text-transform: uppercase;
    color: #000;
    margin-bottom: 20px;
}
p.cart_text {
    font-size: 17px;
    font-weight: 800;
}
</style>