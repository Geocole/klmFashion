<template>
    <div>

        <modal modal-name="employeeModal" modal-label="employeeLabel" title="Ajouter employee">
            <div class="container-fluid">
                <create-form @success="successMode" @error="errorMode"></create-form>
            </div>
            <template slot="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss @click="cancelEmployeeForm" >Annuler</button>
                <button type="button" class="btn btn-primary" @click.prevent="submitEmployeeForm" >Ajouter </button>
            </template>
        </modal>

        <sweet-modal icon="success" ref="successModal">
         Ajout reussie!!
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
            submitEmployeeForm(){
                $('#sbForm').click()
            },
            cancelEmployeeForm(){
                $('#cancelForm').click()
            },
            successMode(){
                this.$refs.successModal.open()
                $('#employeeModal').modal('hide')
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