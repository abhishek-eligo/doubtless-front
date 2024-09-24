<script setup>
const items = ref([
    { label: 'Login Or Sign Up', slot: 'login', defaultOpen: false },
    { label: 'Order Summary', slot: 'order-summary', defaultOpen: false },
    { label: 'Paymetn Method', slot: 'payment-method', defaultOpen: false },
])

const requestOTP = ref(true);
const verifyOTP = ref(false);
const verfiedOTPcontent = ref(false);
const loginComplete = ref(false);
const firstAccordian = ref(true);
const signUpFormOne = ref(false);
const enterSignUpOTP = ref(false);
const paymentSelected = ref('sms');
const paymentMethods = ref('');


const openVerifyOTP = () => {
    requestOTP.value = false;
    verifyOTP.value = true;
    items.value[0].label = 'Login'; // Change label to 'Login'

}

const openLoginVerify = () => {
    verfiedOTPcontent.value = true;
}

const loginSubmit = () => {
    firstAccordian.value = false;
    loginComplete.value = true;
    items.value = items.value.filter(item => item.slot !== 'login');
}

const openSignUpFormOne = () => {
    requestOTP.value = false;
    signUpFormOne.value = true;
    items.value[0].label = 'Sign Up'; // Change label to 'Sign Up'
}

const verifySignUpOtp = () => {
    enterSignUpOTP.value = true;
}
const resetLoginForm = () => {
    loginComplete.value = false;   // Hide the logged-in state
    firstAccordian.value = true;   // Show the first accordion (login form)
    requestOTP.value = true;       // Show the request OTP form
    verifyOTP.value = false;       // Hide the verify OTP form
    verfiedOTPcontent.value = false; // Reset the OTP verification state
};
const methods = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'Phone (SMS)' },
    { value: 'push', label: 'Push notification' }
]

</script>

<template>
    <div class="wrapper">
        <VContainer class="checkout_container px-0 py-0">
            <VRow class="chekout_row">
                <VCol md="8">
                    <VCard class="checkout_card">
                        <VCardTitle class="px-0 py-0">
                            <h1 class="checkout_title">checkout</h1>
                        </VCardTitle>
                        <VCardText class="checkout_card_text">
                            <div v-if="loginComplete == true"
                                class="d-flex align-center cart_login_complete justify-between">
                                <div class="login_details">
                                    <div class="d-flex align-center pb-2 gap-2">
                                        <img src="/images/checkout-icon-btn.png" />
                                        <h2 class="login_slot_label">Login</h2>
                                    </div>
                                    <p>Rahul Rajta <span>+91 98787 73889</span></p>
                                </div>
                                <UButton class="logged_in_btn">Change</UButton>
                            </div>
                            <UAccordion class="checkout_accord" :items="items">
                                <template v-if="firstAccordian" #login>
                                    <!-- Request Otp Login Form -->
                                    <VForm v-if="requestOTP == true" class="enter_email_form">
                                        <UInput class="checkout_email_field" placeholder="Enter Email" />
                                        <p class="checkout_extra_text">New To Doubtless? <span
                                                @click="openSignUpFormOne" class="checkout_signup_link">Create an
                                                account</span></p>
                                        <UButton @click="openVerifyOTP" class="checkout_otp_rqst_btn">Request OTP
                                        </UButton>
                                    </VForm>

                                    <!-- Verify Otp Login form -->
                                    <VForm v-if="verifyOTP == true" class="enter_email_form">
                                        <p class="enter_email_form_text">Please enter the OTP sent to
                                            rahulrajta@eligocs.com
                                            <span class="checkout_signup_link">change</span>
                                        </p>
                                        <label class="otp_label">Enter OTP</label>
                                        <v-otp-input class="checkout_verifyOtp" variant="solo" length="4"></v-otp-input>
                                        <p class="checkout_not_recieved_text">Not received your code?
                                            <span v-if="verfiedOTPcontent == false" class="checkout_signup_link">Resend
                                                code</span>
                                            <span v-if="verfiedOTPcontent == true" class="checkout_signup_link">00:
                                                12</span>
                                        </p>
                                        <div v-if="verfiedOTPcontent == true"
                                            class="d-flex align-center verify_div gap-1">
                                            <img class="verify_img" src="/images/Check.png" />
                                            <p class="email_verify_msg" style="margin-top: 0 !important;">Verification
                                                Code Verified
                                            </p>
                                        </div>
                                        <UButton @click="openLoginVerify" v-if="verfiedOTPcontent == false"
                                            class="checkout_otp_rqst_btn">Verify Now</UButton>
                                        <UButton @click="loginSubmit" v-if="verfiedOTPcontent == true"
                                            class="checkout_otp_rqst_btn">Login
                                        </UButton>
                                    </VForm>

                                    <!-- Sign Up Form -->
                                    <VForm v-if="signUpFormOne == true" class="signUp_form">
                                        <div class="d-flex gap-2 signUp_continue_margin align-center">
                                            <img src="/images/checkout-icon-btn.png" />
                                            <h2 class="signUpOne_title">Sign Up to continue</h2>
                                        </div>
                                        <VRow>
                                            <VCol md="4">
                                                <UInput class="signUp_input_field" placeholder="Name" />
                                            </VCol>
                                            <VCol md="4" cols="12">
                                                <UInput class="signUp_input_field" placeholder="Mobile Number" />
                                            </VCol>
                                            <VCol md="4" cols="12">
                                                <UInput class="signUp_input_field" placeholder="Email" />
                                            </VCol>
                                        </VRow>
                                        <VRow v-if="enterSignUpOTP == true">
                                            <VCol cols="6">
                                                <label class="otp_label otp_margin">Enter otp</label>
                                                <v-otp-input variant="solo" class="signUp_otp_field"
                                                    length="4"></v-otp-input>
                                                <p class="signUp_text">your login OTP sent to your email <span
                                                        class="checkout_signup_link">rahulrajta@eligocs.com</span></p>
                                            </VCol>
                                        </VRow>
                                        <UButton @click="verifySignUpOtp" v-if="enterSignUpOTP == false"
                                            class="signUpOne_btn">Sign up</UButton>
                                        <UButton v-if="enterSignUpOTP == true" class="signUpOne_btn">Verify OTP
                                        </UButton>
                                    </VForm>
                                </template>
                                <template #order-summary>
                                    <CartCard />
                                </template>
                                <template #payment-method>
                                    <VCard>
                                        <VCardText>
                                            <v-radio-group v-model="paymentMethods">
                                                <v-radio class="radio_div_width" value="card">
                                                    <template v-slot:label>
                                                        <VRow>
                                                            <VCol class="d-flex align-center" md="6">
                                                                <img src="/images/credit_card.png" />
                                                                <p class="payment_text">credit/ debit card</p>
                                                            </VCol>
                                                            <VCol md="6" cols="12" class="text-end">
                                                                <img src="/images/credit-card-type.png" class="ms-auto" />
                                                            </VCol>
                                                        </VRow>
                                                    </template>
                                                </v-radio>
                                                <v-radio class="radio_div_width" value="upi">
                                                    <template v-slot:label>
                                                        <VRow>
                                                            <VCol class="d-flex align-center" md="12">
                                                                <img src="/images/upi.png"  />
                                                                <p class="payment_text">UPI</p>
                                                            </VCol>
                                                        </VRow>
                                                    </template>
                                                </v-radio>
                                                <v-radio class="radio_div_width" value="net">
                                                    <template v-slot:label>
                                                        <VRow>
                                                            <VCol class="d-flex align-center" md="12">
                                                                <img src="/images/net-bank.png"  />
                                                                <p class="payment_text">net banking</p>
                                                            </VCol>
                                                        </VRow>
                                                    </template>
                                                </v-radio>
                                                <v-radio class="radio_div_width" value="mobile">
                                                    <template v-slot:label>
                                                        <VRow>
                                                            <VCol class="d-flex align-center" md="12">
                                                                <img src="/images/mob-wallet.png"  />
                                                                <p class="payment_text">mobile wallet</p>
                                                            </VCol>
                                                        </VRow>
                                                    </template>
                                                </v-radio>
                                            </v-radio-group>
                                        </VCardText>
                                    </VCard>
                                </template>
                            </UAccordion>
                        </VCardText>
                    </VCard>
                </VCol>
                <VCol md="4" cols="12">
                    <VCard>
                        <VCardTitle>
                            <h2>Summary</h2>
                        </VCardTitle>
                        <VCardText>
                            <VRow>
                                <VCol md="6"></VCol>
                                <VCol md="6" cols="12"></VCol>
                            </VRow>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </VContainer>
    </div>
</template>

<style scoped>
p.payment_text {
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 600;
    color: #575656;
}
.signUp_continue_margin {
    margin-bottom: 15px;
}

.otp_margin {
    margin-left: 27px;
}

.signUpOne_btn {
    padding: 10px 46px;
    background: #F87126 !important;
    border-radius: 0;
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 800;
    font-family: var(--Helvetica);
    margin-top: 30px;
}

h2.signUpOne_title {
    font-size: 17px;
    font-weight: 800;
    color: #000;
    text-transform: capitalize;
    margin-bottom: 0;
}

.signUp_form {
    padding: 10px 15px;
}

.login_details p {
    font-size: 19px;
    font-weight: 600;
    color: #000;
}

.login_details p span {
    font-size: 18px;
    font-weight: 400;
}

.login_details {
    padding: 15px 24px;
}

.logged_in_btn {
    background: transparent !important;
    color: #F87126 !important;
    border: 2px solid #F87126;
    padding: 13px 35px;
    height: fit-content;
}

.login_slot_label {
    font-size: 22px;
    font-weight: 800;
    color: #000 !important;
    margin: 0;
}

p.email_verify_msg {
    font-size: 18px;
    font-weight: 400;
    color: #63463B89;
}

.checkout_not_recieved_text {
    font-size: 18px;
    color: #63463B89;
    font-weight: 400;
    margin: 10px 0 !important;
}

.otp_label {
    font-size: 14px;
    font-weight: 400;
    color: #000;
}

.checkout_verifyOtp {
    display: flex;
    justify-content: start;
    padding: 0;
}

p.enter_email_form_text {
    font-size: 16px;
    font-weight: 400;
    color: #63463B75;
    margin-bottom: 16px !important;
}

.checkout_otp_rqst_btn {
    padding: 10px 46px;
    border-radius: 0;
    background-color: #F87126 !important;
    font-size: 16px;
    font-weight: 800;
    font-family: var(--Montserrat);
    margin-top: 35px;
}

p.checkout_extra_text {
    font-size: 16px;
    color: #000;
    font-weight: 400;
    margin-top: 6px !important;
}

span.checkout_signup_link {
    color: #3787D0;
    text-transform: none;
}

span.checkout_signup_link:hover {
    cursor: pointer;
}


.checkout_email_field input::placeholder {
    font-size: 20px;
    font-weight: 400;
    color: #000;
}

.enter_email_form {
    max-width: 542px;
    padding: 10px 15px;
}

#headlessui-disclosure-panel-v-0-1 {
    padding: 0 !important;
}

.checkout_title {
    font-size: 30px;
    font-weight: 800;
    text-transform: capitalize;
    color: #000;
    margin-bottom: 20px;
    margin-top: 15px;
}

.checkout_card {
    box-shadow: none;
}

.checkout_container {
    border-top: 5px solid #F87126;
    border-radius: 0;
    margin-top: 30px;
}

.checkout_card_text {
    padding: 0 0 0 0;
}

.checkout_accord {
    padding: 15px 0 30px 0;
}
</style>