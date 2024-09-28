import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig(); // Get runtime config

    // Create an Axios instance
    const instance = axios.create({
        baseURL: config.public.baseURL, // Use the baseURL from runtimeConfig
        timeout: 20000, // Set timeout to 5000 milliseconds (5 seconds)
    });

    // Interceptor to modify requests
    instance.interceptors.request.use((config) => {
        const token = useCookie('authToken').value;

        // Check if the request URL is a public or protected route
        const publicRoutes = [
            '/send-login-otp',
            '/verify-login-otp',
            'send-signup-otp',
            'verify-signup-otp',
            // Add more public routes here
          ];

        const protectedRoutes = [
            '/private/endpoint1',
            '/private/endpoint2',
            // Add more protected routes here
        ];

        const isPublicRoute = publicRoutes.includes(config.url);
        const isAuthRequired = protectedRoutes.includes(config.url);

        if (isAuthRequired) {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.error('Authorization token is missing for protected route:', config.url);
                return Promise.reject(new Error('Authorization token is required for this route.'));
            }
        } else if (isPublicRoute) {
            delete config.headers.Authorization;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // Response interceptor for error handling
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.code === 'ECONNABORTED') {
                console.error('Request timed out:', error.message);
            }
            return Promise.reject(error);
        }
    );

    // Inject the Axios instance and retryRequest function into the Nuxt app
    nuxtApp.provide('axios', instance);
});
