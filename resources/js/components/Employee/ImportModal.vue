<template>
    <modal modalName="importModal"
           modalLabel="importemployee"
           title="Import employee"
    >
        <div class="row">
            <div class="col-md-12" v-if="summary">
                <import-summary :data="summary"></import-summary>
            </div>
            <div class="col-md-12" v-else>
                <section class="section">
                    <div class="section-body">
                        <h2 class="section-title text-warning">
                            Attention!!
                        </h2>
                        <p class="section-lead">
                            Remplissez les informations ci-dessous. Les étiquettes de champs marquées avec * sont des
                            champs de saisie requis.
                        </p>
                        <div class="alert alert-light" role="alert">
                            <a href="http://klmfashion.test/assets/import/template.xlsx"
                               class="btn btn-primary float-right "
                            >
                                <i class="fa fa-download"></i>
                                Download Sample File
                            </a>

                            <span class="text-warning">
                            La première ligne du fichier csv téléchargé devrait rester telle quelle. Ne modifiez pas l'ordre des colonnes.
                        </span>
                            <br>Le bon ordre des colonnes est
                            <span class="text-info">(Nom, Email, Téléphone, Addresse, Ville , Code postal, Pays, Langue , Monnaie, Sex)
                        </span>&amp; Vous devez suivre ceci.
                            <br>Assurez-vous que le fichier csv est codé par UTF-8 et qu'il n'est pas enregistré avec la
                            marque de commande d'octet.<br>
                        </div>
                    </div>
                </section>
                <section class="section">
                    <div class="section-body">
                        <h2 class="section-title">
                            Upload Fichier*
                        </h2>
                        <div>
                            <input type="file" id="employeeFile" @change="setFile">
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <template slot="modal-footer">
            <a href="#" class="btn btn-danger" @click="closeModal">Fermer</a>
            <a href="#" class="btn btn-primary" v-if="!summary" @click="upload">Importer</a>
        </template>
    </modal>
</template>

<script>
    import Modal from '../Globals/Modal'
    import {Loader} from '../../mixins/loader'
    import Summary from '../DataImport/Summary'

    export default {
        name: "ImportModal",

        mixins: [Loader],

        components: {Modal, 'import-summary': Summary},

        data(){
            return {
                fileToImport:'',
                summary: null
            }
        },
        methods:{
            setFile(event){
              this.fileToImport = event.target.files[0];
            },
            upload(){
                this.load('Importation des donnees en cours...')

                let self = this
                let _token = document.head.querySelector('meta[name="csrf-token"]').content
                let form_data = new FormData();
                form_data.append('file', this.fileToImport)
                //form_data.append('datas',JSON.stringify(this.employee))
                form_data.append('_token', _token)

                axios.post('/employees/import', form_data)
                    .then(result => {
                        this.hideLoader();
                        $('#fresh-table').bootstrapTable('refresh')
                        this.$emit('success', 'success')
                        this.summary ={}
                        Object.assign(this.summary, JSON.parse(result.data))
                        //this.summary = JSON.parse(result.data)
                    }).catch((err) => {
                    this.hideLoader();
                    this.$emit('error', 'error')
                    let errors = err.response.data;
                    Object.keys(errors.errors).forEach((key) => {
                        this.setError(key, errors.errors[key])
                    })
                })
            },

            closeModal(){

                this.summary = null;

                $('#importModal').modal('hide')
            },
            initFileInput(){
                $('#employeeFile').fileinput({
                    showCaption: true,
                    dropZoneEnabled: false,
                    showUpload: false,
                    showPreview: false,
                    browseOnZoneClick: true,
                    allowedFileExtensions: ["csv", "xlsx"]
                })
            }
        },
        mounted(){
            this.initFileInput()

            $('#importModal').on('hidden.bs.modal', (e) =>{
                this.initFileInput()
            })
        },
    }
</script>
