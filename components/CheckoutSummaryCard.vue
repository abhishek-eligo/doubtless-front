<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useCartStore } from '@/stores/cart';

// Initialize stores
const cartStore = useCartStore();

// Define props
const props = defineProps({
  cartItems: {
    type: Array,
    required: true
  }
});

// Reactive computed property to sync with cart store
const summaryCartItems = computed(() => cartStore.cartItems);

// Function to remove item from cart
const removeItem = (productId, variantId) => {
  console.log(productId, variantId);
  cartStore.removeItem(productId, variantId); // Use the store's action to remove the item
};

// On component mount
onMounted(() => {
  // If you need to do something specific with props.cartItems on mount:
  if (props.cartItems.length > 0) {
    // Handle props.cartItems if needed
    console.log('Initial cart items:', props.cartItems);
  }
});

// Watch for changes in props.cartItems if you need to sync with store or perform actions
watch(
  () => props.cartItems,
  (newCartItems) => {
    console.log('Cart items from props changed:', newCartItems);
    // Perform any synchronization or action with cartStore if needed
  }
);
</script>


<template>
    <div class="checkout_smry_div">
        <UCard v-for="(item, index) in summaryCartItems" :key="index" class="checkout_smry_card">
            <div class="summary_item_img">
                <img :src="item.product.product_image" />
            </div>
            <div class="mr-auto summary_card_title_div">
                <h1 class="summary_card_title">{{ item.product.name }}</h1>
                <p class="summary_card_text">{{ item.product.name }}</p>
            </div>
            <div class="text-end mr-auto">
                <button class="summary_card_btn" @click="removeItem(item.product_id, item.variant_id)">Remove</button>
                <p class="summary_card_validity">{{ item.product.variants.find(variant => variant.id === item.variant_id && variant.product_id === item.product_id).attribute_values }} validity</p>
            </div>
            <div>
                <p class="summary_card_sp">₹{{ item.price }}</p>
                <p class="summary_card_dp">₹{{ item.product.variants.find(variant => variant.id === item.variant_id && variant.product_id === item.product_id).price }}</p>
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