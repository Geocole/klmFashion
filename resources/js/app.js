/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import vue from "vue";


require('./bootstrap');

import './plugins/bootstrapTable.js'
import 'bootstrap-select-v4/dist/css/bootstrap-select.min.css'
import 'flag-icon-css/sass/flag-icon.scss'
import './plugins/vue-tel-input-master/dist/vue-tel-input.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import  'bootstrap-fileinput/css/fileinput.min.css'

window.Vue = vue;

import { Form, HasError, AlertError } from 'vform'
//import VueProgressBar from 'vue-progressbar'
//import Snotify, { SnotifyPosition } from 'vue-snotify'
/*window.Form = Form
const SnotifyOptions = {
    toast: {
        position: SnotifyPosition.rightTop
    }
}
Vue.use(Snotify, SnotifyOptions)
const VueProgressBarOptions = {
    color: '#50d38a',
    failedColor: '#87111d',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};*/
//Vue.use(VueProgressBar, VueProgressBarOptions);

import SweetModal from 'sweet-modal-vue/src/plugin.js'
Vue.use(SweetModal)
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.component('pagination', require('./components/partial/PaginationComponent.vue'));

//Vue.component(HasError.name, HasError)
//Vue.component(AlertError.name, AlertError)

Vue.component('bootstap-table', require('./components/DataTable/BootstrapTable.vue').default);
Vue.component('customer-create', require('./components/Customer/CreateModal.vue').default);
Vue.component('customer-update', require('./components/Customer/UpdateModal.vue').default);
Vue.component('customer-import-modal', require('./components/Customer/ImportModal.vue').default);

const app = new Vue({
    el: '#app'
});
