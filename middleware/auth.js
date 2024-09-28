export default defineNuxtRouteMiddleware((to, from) => {
  const authToken = useCookie("authToken"); // Access the token from cookies

  const isLoggedIn = !!authToken.value; // Check if the token exists

  if (!isLoggedIn && to.path !== "/") {
    return navigateTo("/"); // Redirect to login if not authenticated
  }

  //if user is logged in, user can view his details 

  // if (isLoggedIn && to.path === "/courses") {
  //   return navigateTo("/courses"); // Redirect to account if already logged in
  // }
});
