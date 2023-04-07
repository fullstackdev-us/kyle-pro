import { createApp } from 'vue';
import './style.css';
import 'swiper/css';
import App from './App.vue';
import router from './router';
import store from './stores';
import { register } from 'swiper/element/bundle';

register();

createApp(App)
.use(store)
// .use(router)
.mount('#app');
