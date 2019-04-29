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
                            <input type="text" class="form-control" id="validationCustom01" v-model="customer.name" placeholder="Nom" required>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.name}}
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
                            <input type="text" class="form-control" v-model="customer.lastname" id="validationCustom02" placeholder="Prenom" required>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.lastname}}
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
                                <option v-for="country in countries" :key="country.iso_code" :value="country"><span :class="'flag-icon flag-icon-'+country.iso_code.toLowerCase()"></span> &nbsp; &nbsp; {{country.name}}</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.country_id}}
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
                                v-model="customer.city_id"
                        >
                            <option v-for="city in cities" :key="city.name+'-'+city.state_id" :value="city.id">{{city.name}}</option>
                        </select>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        <div class="invalid-feedback">
                            {{customer.errorsMsg.city_id}}
                        </div>
                    </div>

                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="phone">Telephone</label>
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
                                    class="form-control" v-model="customer.phone_regular"></vue-tel-input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.phone_regular}}
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
                            <input type="email" class="form-control" v-model="customer.email" id="email" placeholder="customer@mail.com" required>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.email}}
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
                            <input type="text" class="form-control" v-model="customer.address1" id="address1"  >
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.address1}}
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
                            <input type="text" class="form-control" v-model="customer.address2" id="address2"  >
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.address2}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for="postcode" class="form-label">
                            Code Postal
                        </label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                        <span class="input-group-text">
                           <i class="fab fa-mailchimp"></i>
                        </span>
                            </div>
                            <input type="text" class="form-control" id="postcode" v-model="customer.postcode">
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for="profession" class="form-label">
                            Profession
                        </label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fas fa-briefcase"></i>
                        </span>
                            </div>
                            <input type="text" class="form-control" id="profession" v-model="customer.profession">
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
                            <select class="selectpicker form-control"
                                    title="Selectionner une langue"
                                    v-model="customer.language_id"
                                    id="langue" required>
                                <option v-for="language in languages" :key="language.iso_code" :value="language.id" v-model="customer.language_id"><span :class="'flag-icon flag-icon-'+language.iso_code"></span> &nbsp; &nbsp; {{language.name}}</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.language_id}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label" for="currency">Monnaie*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-money-bill-alt"></i> </span>
                            </div>
                            <select class="selectpicker form-control"
                                    title="Choisissez une monnaie "
                                    v-model="customer.currency_id"
                                    id="currency" required>
                                <option v-for="currency in currencies" :key="currency.iso_code" :value="currency.id" v-model="customer.currency_id">
                                <span class="badge badge-light">
                                    <em>{{currency.iso_code}}</em>
                                </span>&nbsp;
                                    {{currency.name}}&nbsp; &nbsp;
                                    <span class="badge badge-pill badge-secondary">
                                    {{currency.sign}}
                                </span>
                                </option>
                            </select>
                            <div class="valid-feedback">
                            Looks good!
                            </div>
                            <div class="invalid-feedback">
                                {{customer.errorsMsg.currency_id}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label class="form-label ">Genre</label>
                        <div class="selectgroup selectgroup-pills">
                            <label class="selectgroup-item">
                                <input type="radio" name="icon-input" v-model="customer.gender" value="H" class="selectgroup-input" checked="">
                                <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-male"></i> Homme</span>
                            </label>
                            <label class="selectgroup-item">
                                <input type="radio" name="icon-input" v-model="customer.gender" value="M" class="selectgroup-input">
                                <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-female"></i> Femme</span>
                            </label>
                        </div>
                        <div class="invalid-feedback">
                            {{customer.errorsMsg.gender}}
                        </div>
                    </div>
                </div>

            </div>
            <button class="btn btn-primary d-none" id="cancelForm" @click.prevent="cancelAdd" >Cancel</button>

            <button class="btn btn-primary d-none" id="sbForm" type="submit">Submit form</button>
        </form>

    </div>
</template>

<script>
    const VueTelInput = ()=> import('../../plugins/vue-tel-input-master/src/vue-tel-input');
    import Customer from '../../Classes/Customer'
    import { ApiData } from '../../mixins/Customer/ApiDatas'
    export default {
        name: "CreateForm",
        components: {
            VueTelInput,
        },
        mixins:[ApiData],
        data(){
            return {
                customer: new Customer(),
            }
        },
        methods:{
            cancelAdd(){
                    this.iniClientModel()
                    $('#customerModal').modal('hide')
                    $("#customForm").removeClass('was-validated')
                    let invalidEls =$('.is-invalid').get();
                    for(let el in invalidEls){
                        invalidEls[el].classList.remove('is-invalid')
                    }
            },
            iniClientModel(){
                this.customer.init()
                this.initSelectPickers()

            },
            initSelectPickers() {
                this.phone_iso = 'BJ'
                this.cities = [];
                $('#countries').selectpicker('val', '');
                $('#langue').selectpicker('val', '');
                $('#currency').selectpicker('val', '');
            }
            ,
            addNewCustomer(form){
                $('body').loadingModal({
                    position: 'auto',
                    text: 'Enregistrement du client en cours',
                    color: '#fff',
                    opacity: '0.7',
                    backgroundColor: '#6777ef',
                    animation: 'cubeGrid'
                });
                let self =this
                let _token = document.head.querySelector('meta[name="csrf-token"]').content
                let form_data = new FormData();

                Object.keys(this.customer).forEach(key => {
                    form_data.append(key , self.customer[key])
                })
                //form_data.append('datas',JSON.stringify(this.customer))
                form_data.append('_token',_token)
                axios.post('/customer',form_data)
                    .then(result => {
                    $('body').loadingModal('hide');
                    self.iniClientModel()
                     form.classList.remove('was-validated');
                    $('#fresh-table').bootstrapTable('refresh')
                     self.$emit('success','success')
                }).catch((err) =>{
                    $('body').loadingModal('hide');
                    self.$emit('error','error')
                    let errors = err.response.data;

                    Object.keys(errors.errors).forEach((key) => {
                        self.setError(key, errors.errors[key])

                    })
                    console.log(errors)
                })
            },

        },
        mounted(){
            let forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            let self= this
            let validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }else {
                        form.classList.add('was-validated');
                        event.preventDefault();
                        event.stopPropagation();
                        self.addNewCustomer(form)
                    }
                }, false);
            });

            this.loadCurrency()

            this.loadLanguages()
            this.loadCountries()
        },
        watch:{
            languages(){
                this.$nextTick(() => {
                    $('#langue').selectpicker('refresh');

                })
            },
            currencies(){
                this.$nextTick(() => {
                    $('#currency').selectpicker('refresh');

                })
            },
            countries(){
                this.$nextTick(() => {
                    $('#countries').selectpicker('refresh');

                })
            },
            cities(){
                this.$nextTick(() => {
                    $('#cities').selectpicker('refresh');

                })
            },
            'country'(newValue,oldValue){
                if(newValue){
                    this.phone_iso = newValue.iso_code
                    this.customer.country_id = newValue.id
                    this.loadCities(newValue.id)
                }
            }
        }
    }
</script>

<style lang="scss">
    #customForm{
        .bs-invalid{
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