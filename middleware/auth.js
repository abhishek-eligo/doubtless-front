export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = ref(false);

    if(process.client){
        isLoggedIn.value = !!localStorage.getItem('token');
    }
  
    if (!isLoggedIn.value && to.path !== '/login') {
      return navigateTo('/login');
    }
  
    if (isLoggedIn.value && to.path === '/login') {
      return navigateTo('/account');
    }
    
  });
  