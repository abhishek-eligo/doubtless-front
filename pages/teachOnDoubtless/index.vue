<script setup>
</script>

<template>
    <div>
        <div class="tob_section_one">
            <div class="wrapper">
                <v-container>
                    <v-row>
                        <v-col class="d-flex align-center" sm="6">
                            <div class="teach_us_div">
                                <h1 class="teach_us_h">come teach with us </h1>
                                <p class="teach_us_p">Join Our Passionate Team of Expert Educators</p>
                                <UButton class="teach_us_btn">Get start</UButton>
                            </div>
                        </v-col>
                        <v-col class="d-flex justify-end" sm="6" cols="12">
                            <img src="/images/tob_bg.png" />
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>

        <div class="tob_section_two">
            <div class="wrapper">
                <h2 class="tob_section_two_h">so many <span>reason to start</span> with <span>Doubtless</span></h2>
                <div>
                    <VCard>
                        <VCardTitle>
                            <img src="/images/tob_icon_1.png" />
                        </VCardTitle>
                        <VCardText></VCardText>
                    </VCard>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tob_section_one {
    background-color: #EDEDED;
}
.teach_us_div {
    padding: 30px;
    width: fit-content;
    background: #fff;
    text-align: center;
}
h1.teach_us_h {
    font-size: 38px;
    font-weight: 800;
    text-transform: capitalize;
    color: #000;
    margin-bottom: 9px;
}

.teach_us_btn {
    padding: 10px 30px;
    background: #000 !important;
    border-radius: 0;
    font-size: 20px;
    font-weight: 600;
}

p.teach_us_p {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px !important;
}
h2.tob_section_two_h {
    font-size: 30px;
    font-weight: 800;
    text-transform: capitalize;
    text-align: center;
    margin-top: 55px;
    color: #000;
}
.tob_section_two_h span {
    color: #F87126;
}
</style>