<script setup>
</script>

<template>
    <div>
        <div class="top-header">
            <div class="wrapper">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <div class="banner text-white">
                            <div class="slider-container">
                                <p class="header_text mb-0">Learn Anytime, Anywhere Get Your Tablet and Start Mastering Your
                                    Courses!</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="row ">
                            <div class="col-md-6 d-flex gap-1 justify-content-end">
                                <img class="contact_items" src="/images/call.png" />
                                <p class="text-white mb-0">9225894255</p>
                            </div>
                            <div class="col-md-6 d-flex gap-1 justify-content-end">
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
                        <img class="logo_img" src="/images/logo_1.png" />

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
                                    <nuxt-link class="nav-link" to="courses" active-class="active">Courses</nuxt-link>
                                </li>
                                <li class="nav-item">
                                    <nuxt-link class="nav-link" to="teachOnDoubtless" active-class="active">Teach on Doubtless</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-center justify-content-end">
                        <img class="cart_img" src="../public/images/cart.png" />
                        <button class="hdr_btn">Login now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>