import Vue from 'vue'
import './bootstrap'
import App from './App'

import { generateUrl, generateOcsUrl } from '@nextcloud/router'
import { dirname } from '@nextcloud/paths'
import { showError } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'
import moment from '@nextcloud/moment'
import '../css/main.scss'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import Tooltip from '@nextcloud/vue/dist/Directives/Tooltip'

Vue.use(vueAwesomeCountdown, 'vac')
Vue.directive('tooltip', Tooltip)

let lastPath = null

document.addEventListener('DOMContentLoaded', (event) => {
	const View = Vue.extend(App)
	const appVue = new View().$mount('#content')
})
