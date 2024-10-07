<script setup>
const { $axios, $retryRequest } = useNuxtApp();
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
let authUserToken = ref(null);
let authUserData = ref(null);
const choiceModal = ref(false);
const loginIsOpen = ref(false);
const signUpIsOpen = ref(false);
const loginEmail = ref('');
const loginOtpModalIsOpen = ref(false);
const inValidOtpMsg = ref('');
const isInvalidOtp = ref(false);
const isOtpFourDigit = ref(false);

const signUpName = ref('');
const signUpNumber = ref('');
const signUpEmail = ref('');
const signUpOtpModalIsOpen = ref(false);
const loginOtpIsVerified = ref(false);
const signUpOtpIsVerified = ref(false);
const expirationTime = ref(0); // This will hold the remaining time in seconds
const countdown = ref(0); // This will display the countdown
let countdownInterval = null; // To store the interval ID
const loginEmailErrorMsg = ref('');
const signupEmailErrorMsg = ref('');
const signupPhoneErrorMsg = ref('');
const signupNameErrorMsg = ref('');
const loginOTP = ref();
const registerOTP = ref();
const userLoginCard = ref(false);

// watch([authUserToken, authUserData], ([newToken, newData]) => {
//     if (newToken === null && newData === null) {
//         console.log("User is not authenticated.");
//     } else {
//         console.log("User is authenticated.");
//     }
// });

// Watch for changes in auth store's token and user state
// watch([() => authStore.token, () => authStore.user], ([newToken, newUser]) => {
//     if (newToken === null && newUser === null) {
//         console.log("User is not authenticated.");
//     } else {
//         console.log("User is authenticated.");
//     }
// });

watch(loginOTP, (newOTP) => {
    //console.log("loginOTP", newOTP.length == 4);
    isOtpFourDigit.value = newOTP.length == 4;  // Show error if OTP is not exactly 4 digits
});

watch(registerOTP, (newOTP) => {
    //console.log("registerOTP", newOTP.length == 4);
    isOtpFourDigit.value = newOTP.length == 4;  // Show error if OTP is not exactly 4 digits
});

const openStudentLoginModal = () => {
    loginOtpIsVerified.value = false;
    loginIsOpen.value = true;
    choiceModal.value = false;
}

const openLoginCard = () => {
    userLoginCard.value = !userLoginCard.value;
}

const openChoiceModal = () => {
    choiceModal.value = true;
}

const openSignUp = () => {
    signUpOtpIsVerified.value = false;
    loginIsOpen.value = false;
    signUpIsOpen.value = true;
}

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const startCountdown = (seconds) => {
    countdown.value = seconds; // Initialize countdown
    countdownInterval = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--; // Decrease countdown every second
        } else {
            clearInterval(countdownInterval); // Stop the countdown when it reaches 0
        }
    }, 1000); // Update every second
};

onBeforeUnmount(() => {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});

const verify_login_otp = async () => {
    try {
        // Reset state messages
        inValidOtpMsg.value = "";
        isInvalidOtp.value = false;
        loginOtpIsVerified.value = false;

        // Make the API request using the Axios instance
        const response = await authStore.verifyLoginOtp({
            email: loginEmail.value, // Assuming loginEmail is a reactive ref
            otp: loginOTP.value,
        });

        console.log("User Data:", authStore.user, "Auth Token:", authStore.token);

        // Check the response for success
        if (response.success) {
            loginOtpIsVerified.value = true;
        } else {
            if (authStore.otpStatus === 'OTP_INVALID') {
                inValidOtpMsg.value = response.message;
                isInvalidOtp.value = true;
            }
            if (authStore.otpStatus === 'OTP_EXPIRED') {
                inValidOtpMsg.value = response.message;
                isInvalidOtp.value = true;
            }
        }
    } catch (error) {
        console.error('Error verifying OTP:', error); // Log the error for debugging
        // Optionally handle error messages from the server
        if (error.response && error.response.data) {
            console.error('API Error:', error.response.data.errors || error.response.data.message);
        }
    }
};

const verify_signup_otp = async () => {
    try {
        // Reset state messages
        inValidOtpMsg.value = "";
        isInvalidOtp.value = false;
        signupEmailErrorMsg.value = "";
        signupPhoneErrorMsg.value = "";

        // Make the API request using the Axios instance
        const response = await authStore.verifySignUpOtp({
            email: signUpEmail.value, // Assuming signUpEmail is a reactive ref
            otp: registerOTP.value,
        });

        console.log("User Data:", authStore.user, "Auth Token:", authStore.token);

        // Check the response for success
        if (response.success) {
            signUpOtpIsVerified.value = true;
        } else {
            if (authStore.otpStatus === 'OTP_INVALID') {
                inValidOtpMsg.value = response.message;
                isInvalidOtp.value = true;
            }
            if (authStore.otpStatus === 'OTP_EXPIRED') {
                inValidOtpMsg.value = response.message;
                isInvalidOtp.value = true;
            }
        }
    } catch (error) {
        console.error('Error verifying signup OTP:', error); // Log the error for debugging
        // Optionally handle error messages from the server
        if (error.response && error.response.data) {
            console.error('API Error:', error.response.data.errors || error.response.data.message);
            if (error.response.data.errors.email) {
                signupEmailErrorMsg.value = error.response.data.errors.email[0];
            }
            if (error.response.data.errors.phone) {
                signupPhoneErrorMsg.value = error.response.data.errors.phone[0];
            }
        }
    }
};

const goToDashboard = () => {
    console.log("Go To Dashboard");

    if (loginOtpIsVerified) {
        loginOtpModalIsOpen.value = false;
        loginEmail.value = "";
        loginEmailErrorMsg.value = "";
        loginOTP.value = "";
        useRouter().push('/');
    }

    if (signUpOtpIsVerified) {
        signUpOtpModalIsOpen.value = false;
        signUpEmail.value = "";
        signUpNumber.value = "";
        signUpName.value = "";
        signupNameErrorMsg.value = "";
        signupEmailErrorMsg.value = "";
        signupPhoneErrorMsg.value = "";
        registerOTP.value = "";
        useRouter().push('/');
    }
}

function logout() {
    userLoginCard.value = false;
    authStore.logout();
    useRouter().push('/'); // Redirect to the login page
}

const validators = {
    name: /^[a-zA-Z\s'-]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\d{10}$/,
};

const isValidName = (name) => validators.name.test(name);
const isValidEmail = (email) => validators.email.test(email);
const isValidPhone = (phone) => validators.phone.test(phone);

const registerOtpModal = debounce(async () => {

    if (!signUpEmail.value) {
        signupEmailErrorMsg.value = "Email is required";
        return;
    } else if (!isValidEmail(signUpEmail.value)) {
        signupEmailErrorMsg.value = "Please enter a valid email";
        return;
    }

    if (!signUpName.value) {
        signupNameErrorMsg.value = "Name is required";
        return;
    } else if (!isValidName(signUpName.value)) {
        signupNameErrorMsg.value = "Please enter a valid name";
        return;
    }

    if (!signUpNumber.value) {
        signupPhoneErrorMsg.value = "Phone is required";
        return;
    } else if (!isValidPhone(signUpNumber.value)) {
        signupPhoneErrorMsg.value = "Please enter a 10-digit mobile number";
        return;
    }

    try {
        // Reset error messages
        signupNameErrorMsg.value = "";
        signupPhoneErrorMsg.value = "";
        signupEmailErrorMsg.value = "";

        // Use authStore.requestOtp for sending the OTP
        const responseMessage = await authStore.sendSignUpOtp({
            name: signUpName.value,
            email: signUpEmail.value,
            phone: signUpNumber.value,
            role: 'student',
        });

        console.log(responseMessage); // Log the response message from the store
        console.log("RADHEY RADHEY KRISHNA", authStore.otpStatus, authStore.expirationTime);
        // Assuming `authStore.requestOtp` resolves with OTP expiration details
        if (authStore.otpStatus === 'OTP_SENT') {
            if (authStore.expirationTime >= 120) {
                expirationTime.value = 120;
                startCountdown(expirationTime.value);
            }
            signUpIsOpen.value = false;
            signUpOtpModalIsOpen.value = true;
        } else {
            signupEmailErrorMsg.value = "OTP sending failed. Please try again.";
        }
    } catch (error) {
        console.error('Error sending signup OTP:', error); // Log the error for debugging

        // Handle specific error messages if available
        if (error.response && error.response.data) {
            console.error('API Error:', error.response.data.errors || error.response.data.message);
            if (error.response.data.errors.email) {
                signupEmailErrorMsg.value = error.response.data.errors.email[0];
            }
            if (error.response.data.errors.phone) {
                signupPhoneErrorMsg.value = error.response.data.errors.phone[0];
            }
        }
    }
}, 300);

const loginOtpModal = debounce(async () => {
    // Input validation
    if (!loginEmail.value) {
        loginEmailErrorMsg.value = "Email is required";
        return;
    } else if (!isValidEmail(loginEmail.value)) {
        loginEmailErrorMsg.value = "Please enter a valid email";
        return;
    }

    // Reset state variables
    countdown.value = 0;
    loginOTP.value = "";
    inValidOtpMsg.value = "";
    isInvalidOtp.value = false;
    loginEmailErrorMsg.value = "";

    try {
        const responseMessage = await authStore.sendLoginOtp({
            email: loginEmail.value,
        });

        console.log(responseMessage); // Log the response message from the store
        console.log("RADHEY RADHEY KRISHNA", authStore.otpStatus, authStore.expirationTime);

        // Handle the response
        if (authStore.otpStatus === 'OTP_SENT') {
            if (authStore.expirationTime >= 120) {
                expirationTime.value = 120;
                startCountdown(expirationTime.value);
            }
            loginIsOpen.value = false;
            loginOtpModalIsOpen.value = true;
        } else {
            loginEmailErrorMsg.value = response.message;
        }

    } catch (e) {
        // Handle errors
        console.log(e.response?.data.errors);
        if (e.response?.data.errors?.email) {
            loginEmailErrorMsg.value = e.response.data.errors.email[0];
        } else {
            loginEmailErrorMsg.value = "An unknown error occurred. Please try again.";
        }
    }
}, 300); // Adjust debounce delay as needed


const loginOtpVerified = async () => {
    await verify_login_otp();
}

const registerOtpVerified = async () => {
    await verify_signup_otp();
}

const signInOne = () => {
    signUpIsOpen.value = false;
    loginIsOpen.value = true;
}

const signInTwo = () => {
    signUpOtpModalIsOpen.value = false;
    loginIsOpen.value = true;
}

const closeChoiceModal = () => {
    choiceModal.value = false;
}

onMounted(async () => {
    await authStore.restoreAuthFromCookies();
});
</script>

<template>
    <div>
        <div class="top-header">
            <div class="wrapper">
                <div class="d-flex flex-wrap justify-content-md-between justify-center align-items-center">
                    <div class="">
                        <div class="banner text-white">
                            <div class="slider-container">
                                <p class="header_text mb-0">Learn Anytime, Anywhere Get Your Tablet and Start Mastering
                                    Your
                                    Courses!</p>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="d-flex gap-4 justify-end">
                            <div class="d-flex gap-1 justify-content-end">
                                <img class="contact_items" src="/images/call.png" />
                                <p class="text-white mb-0">9225894255</p>
                            </div>
                            <div class="d-flex gap-1 justify-content-end">
                                <img class="contact_items" src="/images/msg.png" />
                                <p class="text-white mailto:mb-0">doubtlessinfo23@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom_header">
            <div class="wrapper">
                <div
                    class="d-flex flex-wrap login_card_pos justify-content-md-between justify-center align-items-center">
                    <div class="gap-2 d-flex">
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
                    <div class="">
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
                        <nuxt-link class="cart_link" to="/cart">
                            <UBadge class="cart_counter" variant="solid">{{ cartStore.itemCount }}</UBadge>
                            <img class="cart_img" src="../public/images/cart.png" />
                        </nuxt-link>

                        <button @click="openChoiceModal" class="hdr_btn" v-if="!authStore.isAuthenticated">Login
                            now</button>
                        <img @click="openLoginCard" class="user_logo" v-else src="/images/user.png" />

                        <!-- User Login Card -->
                        <VCard v-if="userLoginCard" class="user_login_card">

                            <VCardTitle class="user_login_card_title d-flex align-center">
                                <h5>{{ authStore.user?.name.slice(0, 1) }}</h5>
                                <div>
                                    <p class="user_login_card_name">{{ authStore.user?.name }}</p>
                                    <p class="user_login_card_email">{{ authStore.user?.email }}</p>
                                </div>
                            </VCardTitle>
                            <VCardText class="user_login_card_text">
                                <nuxt-link class="no_txt_deco" :to="`/my-learning/${authStore.user?.id}`">
                                    <p class="user_login_card_p user_login_card_p_mb">My learning</p>
                                </nuxt-link>
                                <p class="user_login_card_p user_login_card_p_mb">Help and support</p>
                                <p @click="logout" class="user_login_card_p">Logout</p>
                            </VCardText>
                        </VCard>

                        <!-- <button @click="logout" class="hdr_btn" v-else>Logout</button> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- 👉 Login Modals -->

        <v-dialog persistent class="loginModal" v-model="choiceModal">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png"
                    @click="choiceModal = false" />
                <VRow>
                    <VCol class="modal_heading" cols="12">
                        <h1 class="modal_heading_h">Welcome</h1>
                        <p class="modal_heading_p">enter your details below to sign<br> into your account</p>
                    </VCol>
                </VRow>
                <VRow>
                    <VCol class="loginBtn px-0" md="6">
                        <UButton @click="openStudentLoginModal" :ui="{ rounded: 'rounded-full' }">Join As
                            <span>Student</span>
                        </UButton>
                    </VCol>
                    <VCol class="loginBtn px-0" md="6" cols="12">
                        <nuxt-link class="nav-link" to="/teaching/register">
                            <UButton @click="closeChoiceModal" :ui="{ rounded: 'rounded-full' }">Join As
                                <span>Instructor</span>
                            </UButton>
                        </nuxt-link>
                    </VCol>
                </VRow>
            </VCard>
        </v-dialog>

        <v-dialog persistent class="loginModal" v-model="loginIsOpen">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png"
                    @click="loginIsOpen = false" />
                <VCardTitle class="px-0 card_title py-0">
                    <h1 class="modal_heading_h mb-4">Login</h1>
                    <p class="loginModal_text">Enter Your email to continue your<br> journey</p>
                </VCardTitle>
                <VCardText class="px-0 py-0">
                    <v-form @submit.prevent="loginOtpModal">
                        <!-- <v-text-field class="login_field" v-model="loginEmail" label="Enter Your Email">
                        </v-text-field> -->
                        <UInput class="login_field" placeholder="Enter Your Email" v-model="loginEmail" />
                        <p class="err_msg" v-if="loginEmailErrorMsg != ''">{{ loginEmailErrorMsg }}</p>
                        <VBtn class="login_button" variant="tonal" type="submit">Request OTP
                        </VBtn>
                    </v-form>
                    <p class="loginModal_text_2">
                        Don't have an account ?
                        <span @click="openSignUp">Sign Up</span>
                    </p>
                </VCardText>
            </VCard>
        </v-dialog>

        <v-dialog persistent class="loginModal" v-model="loginOtpModalIsOpen">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png"
                    @click="loginOtpModalIsOpen = false" />
                <VCardTitle class="px-0 card_title border_bottom mb-0 py-0">
                    <h1 class="modal_heading_h mb-0 modal_heading_pad">Login</h1>
                </VCardTitle>
                <VCardText class="px-0 py-0 otp_card_text">
                    <VForm @submit.prevent="loginOtpVerified" class="otp_form">
                        <p class="enterOtpText text_align_center">Enter OTP</p>
                        <v-otp-input v-model="loginOTP" class="py-0" variant="solo" length="4"></v-otp-input>
                        <p v-if="loginOtpIsVerified == false && countdown > 0" class="otp_resend_time text_align_right">
                            OTP will expire in: <span class="otp_resend_span">{{ countdown }} seconds</span>
                        </p>
                        <p v-if="loginOtpIsVerified == false && countdown == 0"
                            class="otp_resend text_align_right otp_resend_time" @click="loginOtpModal">Resend OTP</p>
                        <VBtn v-if="loginOtpIsVerified == false" class="login_button" variant="tonal" type="submit"
                            :disabled="!isOtpFourDigit">Verify OTP</VBtn>
                        <VBtn v-if="loginOtpIsVerified == true" class="login_button" variant="tonal"
                            @click="goToDashboard">
                            Login</VBtn>
                    </VForm>
                    <div v-if="loginOtpIsVerified == true" class="d-flex align-center verify_div gap-1 justify-center">
                        <img class="verify_img" src="/images/Check.png" />
                        <p class="email_verify_text" style="margin-top: 0 !important;">Verified Code</p>
                    </div>
                    <v-alert v-if="isInvalidOtp" border="top" type="error" variant="outlined" prominent>{{ inValidOtpMsg
                        }}</v-alert>
                    <p class="loginModal_text_2">
                        Don't have an account ?
                        <span @click="openSignUp">Sign Up</span>
                    </p>
                    <p v-if="loginOtpIsVerified == false" class="email_verify_text">verification code sent on <span
                            class="email_lower">{{ loginEmail }}</span></p>
                </VCardText>
            </VCard>
        </v-dialog>

        <!-- 👉 SignUp Modals -->

        <v-dialog persistent class="loginModal" v-model="signUpIsOpen">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png"
                    @click="signUpIsOpen = false" />
                <VCardTitle class="px-0 card_title py-0">
                    <h1 class="modal_heading_h mb-4">Sign Up</h1>
                    <p class="loginModal_text">we will need your profile details to<br> give you a better experience</p>
                </VCardTitle>
                <VCardText class="px-0 py-0">
                    <v-form @submit.prevent="registerOtpModal">
                        <!-- <v-text-field class="login_field" v-model="loginEmail" label="Enter Your Email">
                        </v-text-field> -->
                        <UInput class="login_field" placeholder="Enter Your Name" v-model="signUpName" />
                        <p class="err_msg" v-if="signupNameErrorMsg != ''">{{ signupNameErrorMsg }}</p>
                        <UInput class="login_field" placeholder="Enter Your Phone Number" v-model="signUpNumber" />
                        <p class="err_msg" v-if="signupPhoneErrorMsg != ''">{{ signupPhoneErrorMsg }}</p>
                        <UInput class="login_field" placeholder="Enter Your Email" v-model="signUpEmail" />
                        <p class="err_msg" v-if="signupEmailErrorMsg != ''">{{ signupEmailErrorMsg }}</p>
                        <VBtn class="login_button" variant="tonal" type="submit">Request OTP</VBtn>
                    </v-form>
                    <p class="loginModal_text_2">
                        I have an account ?
                        <span @click="signInOne">Sign In</span>
                    </p>
                </VCardText>
            </VCard>
        </v-dialog>

        <v-dialog persistent class="loginModal" v-model="signUpOtpModalIsOpen">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png"
                    @click="signUpOtpModalIsOpen = false" />
                <VCardTitle class="px-0 card_title py-0">
                    <h1 class="modal_heading_h mb-4">Sign Up</h1>
                    <p class="loginModal_text">we will need your profile details to<br> give you a better experience</p>
                </VCardTitle>
                <VCardText class="px-0 py-0 otp_card_text">
                    <VForm @submit.prevent="registerOtpVerified" class="otp_form">
                        <p class="enterOtpText text_align_center">Enter OTP</p>
                        <v-otp-input class="py-0" v-model="registerOTP" variant="solo" length="4"></v-otp-input>
                        <p v-if="signUpOtpIsVerified == false && countdown > 0"
                            class="otp_resend_time text_align_right">
                            OTP will expire in: <span class="otp_resend_span">{{ countdown }} seconds</span>
                        </p>
                        <p v-if="signUpOtpIsVerified == false && countdown == 0"
                            class="otp_resend text_align_right otp_resend_time" @click="registerOtpModal">Resend OTP</p>
                        <VBtn v-if="signUpOtpIsVerified == false" style="margin: 0 !important" class="login_button"
                            variant="tonal" type="submit" :disabled="!isOtpFourDigit">Verify OTP</VBtn>
                        <VBtn v-if="signUpOtpIsVerified == true" class="login_button" variant="tonal"
                            @click="goToDashboard">
                            Sign Up</VBtn>
                    </VForm>
                    <div v-if="signUpOtpIsVerified == true" class="d-flex align-center verify_div gap-1 justify-center">
                        <img class="verify_img" src="/images/Check.png" />
                        <p class="email_verify_text" style="margin-top: 0 !important;">Verified Code</p>
                    </div>
                    <v-alert v-if="isInvalidOtp" border="top" type="error" variant="outlined" prominent>{{ inValidOtpMsg
                        }}</v-alert>
                    <p v-if="signUpOtpIsVerified == false" class="email_verify_text signUpVerify"
                        style="margin-top: 11px !important;">your login OTP sent to your email <span
                            class="email_blue">{{ signUpEmail }}</span></p>

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
.page_active_link {
    border-bottom: 1px solid #fff;
}

.user_login_card_p_mb {
    margin-bottom: 10px !important;
}

p.user_login_card_p {
    font-size: 14px;
    font-weight: 500;
    color: #676666;
}

.no_txt_deco {
    text-decoration: none;
}

p.user_login_card_p:hover {
    cursor: pointer;
}

p.user_login_card_name {
    font-size: 18px;
    font-weight: 600;
    color: #000;
}

p.user_login_card_email {
    font-size: 14px;
    font-weight: 500;
    color: #757373;
}

.user_login_card_text {
    padding: 0;
}

.user_login_card {
    width: 243px;
    position: absolute;
    top: 102px;
    right: 50px;
    box-shadow: 0 4px 9px #00000010;
    padding: 10px 15px 30px 15px;
    z-index: 99;
}

.user_login_card_title {
    padding: 10px 0;
    border-bottom: 1px solid #75737330;
    margin-bottom: 10px;
}

.user_login_card_title h5 {
    margin: 0;
    width: 50px;
    height: 50px;
    border: 1px solid #F87126;
    border-radius: 50%;
    font-size: 25px;
    font-weight: 800;
    margin-right: 5px;
    padding: 9px 15px;
}

.user_login_card_pos {
    position: relative;
}

.otp_resend:hover {
    cursor: pointer;
}

.err_msg {
    color: red;
    font-weight: 500;
    text-align: left;
}

.email_lower {
    text-transform: none !important;
}

img.modal_cancel_btn {
    width: 20px;
    height: 20px;
}

.modal_cancel_btn:hover {
    cursor: pointer;
}

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