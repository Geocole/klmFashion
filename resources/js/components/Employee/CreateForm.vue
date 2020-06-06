<template>
    <div>
        <form class="needs-validation" novalidate="" id="customForm">
            <div class="form-row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="validationCustom01">Nom*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user-tie"></i> </span>
                            </div>
                            <input type="text" class="form-control" id="validationCustom01" v-model="employee.name"
                                   placeholder="Nom" required>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.name}}
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="validationCustom02">Prenoms*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fas fa-user-tie"></i>
                            </span>
                            </div>
                            <input type="text" class="form-control" v-model="employee.lastname" id="validationCustom02"
                                   placeholder="Prenom" required>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.lastname}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="countries">Pays*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-flag"></i> </span>
                            </div>
                            <select class="selectpicker form-control"
                                    data-live-search="true"
                                    title="Selectionner le pays"
                                    id="countries" required
                                    v-model="country">
                                <option v-for="country in countries" :key="country.iso_code" :value="country"><span
                                        :class="'flag-icon flag-icon-'+country.iso_code.toLowerCase()"></span> &nbsp;
                                    &nbsp; {{country.name}}
                                </option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.country_id}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <label class="form-label" for="cities">Ville*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-city"></i> </span>
                        </div>
                        <select class="selectpicker form-control"
                                data-live-search="true"
                                id="cities"
                                required
                                v-model="employee.city_id"
                        >
                            <option v-for="city in cities" :key="city.name+'-'+city.state_id" :value="city.id">
                                {{city.name}}
                            </option>
                        </select>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        <div class="invalid-feedback">
                            {{employee.errorsMsg.city_id}}
                        </div>
                    </div>

                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="phone_regular">Telephone</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="phonePrepend"><i class="fas fa-phone"></i></span>
                            </div>
                            <vue-tel-input
                                    disabledFetchingCountry
                                    placeholder="Numero de telephone"
                                    required
                                    :defaultCountry="phone_iso"
                                    :selectedCountryCode="true"
                                    id="phone_regular"
                                    class="form-control" v-model="employee.phone_regular"></vue-tel-input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.phone_regular}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="email">Email</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="emailPrepend"><i class="fas fa-envelope"></i></span>
                            </div>
                            <input type="email" class="form-control" v-model="employee.email" id="email"
                                   placeholder="employee@mail.com" required>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.email}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="address1">Adresse*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-location-arrow"></i> </span>
                            </div>
                            <input type="text" class="form-control" v-model="employee.address1" id="address1">
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.address1}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="address1">Adresse2</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-location-arrow"></i> </span>
                            </div>
                            <input type="text" class="form-control" v-model="employee.address2" id="address2">
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.address2}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="langue">Langue*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-globe-africa"></i> </span>
                            </div>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{employee.errorsMsg.language_id}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label ">Genre</label>
                        <div class="selectgroup selectgroup-pills">
                            <label class="selectgroup-item">
                                <input type="radio" name="icon-input" v-model="employee.gender" value="H"
                                       class="selectgroup-input" checked="">
                                <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-male"></i> Homme</span>
                            </label>
                            <label class="selectgroup-item">
                                <input type="radio" name="icon-input" v-model="employee.gender" value="M"
                                       class="selectgroup-input">
                                <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-female"></i> Femme</span>
                            </label>
                        </div>
                        <div class="invalid-feedback">
                            {{employee.errorsMsg.gender}}
                        </div>
                    </div>
                </div>

            </div>
            <button class="btn btn-primary d-none" id="cancelForm" @click.prevent="cancelAdd">Cancel</button>

            <button class="btn btn-primary d-none" id="sbForm" type="submit">Submit form</button>
        </form>

    </div>
</template>

<script>
    const VueTelInput = () => import('../../plugins/vue-tel-input-master/src/vue-tel-input');
    import employee from '../../Classes/employee'
    import {ApiData} from '../../mixins/employee/ApiDatas'
    import {Loader} from '../../mixins/loader'

    export default {
        name: "CreateForm",
        components: {
            VueTelInput,
        },
        mixins: [ApiData, Loader],
        data() {
            return {
                employee: new employee(),
            }
        },
        methods: {
            cancelAdd() {
                this.iniClientModel()
                $('#employeeModal').modal('hide')
                $("#customForm").removeClass('was-validated')
                let invalidEls = $('.is-invalid').get();
                for (let el in invalidEls) {
                    invalidEls[el].classList.remove('is-invalid')
                }
            },
            iniClientModel() {
                this.employee.init()
                this.initSelectPickers()
            },
            initSelectPickers() {
                this.phone_iso = 'BJ'
                this.cities = [];
                $('#countries').selectpicker('val', '');
                $('#langue').selectpicker('val', '');
            },
            addNewEmployee(form) {
                this.load('Enregistrement du client en cours');

                let self = this
                let _token = document.head.querySelector('meta[name="csrf-token"]').content
                let form_data = new FormData();

                Object.keys(this.employee).forEach(key => {
                    form_data.append(key, self.employee[key])
                })
                //form_data.append('datas',JSON.stringify(this.employee))
                form_data.append('_token', _token)
                axios.post('/employees', form_data)
                    .then(result => {
                        self.hideLoader();
                        self.iniClientModel()
                        form.classList.remove('was-validated');
                        $('#fresh-table').bootstrapTable('refresh')
                        self.$emit('success', 'success')
                    }).catch((err) => {
                        self.hideLoader();
                        self.$emit('error', 'error')
                        let errors = err.response.data;
                        Object.keys(errors.errors).forEach((key) => {
                            self.setError(key, errors.errors[key])
                        })
                    })
                },

            },
        mounted() {
            let forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            let self = this
            let validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        form.classList.add('was-validated');
                        event.preventDefault();
                        event.stopPropagation();
                        self.addNewEmployee(form)
                    }
                }, false);
            });
        },
        watch: {
            languages() {
                this.$nextTick(() => {
                    $('#langue').selectpicker('refresh');
                })
            },
             countries() {
                this.$nextTick(() => {
                    $('#countries').selectpicker('refresh');
                })
            },
            cities() {
                this.$nextTick(() => {
                    $('#cities').selectpicker('refresh');
                })
            },
            'country'(newValue, oldValue) {
                if (newValue) {
                    this.phone_iso = newValue.iso_code
                    this.employee.country_id = newValue.id
                    this.loadCities(newValue.id)
                }
            }

        }
    }
</script>

<style lang="scss">
    #customForm {
        .bs-invalid {
            border-color: #dc3545;
        }

        .bootstrap-select.form-control:not([class*="col-"]) {
            width: 1% !important;
        }

        .bootstrap-select.form-control {
            padding: 0 !important;
        }

        .flag-icon {
            height: auto;
        }

        .custom-select.is-invalid,
        .form-control.is-invalid,
        .was-validated .custom-select:invalid,
        .was-validated .form-control:invalid {
            border-color: #dc3545 !important;
        }
    }

</style>