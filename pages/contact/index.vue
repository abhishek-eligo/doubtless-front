<script setup>
const contactAddress = ref('Shop No-3, Sai Baba Dham  Sai Baba Dham, Saibaba Nagar, Mumbai, Maharashtra- 123421');
const contactNumber = ref('02228060992');
const contactEmail = ref('demoemail34@gmail.com');
</script>

<template>
    <div>
        <div class="contact_sec_one">
            <div class="wrapper">
                <div class="contact_div_one">
                    <div class="contact_div_content">
                        <h1>Connecting Minds to <span class="orangeShade">Opportunities</span></h1>
                        <p>Unlock potential by seamlessly connecting learners with opportunities through advanced,
                            accessible, and innovative technology.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="contact_sec_two">
            <div class="wrapper">
                <div class="contact_sec_two_div">
                    <div class="d-flex justify-center">
                        <h2 class="contact_sec_two_div_h2">Our origins</h2>
                    </div>
                    <div class="d-flex justify-center">
                        <p class="contact_sec_two_div_p">Founded with a commitment to transforming education, Doubtless
                            began as a vision to make learning
                            more accessible and effective. We started with a small, dedicated team passionate about
                            bridging the
                            gap between students and knowledge. From these humble beginnings, we've grown into a
                            platform that
                            empowers learners worldwide, offering innovative tools and resources to help everyone
                            achieve their
                            educational goals. Our journey is rooted in the belief that everyone deserves the
                            opportunity to
                            succeed, and we continue to evolve with this mission at our core.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="contact_sec_three">
            <div class="wrapper">
                <div class="contact_sec_three_div">
                    <div class="contact_sec_three_corporate">
                        <h1 class="contact_h">Corporate Office</h1>
                        <p class="contact_address">{{ contactAddress }}</p>
                    </div>
                    <div class="contact_sec_three_call">
                        <h1 class="contact_h">Call us To Schedule</h1>
                        <div class="contact_desc_div">
                            <p class="contact_desc_p">Call us today !</p>
                            <p class="d-flex gap-1 align-center">
                                <img class="contact_img" src="/images/contact_phn_img.png" />
                                <span class="contact_number">{{ contactNumber }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="contact_sec_three_email">
                        <h1 class="contact_h">Send Us An Email</h1>
                        <div class="contact_desc_div">
                            <p class="contact_desc_p">We're Standing by!</p>
                            <p class="d-flex gap-1 align-center">
                                <img class="contact_img" src="/images/contact_email_img.png" />
                                <span class="contact_number">{{ contactEmail }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contact_desc_div {
    padding-left: 8px;
}
.contact_sec_three_call {
    width: 323px;
}

.contact_sec_three_email {
    width: 363px;
}

p.contact_desc_p {
    font-size: 22px;
    font-weight: 500;
    line-height: 150%;
    color: #424040;
    margin-bottom: 5px !important;
}

span.contact_number {
    font-size: 20px;
    font-weight: 500;
    color: #F87126;
}
.contact_sec_three_div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.contact_sec_three_corporate {
    width: 383px;
}

h1.contact_h {
    padding: 10px 0 10px 5px;
    border-bottom: 2px solid #000;
    font-size: 29px;
    font-weight: 600;
    color: #000;
    line-height: 150%;
    margin-bottom: 15px;
}

p.contact_address {
    font-size: 22px;
    font-weight: 400;
    padding: 0 8px;
    color: #424040;
    line-height: 130%;
}

.contact_sec_three {
    padding: 60px 0;
    margin-bottom: 113px;
}
.contact_sec_two_div_p {
    width: 860px;
    font-size: 16px;
    font-weight: 500;
    color: #424040;
    line-height: 150%;
}

.contact_sec_one {
    background-image: url('/images/contact_bg.png');
    padding: 137px 0;
    background-size: cover;
    background-repeat: no-repeat;
}

.contact_div_one {
    display: flex;
    padding-left: 76px;
}

.contact_div_content {
    width: 100%;
    max-width: 801px;
    text-align: center;
    background: #fff;
    padding: 40px 30px;
}

.contact_div_content h1 {
    font-size: 38px;
    font-weight: 800;
    font-family: var(--Montserrat);
    color: #000;
    line-height: 150%;
    text-transform: capitalize;
}

.contact_div_content p {
    font-size: 20px;
    font-weight: 400;
    line-height: 150%;
    color: #000;
    font-family: var(--Montserrat);
}

.contact_sec_two {
    padding: 50px 0;
    background: #FCFBFB;
    margin-bottom: 25px;
}

.contact_sec_two_div {
    text-align: center;
}

.contact_sec_two_div_h2 {
    font-size: 44px;
    font-weight: 600;
    line-height: 150%;
    border-bottom: 2px solid black;
    width: 383px;
    margin-bottom: 30px;
}
</style>