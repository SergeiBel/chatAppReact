import axios from 'axios';

export const refreshAuthLogic = failedRequest => axios.post('http://localhost:3000/users/refresh', {refreshToken: localStorage.getItem('REFRESH_TOKEN')})
    .then(tokenRefreshResponse => {
        localStorage.setItem('ACCESS_TOKEN', tokenRefreshResponse.data.jwt);
        localStorage.setItem('REFRESH_TOKEN', tokenRefreshResponse.data.refreshToken);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.jwt;
        return Promise.resolve();
});

