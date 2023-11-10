
import { createApp } from 'vue';
// import { createMetaManager } from 'vue-meta';

// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// const metaManager = createMetaManager();

// app.use(createPinia())
// app.use(metaManager);
app.use(router)
app.mount('#app')
