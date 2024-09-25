<script setup>
import { ref } from 'vue'

const isActive = ref(0);

const formHeadings = ref([
    { title: 'Personal Information' },
    { title: 'Professional Information' },
    { title: 'Agreement' },
])

const setActive = (index) => {
    isActive.value = index;
}

const progressWidth = computed(() => {
    if (isActive.value === 0) return '35%';
    if (isActive.value === 1) return '68%';
    if (isActive.value === 2) return '100%';
    return '35%';
});

const goToNext = () => {
    if (isActive.value < formHeadings.value.length - 1) {
        isActive.value += 1;
    }
}

const goToPrevious = () => {
    if (isActive.value > 0) {
        isActive.value -= 1;
    }
}
</script>

<template>
    <div>
        <section class="teacher_section_one">
            <div class="wrapper">
                <div class="row">
                    <div class="col-md-6">
                        <div class="outer-div">
                            <div class="teach_text">
                                <h1>come teach with us </h1>
                                <p>Join Our Passionate Team of Expert Educators</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="outer-div">
                            <img src="/images/tutor_bg.png" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="wrapper">
            <div class="teacher_section_two">
                <VRow>
                    <VCol cols="12">
                        <div class="justify-center d-flex">
                            <h1 class="teacher_form_h1">Instructor Registration Form</h1>
                        </div>
                    </VCol>
                </VRow>

                <VForm>
                    <VRow>
                        <VCol class="pb-0 margin_btm_20" v-for="(head, index) in formHeadings" :key="index" cols="4">
                            <div @click="setActive(index)" :class="{ 'info_w_fit_active': isActive == index }"
                                class="d-flex align-center info_w_fit">
                                <img class="info_folder_img" src="/images/Folder.png" />
                                <h2 class="info_h2">{{ head.title }}</h2>
                            </div>
                        </VCol>
                        <VCol class="py-0 progres_bar_mb" cols="12">
                            <div class="progress_bg">
                                <div class="progress_up" :style="{ width: progressWidth }"></div>
                            </div>
                        </VCol>
                    </VRow>

                    <VRow class="mt-0">
                        <VCol cols="12">
                            <VCard v-if="isActive == 0" class="form_card_bg">
                                <VCardText class="card_pad">
                                    <VRow>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Name" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/name_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Email Id" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/email_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Phone Number" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/number_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                    </VRow>

                                    <VRow>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Age" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/age_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <USelect class="input_pad" placeholder="Gender"
                                                :options="['Male', 'Female', 'They']">
                                                <template #leading>
                                                    <UAvatar src="/images/gender_place.png" size="2xs" />
                                                </template>
                                            </USelect>
                                        </VCol>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Zip-Code" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/zip_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                    </VRow>

                                    <VRow>
                                        <VCol cols="8">
                                            <UInput class="input_pad" placeholder="Address" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/address_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <USelect class="input_pad" placeholder="City"
                                                :options="['Shimla', 'Solan', 'Chandigarh']">
                                                <template #leading>
                                                    <UAvatar src="/images/city_place.png" size="2xs" />
                                                </template>
                                            </USelect>
                                        </VCol>
                                    </VRow>
                                </VCardText>
                            </VCard>

                            <VCard v-if="isActive == 1" class="form_card_bg">
                                <VCardText class="card_pad">
                                    <VRow>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Qualifications" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/qual_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Address" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/upload_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Years Of Experience" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/experience_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                    </VRow>

                                    <VRow>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Website" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/web_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Linkedin Profile" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/link_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                        <VCol cols="4">
                                            <UInput class="input_pad" placeholder="Tutorial Experience" model-value="">
                                                <template #leading>
                                                    <UAvatar src="/images/link_place.png" size="2xs" />
                                                </template>
                                            </UInput>
                                        </VCol>
                                    </VRow>
                                </VCardText>
                            </VCard>

                            <div v-if="isActive == 2">
                                <div class="agrement_div">
                                    <h3 class="agrement_h3">By submitting this form, I agree to the following terms and conditions:</h3>
                                    <ul>
                                        <li class="agrement_li"> I confirm that all course content provided is original and does not infringe on any third-party rights.</li>
                                        <li class="agrement_li"> I agree to adhere to all guidelines and policies set by Doubtless for the creation and distribution of online courses..</li>
                                        <li class="agrement_li"> I understand and accept the payment terms as outlined by Doubtless.</li>
                                        <li class="agrement_li"> I will comply with all applicable laws and regulations in delivering my courses.</li>
                                        <li class="agrement_li"> Doubtless reserves the right to terminate this agreement for violations of these terms.</li>
                                    </ul>
                                    <div class="d-flex align-center">
                                        <VCheckbox class="agree_checkbox" label="I accept the terms and conditions of Doubtless." />
                                         <!-- <input type="checkbox" />
                                        <p>I accept the terms and conditions of Doubtless.</p> -->
                                    </div>
                                    
                                </div>
                            </div>
                        </VCol>
                    </VRow>
                    <VRow class="mt-0">
                        <VCol class="d-flex gap-2 py-0 justify-end" cols="12">
                            <UButton v-if="isActive == 1 || isActive == 2" @click="goToPrevious" class="teach_form_back_btn">BACK</UButton>
                            <UButton v-if="isActive == 0 || isActive == 1" class="teach_form_next_btn" @click="goToNext">NEXT</UButton>
                            <UButton v-if="isActive == 2" class="teach_form_next_btn" @click="goToNext">SIGN UP NOW</UButton>
                        </VCol>
                    </VRow>
                </VForm>
            </div>
        </section>
    </div>
</template>

<style scoped>
.progres_bar_mb {
    margin-bottom: 40px;
}

.margin_btm_20 {
    margin-bottom: 20px !important;
}

.agrement_li {
    font-size: 16px;
    font-weight: 400;
    color: #757373;
    margin-bottom: 5px;
    text-transform: capitalize;
}

.agrement_div {
    padding: 0 15px;
}
.agrement_h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 25px !important;
}

.teach_form_back_btn {
    padding: 12px 40px;
    border-radius: 4px;
    background: transparent;
    color: #F87126 !important;
    font-size: 18px;
    font-weight: 800;
    border: 2px solid #757373;
}

.teach_form_back_btn:hover {
    background: transparent;
}

.teach_form_next_btn {
    background: #F87126;
    border: 1px solid var(--default_color);
    color: #fff;
    padding: 12px 40px;
    border-radius: 4px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 800;
    line-height: 19.92px;
}

.teach_form_next_btn:hover {
    background: #F87126;
}

.form_card_bg {
    background: #F9F9F9;
    margin-bottom: 40px;
}

.card_pad {
    padding: 20px 35px !important;
}

.progress_bg {
    height: 9px;
    background: #D9D9D9;
    border-radius: 5px;
    box-shadow: 1.11px 1.11px 4.43px 0px #00000036;
}

.progress_up {
    background: #F87126;
    height: 9px;
    border-radius: 5px;
    transition: width 0.3s ease;
}

.info_w_fit {
    width: fit-content;
    padding: 10px;
}

.info_w_fit_active {
    background: #FEE3D4;
    border-radius: 0 0 3px 3px;
    border-bottom: 2px solid #F87126;
}

.info_w_fit:hover {
    background: #FEE3D4;
    border-radius: 0 0 3px 3px;
    border-bottom: 2px solid #F87126;
    cursor: pointer;
}

.info_h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 0 6px !important;
}

.info_folder_img {
    width: 27px;
    height: 27px;
}

.teacher_section_two {
    padding: 50px 47px;
}

.teacher_form_h1 {
    font-size: 32px;
    font-weight: 800;
    width: fit-content;
    border-bottom: 1px solid;
    padding: 6px 15px;
}

section.teacher_section_one {
    background: #EDEDED;
    padding: 35px 200px;
}

.teach_text {
    padding: 30px;
    width: 100%;
    max-width: 504px;
    background: #fff;
}

.teach_text h1 {
    font-size: 38px !important;
    text-transform: capitalize;
    font-weight: 800;
    text-align: center;
    margin-bottom: 20px;
}

.teach_text p {
    font-size: 20px;
    text-align: center;
}

.outer-div {
    justify-content: center;
    display: flex;
}
</style>