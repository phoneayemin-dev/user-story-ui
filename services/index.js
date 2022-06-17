import axios from 'axios';
// import constant from './constants.js';


// export default function ({ $axios }, inject) {
//     // Create a custom axios instance
//     const api = $axios.create({
//         baseURL:"http://localhost:8000",
//       headers: {
//         common: {
//           Accept: 'text/plain, */*'
//         }
//       }
//     })
  
//     // Set baseURL to something different
//     // api.setBaseURL('http://localhost:8000')
//     // Inject to context as $api
//     inject('api', api)
//   }

const instance = axios.create({
    baseURL: "http://localhost:8000"
    // baseURL: constant.API_URL
});

export default instance;