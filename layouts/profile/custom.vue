<script setup>

    import { baseURL } from '../config';
    import toast from '~/utils/toastConfig';
    import { getAuthHeader } from '~/utils/authHeader';


    const accounts = ref([
    { title: 'Dashboard', path: 'account' },
    { title: 'Address', path: 'account/address' },
    { title: 'Account Detail', path: 'account/account-detail' },
    { title: 'Your Order', path: 'account/order' },
    { title: 'Payment', path: 'account/payment' },
    { title: 'Wishlist', path: 'account/wishlist' },
    ]);

    const handleLogout = async () => {
        try {
            const response = await $fetch('/customer/logout', {
                baseURL: baseURL,
                method: 'GET',
                headers: getAuthHeader()
            });
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            toast.success('Successfully logged out!');
            setTimeout(() => {
                navigateTo('/');
            }, 1000);
        } catch (error) {
            if (error?.response?._data?.message) {
                toast.error(error?.response?._data?.message);
            }
        }
    }
    const selectIndex = ref();
    const accountTabs = (index) => {
        selectIndex.value = index
    }
</script>

<style scoped>

</style>

<template>
    <div class="min-h-screen flex flex-col">

        <!-- 👉 Header Section -->
        <div class="!sticky top-0 z-10">
            <AnnouncementBar />
            <Navbar />
        </div>
            <FoodCategories />

            <!-- 👉 Navbar Section -->
        <section>
            <div class="max-w-[92rem] w-full mx-auto px-4" >
                <div> 
                    <h2 class="lg:text-[45px] text-base text-brown poppins-bold lg:leading-[67px]  text-center mb-2.5">My
                        Account </h2>
                </div>
                <div class="flex lg:flex-row flex-col lg:gap-[64px]">
                    <div class="max-w-[350px] w-full">
                        <ul class="">
                            <li @click="accountTabs(index)" v-for="(account,index) in accounts" :key="index"
                                :class="{ 'border-l-4 !border-brown px-4 ': selectIndex === index }"
                                 class="py-[9px] px-4 border-l-4 borderl-4 border-white hover:bg-[#D9DED04D] cursor-pointer rounded-[5px]">

                            <NuxtLink :to="`/${account.path}`" class="text-brown lg:text-xl text-[15px] poppins">
                                <div>{{ account.title }}</div>
                            </NuxtLink>
                            </li>
                            <li>
                                <button @click.prevent="handleLogout" class="text-brown text-xl poppins py-[9px] px-4  rounded-lg">Logout</button>
                            </li>
                        </ul>
                    </div>
            <!-- 👉 Dynamic Sloats -->
                    <slot />
                </div>
            </div>
        </section>

            <!-- 👉 Footer Section -->
        <Footer class="mt-auto" />

    </div>
</template>