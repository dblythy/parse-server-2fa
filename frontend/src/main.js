import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { getRouter } from './router'
import Parse from 'parse';

Parse.initialize('test');
Parse.serverURL = 'http://localhost:1337/parse';

const app = createApp(App)
app.provide('Parse', Parse);

const router = getRouter(Parse);
app.use(router)

app.mount('#app')
