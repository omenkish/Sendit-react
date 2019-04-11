import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://eneojo-sendit.herokuapp.com/api/v1'
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

export function sidebarFunction(){
  let sidebar = document.querySelector('#left');
  if(sidebar.style.width === '0' || sidebar.style.width === '0%'){
    sidebar.style.width ='75%';
    sidebar.style.background = '#22333d';
  }
  else{
    sidebar.style.width ='0%';
    sidebar.style.background = 'transparent';
  }
}
