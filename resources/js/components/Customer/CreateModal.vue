<template>
    <div>

        <modal modal-name="customerModal" modal-label="customerLabel" title="Ajouter client">
            <div class="container-fluid">
                <create-form @success="successMode" @error="errorMode"></create-form>
            </div>
            <template slot="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss @click="cancelCustomForm" >Annuler</button>
                <button type="button" class="btn btn-primary" @click.prevent="submitCustomForm" >Ajouter Client</button>
            </template>
        </modal>

        <sweet-modal icon="success" ref="successModal">
            Client Ajouter avec succes!!
        </sweet-modal>

        <sweet-modal icon="error" title="Echec" ref="errorModal">
            Une erreur s'est produite
        </sweet-modal>
    </div>

</template>

<script>
    import Modal from '../Globals/Modal'
    import CreateForm from './CreateForm'
    export default {
        name: "CreateModal",
        components:{Modal,CreateForm},
        methods:{
            submitCustomForm(){
                $('#sbForm').click()
            },
            cancelCustomForm(){
                $('#cancelForm').click()
            },
            successMode(){
                this.$refs.successModal.open()
                $('#customerModal').modal('hide')
            },
            errorMode(){
                this.$refs.errorModal.open();
                //$('#customerModal').modal('hide')
            }
        }
    }
</script>

<style scoped>

</style>