<script setup>
let authUserToken = ref(null);
let authUserData = ref(null);
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
const expirationTime = ref(0); // This will hold the remaining time in seconds
const countdown = ref(0); // This will display the countdown
let countdownInterval = null; // To store the interval ID
const loginEmailErrorMsg = ref('');
const signupEmailErrorMsg = ref('');
const signupPhoneErrorMsg = ref('');
const signupNameErrorMsg = ref('');
const loginOTP = ref();
const userLoginCard = ref(false);

watch([authUserToken, authUserData], ([newToken, newData]) => {
    if (newToken === null && newData === null) {
        console.log("User is not authenticated.");
    } else {
        console.log("User is authenticated.");
    }
});

const openLoginCard = () => {
    userLoginCard.value = !userLoginCard.value;
}

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

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const loginOtpModal = debounce(async () => {
    if (!loginEmail.value) {
        loginEmailErrorMsg.value = "Email is required";
        return;
    } else if (!isValidEmail(loginEmail.value)) {
        loginEmailErrorMsg.value = "Please enter a valid email";
        return;
    }

    try {
        const response = await $fetch('http://localhost:8000/api/send-login-otp', {
            method: "POST",
            body: {
                email: loginEmail.value,
            },
        });
        if (response.success) {
            if (response.otp_expiration_time >= 120) {
                expirationTime.value = 120;
                startCountdown(expirationTime.value);
            }
            loginIsOpen.value = false;
            OtpModalIsOpen.value = true;
        } else {
            loginEmailErrorMsg.value = response.message;
        }
    } catch (error) {
        console.log(error.message);
    }
}, 300); // Adjust delay as needed


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

const verify_otp = async () => {
    try {
        const response = await $fetch('http://localhost:8000/api/verify-login-otp', {
            method: "POST",
            body: {
                email: loginEmail.value, // Assuming loginEmail is a reactive ref
                otp: loginOTP.value
            },
        });
        if (response.success) {
            loginEmail.value = "";
            loginOTP.value = "";
            console.log(response);
            const authCookie = useCookie('authToken');
            authCookie.value = response.token; // Set the token in the cookie
            authUserToken.value = authCookie.value;
            const userCookie = useCookie('userData');
            userCookie.value = JSON.stringify(response.user); // Store user data as a string
            authUserData.value = userCookie.value ? JSON.parse(userCookie.value) : null;
            otpIsVerified.value = true;
        }
    } catch (error) {
        console.log(error); // Handle API errors if they exist
        // if (error.data && error.data.errors) {
        //     console.log(error.data.errors); 
        // } else {
        //     console.log(error.message || "An unknown error occurred"); 
        // }
    }
};

const goToDashboard = () => {
    console.log("Go To Dashboard");
    OtpModalIsOpen.value = false;
    useRouter().push('/');
}

function logout() {
    userLoginCard.value = false;
    const tokenCookie = useCookie('authToken'); // Access the token cookie
    const userCookie = useCookie('userData'); // Access the user data cookie

    tokenCookie.value = null; // Clear the token from the cookie
    userCookie.value = null; // Clear the user data from the cookie
    authUserToken.value = null;
    authUserData.value = null;
    useRouter().push('/'); // Redirect to the login page
}

const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    return nameRegex.test(name);
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
};

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
        signupNameErrorMsg.value = "Please enter valid name";
        return;
    }

    if (!signUpNumber.value) {
        signupPhoneErrorMsg.value = "Phone is required";
        return;
    } else if (!isValidPhone(signUpNumber.value)) {
        signupPhoneErrorMsg.value = "Please enter 10 digit mobile number";
        return;
    }

    try {
        const result = await $fetch('http://localhost:8000/api/send-signup-otp', {
            method: "POST",
            body: {
                name: signUpName.value,
                email: signUpEmail.value,
                phone: signUpNumber.value,
                role: 'student'
            }
        })
        if (response.success) {
            if (response.otp_expiration_time >= 120) {
                expirationTime.value = 120;
                startCountdown(expirationTime.value);
            }
            signUpIsOpen.value = false;
            signUpOtp.value = true;
        } else {
            signupEmailErrorMsg.value = response.message;
        }
    } catch (e) {
        console.log(e.data.errors);
    }

}, 300);

const OtpVerified = async () => {
    await verify_otp();
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
                    <div class="col-md-2 d-flex user_login_card_pos align-center justify-content-end">
                        <nuxt-link to="/cart">
                            <img class="cart_img" src="../public/images/cart.png" />
                        </nuxt-link>
                        <button @click="studentLogin" class="hdr_btn"
                            v-if="authUserToken === null || authUserData === null">Login now</button>
                        <!-- <button @click="logout" class="hdr_btn" v-else>Logout</button> -->
                        <img @click="openLoginCard" class="user_logo" v-else src="/images/user.png" />
                        <VCard v-if="userLoginCard == true" class="user_login_card">
                            <VCardTitle class="user_login_card_title d-flex align-center">
                                <h5>R</h5>
                                <div>
                                    <p class="user_login_card_name">Rahul Rajta</p>
                                    <p class="user_login_card_email">{{ loginEmail }}</p>
                                </div>
                            </VCardTitle>
                            <VCardText class="user_login_card_text">
                                <p class="user_login_card_p user_login_card_p_mb">My learning</p>
                                <p class="user_login_card_p user_login_card_p_mb">Help and support</p>
                                <p @click="logout" class="user_login_card_p">Logout</p>
                            </VCardText>
                        </VCard>
                    </div>
                </div>
            </div>
        </div>

        <!-- 👉 Login Modals -->

        <v-dialog persistent class="loginModal" v-model="isOpen">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png" @click="isOpen = false" />
                <VRow>
                    <VCol class="modal_heading" cols="12">
                        <h1 class="modal_heading_h">Welcome</h1>
                        <p class="modal_heading_p">enter your details below to sign<br> into your account</p>
                    </VCol>
                </VRow>
                <VRow>
                    <VCol class="loginBtn px-0" md="6">
                        <UButton @click="openLoginModal" :ui="{ rounded: 'rounded-full' }">Join As <span>Student</span>
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
                        <span @click="signUpOne">Sign Up</span>
                    </p>
                </VCardText>
            </VCard>
        </v-dialog>

        <v-dialog persistent class="loginModal" v-model="OtpModalIsOpen">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png"
                    @click="OtpModalIsOpen = false" />
                <VCardTitle class="px-0 card_title border_bottom mb-0 py-0">
                    <h1 class="modal_heading_h mb-0 modal_heading_pad">Login</h1>
                </VCardTitle>
                <VCardText class="px-0 py-0 otp_card_text">
                    <VForm @submit.prevent="OtpVerified" class="otp_form">
                        <p class="enterOtpText text_align_center">Enter OTP</p>
                        <v-otp-input v-model="loginOTP" class="py-0" variant="solo" length="4"></v-otp-input>
                        <p v-if="otpIsVerified == false && countdown > 0" class="otp_resend_time text_align_right">
                            OTP will expire in: <span class="otp_resend_span">{{ countdown }} seconds</span>
                        </p>
                        <p v-if="otpIsVerified == false && countdown == 0"
                            class="otp_resend text_align_right otp_resend_time" @click="loginOtpModal">Resend OTP</p>
                        <VBtn v-if="otpIsVerified == false" class="login_button" variant="tonal" type="submit">Verify
                            OTP</VBtn>
                        <VBtn v-if="otpIsVerified == true" class="login_button" variant="tonal" @click="goToDashboard">
                            Login</VBtn>
                    </VForm>
                    <div v-if="otpIsVerified == true" class="d-flex align-center verify_div gap-1 justify-center">
                        <img class="verify_img" src="/images/Check.png" />
                        <p class="email_verify_text" style="margin-top: 0 !important;">Verified Code</p>
                    </div>
                    <p class="loginModal_text_2">
                        Don't have an account ?
                        <span @click="signUpTwo">Sign Up</span>
                    </p>
                    <p v-if="otpIsVerified == false" class="email_verify_text">verification code sent on <span
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

        <v-dialog persistent class="loginModal" v-model="signUpOtp">
            <VCard class="loginCard text_align_center">
                <img class="modal_cancel_btn modalCancelBtn" src="/images/modal_cancel.png"
                    @click="signUpOtp = false" />
                <VCardTitle class="px-0 card_title py-0">
                    <h1 class="modal_heading_h mb-4">Sign Up</h1>
                    <p class="loginModal_text">we will need your profile details to<br> give you a better experience</p>
                </VCardTitle>
                <VCardText class="px-0 py-0 otp_card_text">
                    <VForm @submit.prevent class="otp_form">
                        <p class="enterOtpText text_align_center">Enter OTP</p>
                        <v-otp-input class="py-0" variant="solo" length="4"></v-otp-input>
                        <p v-if="signUpOtpVerified == false" class="otp_resend_time text_align_right mb-4">
                            Resend OTP in:
                            <span class="otp_resend_span">28 Second</span>
                        </p>
                        <VBtn @click="verifySignUpOtp" v-if="signUpOtpVerified == false" style="margin: 0 !important"
                            class="login_button" variant="tonal" type="submit">Verify OTP</VBtn>
                        <VBtn v-if="signUpOtpVerified == true" class="login_button" variant="tonal" type="submit">Sign
                            Up</VBtn>
                    </VForm>
                    <div v-if="signUpOtpVerified == true" class="d-flex align-center verify_div gap-1 justify-center">
                        <img class="verify_img" src="/images/Check.png" />
                        <p class="email_verify_text" style="margin-top: 0 !important;">Verified Code</p>
                    </div>
                    <p v-if="signUpOtpVerified == false" class="email_verify_text signUpVerify"
                        style="margin-top: 11px !important;">your login OTP sent to your email <span
                            class="email_blue">rahulrajta@eligocs.com</span></p>
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
.user_login_card_p_mb {
    margin-bottom: 10px !important;
}
p.user_login_card_p {
    font-size: 14px;
    font-weight: 500;
    color: #676666;
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
    top: 47px;
    right: -32px;
    box-shadow: 0 4px 9px #00000010;
    padding: 10px 15px 30px 15px;
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