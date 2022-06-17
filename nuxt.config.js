export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'user-story-ui',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/vuetify', { /* module options */ }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

 
  // Apollo configuration
  // apollo: {
  //   clientConfigs: {
  //     default: {
  //       httpEndpoint: 'http://localhost:8000/graphql',
  //       httpLinkOptions: {
  //         fetchOptions: {
  //           mode: 'cors' //Cors Needed for external Cross origins, need to allow headers from server
  //         },
  //         credentials: "omit" //must be omit to support application/json content type 
  //       }
  //     },
  //   },
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    middleware: []
  },

  axios: {
    baseURL : 'http://localhost:8000/'
    // baseURL: process.env.API_URL
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/api/login', method: 'post', propertyName: 'token'},
  //         // logout: { url: '/api/auth/logout', method: 'post' },
  //         // user: { url: '/api/auth/user', method: 'get' },
  //         tokenRequired: true,
  //         tokenType: 'Bearer'
  //       }
  //     }
  //   }
  // },
  // privateRuntimeConfig: {
  //   apiId: process.env.PASSPORT_CLIENT_ID,
  //   apiSecret: process.env.PASSPORT_CLIENT_SECRET,
  // },

  auth: {
    redirect: {
      login: '/login',
      home: '/',
      callback: false,
    },
    strategies: {
      local: {
        endpoints: {
          login: {url: '/api/login', method: 'post', propertyName: 'access_token'},
          user: {url: '/api/user', method: 'get', propertyName: 'data'},
          logout: {url: '/api/logout', method: 'get', },
        },

        // tokenRequired: true,
        // tokenType: 'Bearer',
        // url: '/',
        // clientId: process.env.PASSPORT_CLIENT_ID,
        // clientSecret: process.env.PASSPORT_CLIENT_SECRET,
        // grantType: 'password',
      },
    },
  },

  // auth: {
  //   strategies: {
  //     customStrategy: {
  //       scheme: '~/schemes/customScheme',
  //       /* ... */
  //     }
  //   }
  // }
}
