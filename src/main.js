/** @format */

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.mount('#app')

// 앱 마운트 후 로딩 엘리먼트 제거
const loading = document.getElementById('loading')
if (loading) loading.remove()
