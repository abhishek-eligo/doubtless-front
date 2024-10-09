<script setup></script>

<template>
    <div class="main_footer">
        <div class='wrapper'>
            <div class="footer_content">
                <VCard class="footerCard_one">
                    <VCardTitle class="footerCard_one_title p-0">
                        <img class="ftr_logo mb-3" src="/images/ftr-logo.png" />
                    </VCardTitle>
                    <VCardText class="footerCard_one_text p-0">
                        <div class="d-flex ftr_text_gap">
                            <img class="ftr_link_icon" src="/images/location_on.png" />
                            <p class="ftr_text">Shop No-3, Sai Baba Dham, Saibaba Nagar,Mumbai, Maharashtra</p>
                        </div>
                        <div class="d-flex ftr_text_gap">
                            <img class="ftr_link_icon" src="/images/ftr_email.png" />
                            <p class="ftr_text">demoemail234@gmail.com</p>
                        </div>
                        <div class="d-flex ftr_text_gap">
                            <img class="ftr_link_icon" src="/images/ftr_call.png" />
                            <p class="ftr_text">+91 02228060992</p>
                        </div>
                    </VCardText>
                </VCard>

                <VCard class="footerCard_two">
                    <VCardTitle class="footerCard_two_title p-0">
                        <h3 class="ftr_hdng_wid ftr_sec_two_h3">Courses</h3>
                    </VCardTitle>
                    <VCardText class="footerCard_two_text p-0">
                        <div class="d-flex justify-between">
                            <ul class="px-0">
                                <li class="ftr_sec_two_li">Academic courses</li>
                                <li class="ftr_sec_two_li">Graphic designer</li>
                                <li class="ftr_sec_two_li">Motion Graphic</li>
                                <li class="ftr_sec_two_li">Web Design</li>
                                <li class="ftr_sec_two_li">Development</li>
                                <li class="ftr_sec_two_li">Creative Writing</li>
                            </ul>
                            <ul class="px-0">
                                <li class="ftr_sec_two_li">Craft</li>
                                <li class="ftr_sec_two_li">Robotics</li>
                                <li class="ftr_sec_two_li">Photography</li>
                                <li class="ftr_sec_two_li">IAS/IPS</li>
                                <li class="ftr_sec_two_li">NEET/JEE</li>
                                <li class="ftr_sec_two_li">SSC</li>
                            </ul>
                        </div>
                    </VCardText>
                </VCard>

                <VCard class="footerCard_three">
                    <VCardTitle class="footerCard_three_title p-0">
                        <h3 class="ftr_sec_two_h3">Other links</h3>
                    </VCardTitle>
                    <VCardText class="footerCard_two_text p-0">
                        <ul class="px-0">
                            <nuxt-link to="/contact">
                                <li class="ftr_sec_two_li">Contact Us</li>
                            </nuxt-link>
                            <li class="ftr_sec_two_li">Courses</li>
                            <li class="ftr_sec_two_li">Teach on Doubtless</li>
                            <li class="ftr_sec_two_li">cancelation policy</li>
                            <li class="ftr_sec_two_li">Privacy policy</li>
                            <li class="ftr_sec_two_li">Terms of use</li>
                        </ul>
                    </VCardText>
                </VCard>

                <VCard class="footerCard_four">
                    <VCardTitle class="footerCard_four_title p-0">
                        <h3 class="ftr_sec_two_h3">Join a Newsletter</h3>
                    </VCardTitle>
                    <VCardText class="footerCard_four_text p-0">
                        <div class="email-field">
                            <form>
                                <label for="email">Your Email</label>
                                <input type="email" class="form-control" />
                                <button type="submit" class="hdr_btn btnWidth">SEND</button>
                            </form>
                        </div>
                        <div class="d-flex m footer_link_img">
                            <span><img src="/images/fb.png" /></span>
                            <span><img src="/images/ftr_call.png" /></span>
                            <span><img src="/images/ftr_email.png" /></span>
                            <span><img src="/images/insta.png" /></span>
                            <span><img src="/images/whatsap.png" /></span>
                            <span><img src="/images/twtr.png" /></span>
                        </div>
                    </VCardText>
                </VCard>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3.ftr_hdng_wid {
    width: fit-content;
}

.ftr_text_gap {
    margin-bottom: 15px;
}
</style>