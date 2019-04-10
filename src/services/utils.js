import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://eneojo-sendit.herokuapp.com/api/v1'
});

// intercept api requests and add auth token to the request headers
apiInstance.interceptors.request.use((apiConfig) => {
  const token = localStorage.getItem('token');
  const config = apiConfig;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  
  return config;
});

export { apiInstance };


 export const sendHttpRequest = async (url, method, data) => {
    const response = await apiInstance({
      url,
      method,
      data,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }