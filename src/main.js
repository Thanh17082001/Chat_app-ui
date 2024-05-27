import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import router from './router';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@fortawesome/fontawesome-free/css/all.css';
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';

const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
})
app.use(router)
app.use(vuetify)
app.use(KeenUI)
app.use(Buefy, {
  defaultIconPack: 'fas', // Sử dụng bộ icon Font Awesome Solid (fas)
})
app.use(PrimeVue, {
    unstyled: true,                       //apply preset
});

app.mount('#app')
