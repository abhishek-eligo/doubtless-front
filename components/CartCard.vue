<template>
    <div class="cart_item_card">
      <VCard v-for="(item, index) in cartItems" :key="index">
        <VCardText class="px-0 py-0 d-flex justify-between">
          <div class="d-flex gap-3">
            <div>
              <img src="/images/cart_item.png" />
            </div>
            <div class="cart_item_content">
              <h1 class="cart_item_h">{{ item.title }}</h1>
              <ul class="d-flex">
                <li class="card_text_border cart_text_font">{{ item.by }}</li>
                <li class="card_text_border cart_text_font">{{ item.students }}</li>
                <li class="cart_text_font">{{ item.rating }} </li>
              </ul>
              <ul class="d-flex">
                <li class="cart_text_font">{{ item.hours }}</li>
                <li class="cart_text_font">{{ item.lectures }} lectures</li>
                <li class="cart_text_font">{{ item.level }}</li>
              </ul>
            </div>
          </div>
          <div class="d-flex justify-content-end cart_valid_width">
            <p class="validity_month">{{ item.valid }} Month Validity</p>
            <div class="cart_price">
              <p class="cart_sale_price">₹{{ item.salePrice }}</p>
              <p class="cart_orignal_price">₹{{ item.originalPrice }}</p>
              <button class="cart_remove_item" @click="removeItem(index)">Remove</button>
            </div>
          </div>
        </VCardText>
      </VCard>
    </div>
  </template>
  
  <script setup>
  // Define props
  const props = defineProps({
    cartItems: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['updateCart']);
  
  // Method to remove an item
  const removeItem = (indexToRemove) => {
    // Emit the index of the item to be removed to the parent
    emit('updateCart', indexToRemove);
  };
  </script>
  

<style scoped>
p.cart_sale_price {
    font-size: 19px;
    font-weight: 800;
    color: #F87126;
}

p.cart_orignal_price {
    font-size: 15px;
    font-weight: 500;
    color: #757373;
    text-decoration: line-through;
}

button.cart_remove_item {
    font-size: 14px;
    color: #757373;
    font-weight: 500;
    margin-top: 27px;
}

p.validity_month {
    font-size: 15px;
    font-weight: 600;
    color: #F87126;
    margin-right: 26px !important;
}

.cart_valid_width {
    max-width: 345px;
}

.cart_text_font {
    font-size: 15px;
    color: #757373;
    font-weight: 400;
    text-transform: capitalize;
}

.card_text_border {
    padding-right: 5px;
    border-right: 1px solid #757373;
    margin-right: 5px;
}

h1.cart_item_h {
    font-size: 18px;
    font-weight: 600;
    max-width: 480px;
}

.cart_item_card .v-card--variant-elevated {
    box-shadow: none;
    border-top: 1px solid #75737335;
    border-radius: 0;
    padding-top: 16px;
    padding-bottom: 8px;
}
</style>