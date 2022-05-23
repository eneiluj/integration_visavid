import Vue from 'vue'
import './bootstrap'
import App from './App'

import { generateUrl, generateOcsUrl } from '@nextcloud/router'
import { dirname } from '@nextcloud/paths'
import { showError } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'
import moment from '@nextcloud/moment'

let lastPath = null

document.addEventListener('DOMContentLoaded', (event) => {
	const View = Vue.extend(App)
	const appVue = new View().$mount('#visavid_main')
})
