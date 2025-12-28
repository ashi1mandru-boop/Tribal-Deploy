const getApiBaseUrl = () => {
    if (import.meta.env.MODE === 'development') {
        return 'http://localhost:5000/api'; 
    } else {
        // When you deploy, replace 'localhost' with your Render/Railway URL
     //   return 'http://localhost:5000/api'; 
        return 'https://your-backend-app-name.render.com/api';
    }
};

export const API_BASE_URL = getApiBaseUrl();