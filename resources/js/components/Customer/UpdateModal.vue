<template>
    <div>
        <modal modal-name="customerModal" modal-label="customerLabel" title="Ajouter client">
            <div class="container-fluid">
                <updated-form @success="successMode" @error="errorMode"></updated-form>
            </div>
            <template slot="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss @click="cancelCustomForm" >Annuler</button>
                <button type="button" class="btn btn-primary" @click.prevent="submitCustomForm" >Ajouter Client</button>
            </template>
        </modal>

        <sweet-modal icon="success" ref="successModal" blocking  @close="closeModal">
            Client Mise à jour  avec succes!!
            <button type="button" class="btn btn-primary" slot="button" @click="$refs.successModal.close()">OK</button>
        </sweet-modal>

        <sweet-modal icon="error" title="Echec" ref="errorModal">
            Une erreur s'est produite
        </sweet-modal>
    </div>
</template>

<script>
    import Modal from '../Globals/Modal'
    import UpdatedForm from './UpdatedForm'
    export default {
        name: "UpdatedModal",
        props:{
            customerDataModal:{
                type: Object
            }
        },
        components:{Modal,UpdatedForm},
        methods:{
            submitCustomForm(){
                console.log('OKKKK')
                $('#sbUForm').click()
            },
            cancelCustomForm(){
                $('#cancelUForm').click()
            },
            successMode(){
                this.$refs.successModal.open()
                //$('#updateModal').modal('hide')
            },
            errorMode(){
                this.$refs.errorModal.open();
                //$('#customerModal').modal('hide')
            },
            closeModal(){
                $('#updateModal').modal('hide')
            }
        },
        mounted(){
            console.log(this.customerDataModal)
        }
    }
</script>
