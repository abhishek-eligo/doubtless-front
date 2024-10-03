<template>
    <div class="parentCard px-0">
        <div class="course-card">
            <div class="position-relative">
                <img :src="image" alt="Course Image">
                <!-- <span class="badge">{{ offPercent }} % off</span> -->
            </div>
            <div>
                <h5 class="title_space mb-0 course-title">{{ title }}</h5>
                <div class="d-flex align-center gap-2 tutorName">
                    <img class="imgSize_tutor_board" src="/images/tutor_pic.png" />
                    <p class="mb-0">{{ tutorName }}</p>
                </div>
                <div class="meta tutor_meta_space">
                    <p class="d-flex meta_text align-center">{{ rating }}<img class="imgSize py-0"
                            src="/images/crse_star.png" />
                    </p>
                    <p class="d-flex meta_text tutorHatSize align-center"><img src="/images/tutor_hat.png" />410 Enroll
                    </p>
                </div>
                <div class="pricingSec px-3 d-flex justify-content-between">
                    <p class="mb-0">₹ {{ selectedVariant.salePrice > 0 ? selectedVariant.salePrice  : selectedVariant.price }} /- <span v-if="selectedVariant.salePrice" class="old_price">₹ {{ selectedVariant.price  }} /-</span></p>
                    <span class="off_badge">{{ selectedVariant.offPercent }}% off</span>
                </div>
            </div>
        </div>
        <div class="description_card">
            <v-card class="course-card course_info">
                <div class="overviewData">
                    <h1>{{ title }}</h1>
                    <p class="orangeShade course_1_text">updated : <span>June 2024</span></p>
                    <p class="course_2_text">by : {{ tutorName }}</p>
                    <p v-html="desc" class="html_desc"></p>
                    <div class="duration_price_div">
                        <div v-for="(variant, index) in productVariants" :key="index"
                            class="d-flex align-center duration_mt justify-between">
                            <label class="radio_container d-flex align-center">

                                <input v-model="courseDuration" :value="variant.id" class="duration_radio" type="radio" />
                                <span class="duration_radio_span checkmark"></span>
                                <p class="duration_month">{{ variant.title }} Month</p>
                            </label>
                            <div class="d-flex align-center">
                                <p class="duration_sp">₹{{ variant.salePrice > 0 ? variant.salePrice : variant.price }} /-</p>
                                <p v-if="variant.salePrice" class="duration_op">₹{{ variant.price }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <nuxt-link to="/course-info/abc">
                        <button class="course_info_btn">view more</button>
                    </nuxt-link>
                    <button @click="addToCart" :disabled="!courseDuration" v-if="cartAdd == false && cartUpdated == false" :class="{'disabled-button': !courseDuration}" class="course_info_btn">Add to cart</button>
                    <button v-if="cartAdd == true" class="course_info_btn">
                        <img class="loader_rotate_size" src="/images/cart_loader.png" />
                    </button>
                    <button disabled v-if="cartUpdated == true" class="course_info_btn">Added to cart</button>
                </div>
            </v-card>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
  image: String,
  title: String,
  rating: String,
  price: Number,
  tutorName: String,
  desc: String,
  productVariants: Array
});

const courseDuration = ref('');
const selectedVariant = ref({});
const cartAdd = ref(false);
const cartUpdated = ref(false);

// Automatically select the first variant as the default
onMounted(() => {
  if (props.productVariants) {
    courseDuration.value = props.productVariants[0].id;
    selectedVariant.value = props.productVariants[0];
  }
});

// Watch for changes in courseDuration to update the selected variant details
watch(courseDuration, (newValue) => {
  const variant = props.productVariants.find(v => v.id === newValue);
  if (variant) {
    selectedVariant.value = variant;
  }

  // Reset to default state whenever the user selects a different radio button
  cartAdd.value = false;
  cartUpdated.value = false;
});

const addToCart = () => {
  cartAdd.value = true;
  setTimeout(() => {
    cartAdd.value = false;
    cartUpdated.value = true;
  }, 2000);
};
</script>

<style scoped>
.loader_rotate_size {
    width: 10px;
    height: 10px;
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
}

.course_info_btn:hover {
    background: #F87126;
    color: #ffffff;
    transition: 0.3s;
    border: 2px solid;
}

.course_1_text span {
    font-weight: 600;
}
</style>