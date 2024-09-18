<template>
    <v-container style="max-width: fit-content" class="d-flex justify-center col-md-4 py-4 m-0">
      <v-card
        class="testimonial-card mt-3"
        elevation="2"
      >
        <!-- NEET Tag -->
        <v-sheet class="position-absolute neet-tag" color="#F87126" rounded="0">
          <span class="font-weight-bold white--text">{{ sheetDesc }}</span>
        </v-sheet>
        
        <!-- Testimonial Content -->
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <p class="mt-1" style="font-weight: 700;">{{ title }}</p>
              <p style="font-size: 15px;" class="testimonial-text">
                {{ description }}
              </p>
              <div class="testimonial-author">
                <div class="author-name mt-0">{{ userName }}</div>
                <div class="author-details">{{ userDesc }}</div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
  
        <!-- Profile Picture -->
        <v-avatar
          class="position-absolute avatar-profile"
          size="64"
          :image='avatarImg'
        ></v-avatar>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';

  const props = defineProps({
    title: String,
    description: String,
    avatarImg: String,
    userName: String,
    userDesc: String,
    sheetDesc: String,
    })
  </script>
  
  <style scoped>
  .testimonial-card {
    background-image: url(/images/scs_bg.png);
    background-size: cover;
    padding: 20px;
    border-radius: 2px;
    position: relative;
    width: 358px !important;
    overflow: visible;
    background-position: center;
  }

  .testimonial-card::after {
    content: '';
    background-image: url('/images/sc_icon.png');
    position: absolute;
    width: 50px;
    height: 48px;
    top: -15px;
    right: 20px;
  }
  .neet-tag {
    top: 2%;
    left: -2%;
    padding: 4px 12px;
  }

  .neet-tag::before {
    content: "";
    background-image: url(/images/traingle.png);
    position: absolute;
    width: 10px;
    height: 10px;
    left: 1px;
    bottom: -10px;
  }
  .testimonial-text {
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    font-family: "Roboto", sans-serif;
  }
  .testimonial-author {
    margin-top: 20px;
  }
  .author-name {
    font-weight: bold;
    font-size: 16px;
  }
  .author-details {
    font-size: 14px;
    color: #777;
  }
  .avatar-profile {
    bottom: -30px;
    right: 20px;
  }
  </style>
  