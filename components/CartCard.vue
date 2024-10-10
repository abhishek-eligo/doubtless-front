<template>
  <div class="cart_item_card">
    <VCard v-for="(item, index) in cartItems" :key="index">
      <VCardText class="px-0 py-0 d-flex justify-between">
        <div class="d-flex gap-3">
          <div class="product_cart_img">
            <img :src="item.product.product_image" />
          </div>
          <div class="cart_item_content">
            <h1 class="cart_item_h">{{ item.product.name }}</h1>
            <ul class="d-flex">
              <li class="card_text_border cart_text_font">{{ item.product.tutor }}</li>
              <li class="card_text_border cart_text_font">{{ item.students }}</li>
              <li class="cart_text_font">{{ item.rating }} </li>
            </ul>
            <ul class="d-flex align-center">
              <li class="cart_text_font">40 hours</li>
              <span class="grey_circle"></span>
              <li class="cart_text_font">{{ item.product.total_lectures }} lectures</li>
              <span class="grey_circle"></span>
              <li class="cart_text_font">Beginner</li>
            </ul>
          </div>
        </div>
        <div class="d-flex justify-content-end cart_valid_width">
          <div>
            <div v-for="(variant, variantIndex) in item.product.variants" :key="variantIndex">
              <p v-if="variant.variantId === item.variant_id" class="validity_month">
                {{ variant.title }} Validity
              </p>
            </div>
            <p @click="showVariants(index)" class="change_plan_txt">Change Plan</p>{{ item.variant_id }}
            <!-- Use index-based toggle -->
            <div v-if="shownVariants[index]" class="variant_check_div">
              <label v-for="(variant, index) in item.product.variants" class="variant_container">
                <span class="variant_check_txt">{{ variant.title }}</span>
                <input type="radio" :name="'variant' + index" v-model="item.variant_id" :value="variant.variantId" />
                <span class="variant_checkmark"></span>
              </label>
            </div>
          </div>
          <div class="cart_price">
            <p class="cart_sale_price">₹{{ item.price }}</p>
            <p v-show="item.actual_price > 0" class="cart_orignal_price">₹{{ item.actual_price }}</p>
            <button class="cart_remove_item" @click="removeItem(item.product_id, item.variant_id)">Remove</button>
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



onMounted(() => {
  console.log('cart items', props.cartItems)
})

const variantValue = computed(() => {
  props.cartItems.map(obj => obj.product);
})

const shownVariants = ref(props.cartItems.map(() => false));

const variantsIsShown = ref(false);

const showVariants = (index) => {
  shownVariants.value[index] = !shownVariants.value[index];
}
const emit = defineEmits(['updateCart']);

// Method to remove an item
const removeItem = (productId, variantId) => {
  console.log("REMOVING ITEM", productId, variantId);
  // Emit the index of the item to be removed to the parent
  emit('updateCart', productId, variantId);
};
</script>


<style scoped>
.product_cart_img {
    height: 109px;
    object-fit: cover;
    width: 194px;
    overflow: hidden;
}

span.grey_circle {
  width: 6px;
  height: 6px;
  background: #757373;
  border-radius: 50px;
  margin: 0 5px;
}

.variant_container {
  display: block;
  position: relative;
  cursor: pointer;
  padding-left: 15px;
  color: #757373;
}

.variant_container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.variant_checkmark {
  position: absolute;
  top: 4px;
  left: 0;
  height: 11px;
  width: 11px;
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid #757373;
}

.variant_container input:checked~.variant_checkmark {
  background-color: #F87126;
}

.variant_container input:checked~.variant_check_txt {
  color: #F87126;
}

.variant_checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.variant_container input:checked~.variant_checkmark:after {
  display: block;
}

.variant_container .variant_checkmark:after {
  top: -1px;
  left: -1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #F87126;
}

p.change_plan_txt {
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 150%;
}

p.change_plan_txt {
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 150%;
}

.change_plan_txt:hover {
  color: var(--default_color);
  cursor: pointer;
}

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
  transition: transform 0.3s ease;
}

.button.cart_remove_item:hover {
  transform: translateY(-5px);
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