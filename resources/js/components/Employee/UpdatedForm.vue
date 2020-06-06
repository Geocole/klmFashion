<template>
    <form class="needs-validation" novalidate="" id="employeeUpdateForm">
        <div class="form-row">
            <div class="col-md-6 mb-2">
                <div class="form-group">
                    <label class="form-label" for="validationemployee01">Nom*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user-tie"></i> </span>
                        </div>
                        <input type="text" class="form-control" id="validationemployee01" v-model="employee.name" placeholder="Nom" required>
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
                    <label class="form-label" for="validationemployee02">Prenoms*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fas fa-user-tie"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" v-model="employee.lastname" id="validationemployee02" placeholder="Prenom" required>
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
                    <label class="form-label" for="ucountries">Pays*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-flag"></i> </span>
                        </div>
                        <select class="selectpicker form-control"
                                data-live-search="true"
                                title="Selectionner le pays"
                                id="ucountries" required
                                v-model="country">
                            <option v-for="country in countries" :key="country.iso_code" :value="country.id"><span :class="'flag-icon flag-icon-'+country.iso_code.toLowerCase()"></span> &nbsp; &nbsp; {{country.name}}</option>
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
                <label class="form-label" for="ucities">Ville*</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-city"></i> </span>
                    </div>
                    <select class="selectpicker form-control"
                            data-live-search="true"
                            id="ucities"
                            required
                            v-model="employee.city_id"
                    >
                        <option v-for="city in cities" :key="city.name+'-'+city.state_id" :value="city.id">{{city.name}}</option>
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
                        <input type="email" class="form-control" v-model="employee.email" id="email" placeholder="employee@mail.com" required>
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
                        <input type="text" class="form-control" v-model="employee.address1" id="address1"  >
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
                        <input type="text" class="form-control" v-model="employee.address2" id="address2"  >
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
                    <label for="postcode" class="form-label">
                        Code Postal
                    </label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <span class="input-group-text">
                           <i class="fab fa-mailchimp"></i>
                        </span>
                        </div>
                        <input type="text" class="form-control" id="postcode" v-model="employee.postcode">
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
                        <input type="text" class="form-control" id="profession" v-model="employee.profession">
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-2">
                <div class="form-group">
                    <label class="form-label" for="ulangue">Langue*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-globe-africa"></i> </span>
                        </div>
                        <select class="selectpicker form-control"
                                title="Selectionner une langue"
                                v-model="employee.language_id"
                                id="ulangue" required>
                            <option v-for="language in languages" :selected="employee.language_id === language.id" :key="language.iso_code" :value="language.id" v-model="employee.language_id"><span :class="'flag-icon flag-icon-'+language.iso_code"></span> &nbsp; &nbsp; {{language.name}}</option>
                        </select>
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
                    <label class="form-label" for="ucurrency">Monnaie*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-money-bill-alt"></i> </span>
                        </div>
                        <select class="selectpicker form-control"
                                title="Choisissez une monnaie "
                                v-model="employee.currency_id"
                                id="ucurrency" required>
                            <option v-for="currency in currencies" :key="currency.iso_code" :value="currency.id" v-model="employee.currency_id">
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
                            {{employee.errorsMsg.currency_id}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-2">
                <div class="form-group">
                    <label class="form-label ">Genre</label>
                    <div class="selectgroup selectgroup-pills">
                        <label class="selectgroup-item">
                            <input type="radio" name="icon-input" v-model="employee.gender" value="H" class="selectgroup-input" :checked="employee.gender === 'H'">
                            <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-male"></i> Homme</span>
                        </label>
                        <label class="selectgroup-item">
                            <input type="radio" name="icon-input" v-model="employee.gender" value="F" class="selectgroup-input" :checked="employee.gender === 'F'">
                            <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-female"></i> Femme</span>
                        </label>
                    </div>
                    <div class="invalid-feedback">
                        {{employee.errorsMsg.gender}}
                    </div>
                </div>
            </div>

        </div>
        <button class="btn btn-primary d-none" id="cancelForm" @click.prevent="cancelUpdate" >Cancel</button>

        <button class="btn btn-primary d-none" id="sbUForm" type="submit">Submit form</button>
    </form>
</template>

<script>
    const VueTelInput = ()=> import('../../plugins/vue-tel-input-master/src/vue-tel-input');
    import employee from '../../Classes/employee'
    import { ApiData } from '../../mixins/employee/ApiDatas'
    export default {
        props:{
            employeeData:{
                type: Object,
                default(){
                    return {
                        currency_id:undefined,
                        language_id:undefined,
                        name: undefined,
                        lastname: undefined,
                        gender: undefined,
                        address1:'',
                        address2:'',
                        postcode:'',
                        country_id:'',
                        city_id:'',
                        email: undefined,
                        phone_regular: undefined,
                    }
                }
            }
        },
        components: {
            VueTelInput,
        },
        mixins:[ApiData],
        name: "UpdatedForm",
        data(){
            return {
                employee: new employee(),
                isInit: false
            }
        },
        methods:{
            cancelUpdate(){
                this.iniClientModel()
                $('#employeeUpdateModal').modal('hide')
                $("#employeeUpdateForm").removeClass('was-validated')
                let invalidEls =$('.is-invalid').get();
                for(let el in invalidEls){
                    invalidEls[el].classList.remove('is-invalid')
                }
            },
            iniClientModel(){
                const updatas = this.employeeData
                this.employee.init(updatas)

                this.country = updatas.address.country_id
                this.loadCities(updatas.address.country_id)


                /*this.employee = {
                    currency_id: ,
                    language_id:undefined,
                    name: undefined,
                    lastname: undefined,
                    gender: undefined,
                    address1:'',
                    address2:'',
                    postcode:'',
                    country_id:'',
                    city_id:'',
                    email: undefined,
                    phone_regular: undefined,

                }*/
            },
            updateemployee(form){
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

                Object.keys(this.employee).forEach(key => {
                    form_data.append(key , self.employee[key])
                })
                console.log(form_data)
                //form_data.append('datas',JSON.stringify(this.employee))
                form_data.append('_token',_token)
                form_data.append('_position', 'PUT');
                form_data.append('_method', 'PUT')
                axios.post('/employees/'+this.employeeData.id,form_data)
                    .then(result => {
                        $('body').loadingModal('hide');
                        self.iniClientModel()
                        form.classList.remove('was-validated');
                        $('#fresh-table').bootstrapTable('refresh')
                        self.$emit('success','success')
                    }).catch(err =>{
                        console.log(err)
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
            this.iniClientModel()
            let form = document.getElementById('employeeUpdateForm');
            // Loop over them and prevent submission
            console.log(form)
            let self= this
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                        console.log('No validate')
                    }else {

                        event.preventDefault();
                        event.stopPropagation();
                        self.updateemployee(form)
                    }
                    form.classList.add('was-validated');
                }, false);

            this.loadCurrency()
            this.loadLanguages()
            this.loadCountries()
        },
        watch:{
            languages(){
                let langue_id  =  this.employeeData.language_id
                this.$nextTick(() => {
                    $('#ulangue').selectpicker('val', langue_id);
                })
            },
            currencies(){
                let currency  =  this.employeeData.currency_id

                this.$nextTick(() => {
                    $('#ucurrency').selectpicker('val',currency);
                })
            },
            countries(){
                let country_id  =  this.employeeData.address.country_id
                this.$nextTick(() => {
                    $('#ucountries').selectpicker('val',country_id);
                })
            },
            cities(){
                let self  =  this
                this.$nextTick(() => {
                    if(self.isInit)
                        $('#ucities').selectpicker('refresh');
                    else{
                        $('#ucities').selectpicker('val',self.employeeData.address.city_id);
                        self.isInit= true
                    }


                })
            },
            'country'(newValue,oldValue){
                if(newValue){
                    if (this.countries.length > 0) {
                        let country = this.countries.find(cty => cty.id === newValue)

                        this.phone_iso = country.iso_code
                        this.employee.country_id = newValue
                    }
                    this.loadCities(newValue)
                }
            }
        }
    }
</script>

<style lang="scss">
    #employeeUpdateForm{
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

        .employee-select.is-invalid,
        .form-control.is-invalid,
        .was-validated .employee-select:invalid,
        .was-validated .form-control:invalid {
            border-color: #dc3545 !important;
        }
    }

</style>