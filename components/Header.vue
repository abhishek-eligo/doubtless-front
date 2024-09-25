<script setup>
const isOpen = ref(false);
const loginIsOpen = ref(false);
const signUpIsOpen = ref(false);
const loginEmail = ref('');
const OtpModalIsOpen = ref(false);

const signUpName = ref('');
const signUpNumber = ref();
const signUpEmail = ref('');
const signUpOtp = ref(false);
const otpIsVerified = ref(false);
const signUpOtpVerified = ref(false);

const studentLogin = () => {
    isOpen.value = true;
}

const openLoginModal = () => {
    loginIsOpen.value = true;
    isOpen.value = false;
}

const signUpOne = () => {
    loginIsOpen.value = false;
    signUpIsOpen.value = true;
}

const signUpTwo = () => {
    OtpModalIsOpen.value = false;
    signUpIsOpen.value = true;
}

const openOtpModal = () => {
    loginIsOpen.value = false;
    OtpModalIsOpen.value = true;
}

const requestSignOtpModal = () => {
    signUpIsOpen.value = false;
    signUpOtp.value = true;

}

const OtpVerified = () => {
    otpIsVerified.value = true;
}

const verifySignUpOtp = () => {
    signUpOtpVerified.value = true;
}

const signInOne = () => {
    signUpIsOpen.value = false;
    loginIsOpen.value = true;
}

const signInTwo = () => {
    signUpOtp.value = false;
    loginIsOpen.value = true;
}

const closeChoiceModal = () => {
    isOpen.value = false;
}
</script>

<template>
    <div>
        <div class="top-header">
            <div class="wrapper">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <div class="banner text-white">
                            <div class="slider-container">
                                <p class="header_text mb-0">Learn Anytime, Anywhere Get Your Tablet and Start Mastering
                                    Your
                                    Courses!</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="d-flex gap-4 justify-end">
                            <div class="d-flex gap-1 justify-content-end">
                                <img class="contact_items" src="/images/call.png" />
                                <p class="text-white mb-0">9225894255</p>
                            </div>
                            <div class="d-flex gap-1 justify-content-end">
                                <img class="contact_items" src="/images/msg.png" />
                                <p class="text-white mb-0">doubtlessinfo23@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom_header">
            <div class="wrapper">
                <div class="row align-items-center">
                    <div class="col-md-4 gap-2 d-flex">
                        <!-- Logo -->
                        <nuxt-link to="/">
                            <img class="logo_img" src="/images/logo_1.png" />
                        </nuxt-link>

                        <!-- Search Bar -->
                        <form class="align-items-center d-flex mb-0">
                            <div class="search_field d-flex">
                                <input class="form-control input_search" type="search"
                                    placeholder="Find video courses, mock tests, PDF books..." aria-label="Search">
                                <button class="btn" type="submit">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <!-- Navbar Links -->
                        <div class="navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav gap-3 justify-content-center flex-row">
                                <li class="nav-item">
                                    <nuxt-link class="nav-link" to="/courses" active-class="active">Courses</nuxt-link>
                                </li>
                                <li class="nav-item">
                                    <nuxt-link class="nav-link" to="/teachOnDoubtless" active-class="active">Teach on
                                        Doubtless</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-center justify-content-end">
                        <nuxt-link to="/cart">
                            <img class="cart_img" src="../public/images/cart.png" />
                        </nuxt-link>
                        <button @click="studentLogin" class="hdr_btn">Login now</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 👉 Login Modals -->

        <v-dialog persistent class="loginModal" v-model="isOpen">
            <VCard class="loginCard text_align_center">
                <UButton color="gray" variant="tonal" icon="i-heroicons-x-mark-20-solid" class="modalCancelBtn"
                @click="isOpen = false" />
                <VRow>
                    <VCol class="modal_heading" cols="12">
                        <h1 class="modal_heading_h">Welcome</h1>
                        <p class="modal_heading_p">enter your details below to sign<br> into your account</p>
                    </VCol>
                </VRow>
                <VRow>
                    <VCol class="loginBtn px-0" md="6">
                        <UButton @click="openLoginModal" :ui="{ rounded: 'rounded-full' }">Join As <span>Student</span></UButton>
                    </VCol>
                    <VCol class="loginBtn px-0" md="6" cols="12">
                        <nuxt-link class="nav-link" to="/teaching/register">
                            <UButton @click="closeChoiceModal" :ui="{ rounded: 'rounded-full' }">Join As <span>Instructor</span></UButton>
                        </nuxt-link>
                    </VCol>
                </VRow>
            </VCard>
        </v-dialog>

        <v-dialog persistent class="loginModal" v-model="loginIsOpen">
            <VCard class="loginCard text_align_center">
                <UButton color="gray" variant="tonal" icon="i-heroicons-x-mark-20-solid" class="modalCancelBtn"
                @click="loginIsOpen = false" />
                <VCardTitle class="px-0 card_title py-0">
                    <h1 class="modal_heading_h mb-4">Login</h1>
                    <p class="loginModal_text">Enter Your email to continue your<br> journey</p>
                </VCardTitle>
                <VCardText class="px-0 py-0">
                    <v-form @submit.prevent.default="openOtpModal">
                        <!-- <v-text-field class="login_field" v-model="loginEmail" label="Enter Your Email">
                        </v-text-field> -->
                        <UInput class="login_field" placeholder="Enter Your Email" v-model="loginEmail" />
                        <VBtn class="login_button" variant="tonal" type="submit">Request OTP
                        </VBtn>
                    </v-form>
                    <p class="loginModal_text_2">
                        Don't have an account ?
                        <span @click="signUpOne">Sign Up</span>
                    </p>
                </VCardText>
            </VCard>
        </v-dialog>

        <v-dialog persistent class="loginModal" v-model="OtpModalIsOpen">
            <VCard class="loginCard text_align_center">
                <UButton color="gray" variant="tonal" icon="i-heroicons-x-mark-20-solid" class="modalCancelBtn"
                @click="OtpModalIsOpen = false" />
                <VCardTitle class="px-0 card_title border_bottom mb-0 py-0">
                    <h1 class="modal_heading_h mb-0 modal_heading_pad">Login</h1>
                </VCardTitle>
                <VCardText class="px-0 py-0 otp_card_text">
                    <VForm @submit.prevent.default class="otp_form">
                        <p class="enterOtpText text_align_center">Enter OTP</p>
                        <v-otp-input class="py-0" variant="solo" length="4"></v-otp-input>
                        <p v-if="otpIsVerified == false" class="otp_resend_time text_align_right">Resend OTP in: <span
                                class="otp_resend_span">28 Second</span></p>
                        <VBtn @click="OtpVerified" v-if="otpIsVerified == false" class="login_button" variant="tonal" type="submit">Verify OTP</VBtn>
                        <VBtn v-if="otpIsVerified == true" class="login_button" variant="tonal" type="submit">Login</VBtn>
                    </VForm>
                    <div v-if="otpIsVerified == true" class="d-flex align-center verify_div gap-1 justify-center">
                        <img class="verify_img" src="/images/Check.png" />
                        <p class="email_verify_text" style="margin-top: 0 !important;">Verified Code</p>
                    </div>
                    <p class="loginModal_text_2">
                        Don't have an account ?
                        <span @click="signUpTwo">Sign Up</span>
                    </p>
                    <p v-if="otpIsVerified == false" class="email_verify_text">verification code sent on rahulrahta@eligocs.com</p>
                </VCardText>
            </VCard>
        </v-dialog>

        <!-- 👉 SignUp Modals -->

        <v-dialog persistent class="loginModal" v-model="signUpIsOpen">
            <VCard class="loginCard text_align_center">
                <UButton color="gray" variant="tonal" icon="i-heroicons-x-mark-20-solid" class="modalCancelBtn"
                @click="signUpIsOpen = false" />
                <VCardTitle class="px-0 card_title py-0">
                    <h1 class="modal_heading_h mb-4">Sign Up</h1>
                    <p class="loginModal_text">we will need your profile details to<br> give you a better experience</p>
                </VCardTitle>
                <VCardText class="px-0 py-0">
                    <v-form @submit.prevent.default="requestSignOtpModal">
                        <!-- <v-text-field class="login_field" v-model="loginEmail" label="Enter Your Email">
                        </v-text-field> -->
                        <UInput class="login_field" placeholder="Enter Your Name" v-model="signUpName" />
                        <UInput class="login_field" placeholder="Enter Your Phone Number" v-model="signUpNumber" />
                        <UInput class="login_field" placeholder="Enter Your Email" v-model="signUpEmail" />
                        <VBtn class="login_button" variant="tonal" type="submit">Request OTP</VBtn>
                    </v-form>
                    <p class="loginModal_text_2">
                        I have an account ?
                        <span @click="signInOne">Sign In</span>
                    </p>
                </VCardText>
            </VCard>
        </v-dialog>

        <v-dialog persistent class="loginModal" v-model="signUpOtp">
            <VCard class="loginCard text_align_center">
                <UButton color="gray" variant="tonal" icon="i-heroicons-x-mark-20-solid" class="modalCancelBtn"
                @click="signUpOtp = false" />
                <VCardTitle class="px-0 card_title py-0">
                    <h1 class="modal_heading_h mb-4">Sign Up</h1>
                    <p class="loginModal_text">we will need your profile details to<br> give you a better experience</p>
                </VCardTitle>
                <VCardText class="px-0 py-0 otp_card_text">
                    <VForm @submit.prevent.default class="otp_form">
                        <p class="enterOtpText text_align_center">Enter OTP</p>
                        <v-otp-input class="py-0" variant="solo" length="4"></v-otp-input>
                        <p v-if="signUpOtpVerified == false" class="otp_resend_time text_align_right mb-4">
                            Resend OTP in: 
                            <span class="otp_resend_span">28 Second</span>
                        </p>
                        <VBtn @click="verifySignUpOtp" v-if="signUpOtpVerified == false" style="margin: 0 !important" class="login_button" variant="tonal" type="submit">Verify OTP</VBtn>
                        <VBtn v-if="signUpOtpVerified == true" class="login_button" variant="tonal" type="submit">Sign Up</VBtn>
                    </VForm>
                    <div v-if="signUpOtpVerified == true" class="d-flex align-center verify_div gap-1 justify-center">
                        <img class="verify_img" src="/images/Check.png" />
                        <p class="email_verify_text" style="margin-top: 0 !important;">Verified Code</p>
                    </div>
                    <p v-if="signUpOtpVerified == false" class="email_verify_text signUpVerify" style="margin-top: 11px !important;">your  login OTP sent to your email <span class="email_blue">rahulrajta@eligocs.com</span></p>
                    <p class="loginModal_text_2">
                        I have an account ?
                        <span @click="signInTwo">Sign In</span>
                    </p>
                </VCardText>
            </VCard>
        </v-dialog>

        <!-- <v-dialog class="loginModal" v-model="">
            <VCard class="logincard text_align_center">
                <VCardTitle class="px-0 card_title border_bottom mb-0 py-0">
                    <h1 class="modal_heading_h mb-0 modal_heading_pad">Login</h1>
                </VCardTitle>
            </VCard>
        </v-dialog> -->
    </div>
</template>

<style scoped>
/* .modal_width #headlessui-dialog-panel-v-0-4 {
    max-width: 100% !important;
    width: 100% !important;
} */

.signUpVerify {
    margin-bottom: 20px !important;
}

.email_blue {
    color: #3A86FF;
    text-transform: none !important;
}

.verify_div {
    margin-bottom: 20px;
}

.enterOtpText {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px !important;
}

.border_bottom {
    border-bottom: 2px solid var(--default_color);
}

.verify_img {
    width: 20px;
    height: 20px;
}


.modal_heading_pad {
    padding-bottom: 20px !important;
}

.email_verify_text {
    font-size: 14px;
    color: var(--tutorTextClr);
    margin-top: 8px !important;
    text-transform: capitalize !important;
}

.otp_card_text {
    margin-top: 20px;
}

.otp_resend_time {
    font-size: 10px;
    color: var(--black);
    margin-top: 4px !important;
}

.otp_resend_time .otp_resend_span {
    color: var(--default_color);
}


.card_title {
    margin-bottom: 20px;
}

.loginModal {
    max-width: 600px;
    width: 100%;
}

.loginCard {
    padding: 50px 60px;
    background: #dfdfdfe6;
}

.loginModal_text {
    font-size: 18px;
    font-weight: 600;
    color: var(--black);
    text-transform: capitalize;
}

.loginModal_text_2 {
    font-size: 15px;
    font-weight: 400;
    text-transform: capitalize;
}

.modal_heading {
    text-align: center;
}

.modal_heading_h {
    font-size: 38px;
    font-weight: bold;
}

.modal_heading_p {
    text-transform: capitalize;
    font-size: 25px;
    font-weight: 500;
}

.loginBtn {
    text-align: center;
}

.loginBtn button {
    color: #F87126 !important;
    background-color: #545454 !important;
    padding: 10px 20px !important;
    font-size: 17px !important;
    font-weight: 560 !important;
}

.loginBtn button:hover {
    background: #F3D1BE !important;
    color: #000 !important;
    transition: all 0.5s;
}

.loginBtn button:hover span {
    color: #F87126 !important;
}
</style>