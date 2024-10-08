<template>
    <div class="parentCard px-0">
        <nuxt-link class="course_card_btn_text" to="/course-info/abc">
            <div class="course-card">
                <div class="position-relative">
                    <img class="course_card_image" :src="image" alt="Course Image" />
                </div>
                <div>
                    <h5 class="title_space mb-0 course-title">{{ title }}</h5>
                    <div class="d-flex align-center gap-2 tutorName">
                        <img class="imgSize_tutor_board" src="/images/tutor_pic.png" />
                        <p class="mb-0">{{ tutorName }}</p>
                    </div>
                    <div class="meta tutor_meta_space">
                        <p class="d-flex meta_text align-center">{{ rating }}<img class="imgSize py-0"
                                src="/images/crse_star.png" /></p>
                        <p class="d-flex meta_text tutorHatSize align-center"><img src="/images/tutor_hat.png" />410
                            Enroll</p>
                    </div>
                    <div class="pricingSec px-3 d-flex justify-content-between">
                        <p class="mb-0">₹ {{ selectedVariant.salePrice > 0 ? selectedVariant.salePrice :
                            selectedVariant.price }} /-
                            <span v-if="selectedVariant.salePrice" class="old_price">₹ {{ selectedVariant.price }}
                                /-</span>
                        </p>
                        <span class="off_badge">{{ selectedVariant.offPercent }}% off</span>
                    </div>
                </div>
            </div>
        </nuxt-link>
        <div class="description_card">
            <v-card class="course-card course_info">
                <div class="overviewData">
                    <h1>{{ title }}</h1>
                    <p class="orangeShade course_1_text">Updated: <span>June 2024</span></p>
                    <p class="course_2_text">by: {{ tutorName }}</p>
                    <p v-html="desc" class="html_desc"></p>
                    <div class="duration_price_div">
                        <div v-for="(variant, index) in productVariants" :key="index"
                            class="d-flex align-center duration_mt justify-between">
                            <label class="radio_container d-flex align-center">
                                <input v-model="courseDuration" :value="variant.variantId" class="duration_radio"
                                    type="radio" />
                                <span class="duration_radio_span checkmark"></span>
                                <p class="duration_month">{{ variant.title }}</p>
                            </label>
                            <div class="d-flex align-center">
                                <p class="duration_sp">₹{{ variant.salePrice > 0 ? variant.salePrice : variant.price
                                    }}/-</p>
                                <p v-if="variant.salePrice" class="duration_op">₹{{ variant.price }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <nuxt-link class="course_card_btn_text" to="/course-info/abc">
                        <button class="course_info_btn">View more</button>
                    </nuxt-link>

                    <!-- Conditionally Render Add to Cart Buttons -->
                    <button v-if="!loading && !addedToCart" @click="addToCart"
                        :disabled="!courseDuration" :class="{ 'disabled-button': !courseDuration }"
                        class="course_info_btn">
                        Add to cart
                    </button>

                    <!-- Loading state -->
                    <button v-else-if="loading" class="course_info_btn">
                        <img class="loader_rotate_size" src="/images/cart_loader.png" />
                    </button>

                    <!-- Added to cart state -->
                    <button disabled v-else class="course_info_btn">
                        Added to cart
                    </button>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';

// Initialize stores
const cartStore = useCartStore();
const authStore = useAuthStore();

const props = defineProps({
    image: String,
    title: String,
    rating: String,
    price: Number,
    tutorName: String,
    desc: String,
    productVariants: Array
});

// State variables
const courseDuration = ref('');
const selectedVariant = ref({});
const loading = ref(false); // Local loading state
const addedToCart = ref(false); // Local added-to-cart state

// Automatically select the first variant as the default
onMounted(async () => {
    await authStore.restoreAuthFromCookies(); // Ensure the user is authenticated
    if (props.productVariants) {
        courseDuration.value = props.productVariants[0].variantId;
        selectedVariant.value = props.productVariants[0];
    }
});

// Watch for changes in courseDuration to update the selected variant details
watch(courseDuration, (newValue) => {
    const variant = props.productVariants.find(v => v.variantId === newValue);
    if (variant) {
        selectedVariant.value = variant;
    }
    // Reset local button states when selecting a new variant
    loading.value = false;
    addedToCart.value = false;
});

// Debounce function to avoid excessive API calls
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// Add to cart logic
const addToCart = debounce(async () => {
    loading.value = true; // Start loading
    const cartItem = {
        'product_id': selectedVariant.value.productId,
        'variant_id': selectedVariant.value.variantId,
        'quantity': 1,
        'is_digital': true,
        'price': selectedVariant.value.salePrice > 0 ? selectedVariant.value.salePrice : selectedVariant.value.price
    };

    try {
        // Use cartStore to add the item to the cart
        await cartStore.addToCart(cartItem);
        addedToCart.value = true; // Mark item as added to cart
        loading.value = false; // Stop loading
    } catch (error) {
        console.error('Error adding to cart:', error);
        loading.value = false;
    }
}, 3000);
</script>



<style scoped>
a.course_card_btn_text {
    color: #000;
}
p.html_desc {
    margin-bottom: 10px !important;
}

img.course_card_image {
    height: 100%;
    min-height: 215px;
    object-fit: cover;
    object-position: center top;
    max-height: 215px;
}

.loader_rotate_size {
    width: 19px;
    padding: 0;
}

.course_info_btn {
    font-size: 14px;
    color: #F87126;
    border: 2px solid;
    border-radius: 4px;
    padding: 15px 20px;
    text-transform: uppercase;
    font-weight: 600;
    font-family: var(--Montserrat);
    min-width: 148px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.course_info_btn:hover {
    background: #F87126;
    color: #ffffff;
    transition: 0.3s;
    border: 2px solid #F87126;
}

.course_1_text span {
    font-weight: 600;
}
</style>