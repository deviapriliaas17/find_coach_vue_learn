import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router'
import store from '@/store/index';
import BaseCard from '@/component/ui/BaseCard'
import BaseButton from '@/component/ui/BaseButton';
import BaseBadge from '@/component/ui/BaseBadge';
import BaseSpinner from '@/component/ui/BaseSpinner';

const app = createApp(App)
app.use(router)
app.use(store)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.mount('#app');
