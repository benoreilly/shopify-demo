import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { router } from './router';
import { cartStore } from './utils/cartStore';

async function bootstrap() {
  await cartStore.init();

  createApp(App).use(router).mount('#app');
}

bootstrap();
