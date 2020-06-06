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
import 'vue-tel-input/dist/vue-tel-input.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import  'bootstrap-fileinput/css/fileinput.min.css'

window.Vue = vue;

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

Vue.component('bootstap-table', require('./components/DataTable/BootstrapTable.vue').default);
Vue.component('customer-create', require('./components/Customer/CreateModal.vue').default);
Vue.component('update-modal', require('./components/Customer/UpdateModal.vue').default);
Vue.component('customer-import-modal', require('./components/Customer/ImportModal.vue').default);

Vue.component('employee-data-table', require('./components/DataTable/EmployeeDataTable.vue').default);
Vue.component('employee-create', require('./components/Employee/CreateModal.vue').default);
Vue.component('update-employee-modal', require('./components/Employee/UpdateModal.vue').default);
Vue.component('employee-import-modal', require('./components/Employee/ImportModal.vue').default);

const app = new Vue({
    el: '#app'
});
