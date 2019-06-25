import axios from 'axios';
import {Redirect} from 'react-router-dom';
import React from 'react';

export const refreshAuthLogic = failedRequest => axios.post('http://localhost:3000/users/refresh', {refreshToken: localStorage.getItem('REFRESH_TOKEN')})
    .then(tokenRefreshResponse => {
        localStorage.setItem('ACCESS_TOKEN', tokenRefreshResponse.data.jwt);
        localStorage.setItem('REFRESH_TOKEN', tokenRefreshResponse.data.refreshToken);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.jwt;
        return Promise.resolve();
})
    .catch(
        err => {
                if(err.response.status === 403){
                        localStorage.removeItem('ACCESS_TOKEN');
                        localStorage.removeItem('REFRESH_TOKEN');
                        localStorage.removeItem('_ID');
                        localStorage.removeItem('LOGIN');
                        return <Redirect to='/login'/>;

                }
        }
    );

